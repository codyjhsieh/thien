#!/usr/bin/env python3
"""
test-filters.py — pin down what each profile's title filters do and don't match.

    python3 scripts/test-filters.py            # every profile
    python3 scripts/test-filters.py sean

The filters are the whole product: a regex that is slightly too greedy fills a
board with the wrong job, and one that is slightly too tight empties it. Both
failures look like "the market is quiet" from the outside, which is why they
need cases rather than a careful read.

Cases live in CASES below as (title, company vertical, should it appear). The
vertical matters because a profile can widen its net for companies whose every
seat is already the work — see filters.titleIncludeBroad / broadVerticals.

Runs offline: the ATS payload is synthesised, so this is safe in CI and safe to
run in a loop while tuning a regex.
"""

from __future__ import annotations
import importlib.util, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("rc", ROOT / "scripts" / "refresh-companies.py")
rc = importlib.util.module_from_spec(spec)
_argv, sys.argv = sys.argv, ["rc"]
spec.loader.exec_module(rc)
sys.argv = _argv

# A title that each profile's filters accept, so a geography case fails on
# geography rather than on the title.
GEO_PROBE_TITLE = {"sean": "Environment Artist", "thien": "Operations Analyst",
                   "cody": "Data Entry Clerk"}

# A location each profile accepts, so a title case fails on the title
# rather than on geography.
TITLE_PROBE_LOC = {"sean": "New York, NY", "thien": "New York, NY",
                   "cody": "Remote, US"}

# (location, expected lane) — "out" means the role should not appear at all.
# A profile with no geoRemote never produces "remote".
GEO_CASES = {
  "sean": [
    ("New York, NY",                                    "nyc"),
    ("Brooklyn, New York",                              "nyc"),
    ("United States, Remote",                           "remote"),
    ("Remote - US",                                     "remote"),
    ("Remote (USA)",                                    "remote"),
    ("Remote - North America",                          "remote"),
    ("Remote",                                          "remote"),
    ("Anywhere",                                        "remote"),
    # A listing naming a home-country option counts even alongside foreign ones.
    ("Canada-Remote; United Kingdom; United States-Remote", "remote"),
    ("Remote - Canada",                                 "out"),
    ("Remote, United Kingdom",                          "out"),
    ("Remote - EMEA",                                   "out"),
    ("Warsaw, Poland (Remote)",                         "out"),
    ("Los Angeles, CA",                                 "out"),
    ("Helsinki",                                        "out"),
  ],
  "thien": [
    ("New York, NY",                                    "nyc"),
    ("Remote - US",                                     "out"),   # no remote lane
    ("Austin, TX",                                      "out"),
  ],
  # Cody's board is remote-only: geoInclude is itself the remote pattern, so a
  # match lands in the primary lane rather than being tagged remote.
  "cody": [
    ("Remote, US",                                      "nyc"),
    ("Remote - United States",                          "nyc"),
    ("Work from home (USA)",                            "nyc"),
    ("Remote - Philippines",                            "out"),
    ("Remote, India",                                   "out"),
    ("Remote - Costa Rica",                             "out"),
    ("Remote (Latin America)",                          "out"),
    ("Austin, TX",                                      "out"),
    ("New York, NY",                                    "out"),
  ],
}

CASES = {
  "sean": [
    # The title names the game/real-time pipeline — counts anywhere.
    ("Environment Artist",                      "gaming",   True),
    ("Environment Artist",                      "media",    True),
    ("Senior Concept Artist",                   "consumer", True),
    ("Technical Artist",                        "ai",       True),
    ("3D Artist, Games",                        "media",    True),
    ("Game Artist",                             "consumer", True),
    ("Character Artist (Unreal)",                "vfx",      True),
    ("Level Designer",                          "gaming",   True),
    ("VFX Artist",                              "animation", True),
    ("Illustrator, Trading Card Games",         "consumer", True),
    # Generic craft titles say nothing about the medium on their own.
    ("3D Artist",                               "media",    False),   # archviz, not a game
    ("3D Artist",                               "gaming",   True),
    ("Texture Artist",                          "vfx",      False),
    ("Texture Artist",                          "gaming",   True),
    ("Lighting Artist",                         "animation", False),
    ("Senior Illustrator",                      "consumer", False),
    ("Senior Illustrator",                      "gaming",   True),
    # Whole discipline counts, but only where every seat is on a game.
    ("Art Director",                            "gaming",   True),
    ("Art Director",                            "media",    False),
    ("Motion Designer",                         "gaming",   True),
    ("Motion Designer",                         "ai",       False),
    ("Animator",                                "gaming",   True),
    ("Animator",                                "animation", False),
    ("2D Effects Artist (Temporary/Freelance)", "animation", False),
    # The broad lane is for companies whose product IS a game. A platform, a
    # tool, an ad network or a defence contractor does not qualify, however
    # game-adjacent it is.
    ("Art Director",                            "gametech", False),   # Xsolla, Twitch
    ("Animator",                                "simulation", False), # Anduril, Shield AI
    ("Illustrator",                             "archviz",  False),
    ("Environment Artist",                      "simulation", True),  # title still carries it
    ("Unreal Environment Artist",               "archviz",  True),
    # Marketing-side design is not working on the game.
    ("Brand Designer",                          "gaming",   False),
    ("Senior Brand Designer",                   "fintech",  False),
    ("Creative Director, Marketing",            "ai",       False),
    # Same word, different job.
    ("Artist & Label Relations Manager",        "media",    False),
    ("Quantitative Modeler, Associate",         "fintech",  False),
    ("Makeup Artist",                           "consumer", False),
    # Adjacent but not art.
    ("Graphics Engineer",                       "gaming",   False),
    ("Senior Product Designer",                 "gaming",   False),
  ],
  "cody": [
    ("Data Entry Clerk",                        "bpo",      True),
    ("Data Entry Specialist",                   "health",   True),
    ("Administrative Assistant",                "saas",     True),
    ("Claims Processor",                        "insurance", True),
    ("Transcriptionist",                        "media",    True),
    ("Content Moderator",                       "ai",       True),
    ("Medical Records Clerk",                   "health",   True),
    ("Virtual Assistant",                       "staffing", True),
    # Little experience required is the whole point of this board.
    ("Senior Data Entry Specialist",            "bpo",      False),
    ("Data Entry Manager",                      "bpo",      False),
    ("Lead Claims Processor",                   "insurance", False),
    # Same words, wrong job.
    ("Data Scientist",                          "ai",       False),
    ("Data Engineer",                           "saas",     False),
    ("Data Analyst",                            "saas",     False),
    ("Software Engineer",                       "saas",     False),
    ("Account Executive",                       "saas",     False),
    ("Registered Nurse",                        "health",   False),
    ("Paralegal",                               "legal",    False),
  ],
  "thien": [
    ("Operations Analyst",                      "saas",     True),
    ("Data Analyst, Growth",                    "consumer", True),
    ("Business Intelligence Analyst",           "saas",     True),
    ("Supply Chain Analyst",                    "consumer", True),
    ("Senior Data Analyst",                     "saas",     False),   # early-career board
    ("Quantitative Analyst",                    "fintech",  False),
    ("Security Analyst",                        "saas",     False),
    ("Data Engineer",                           "saas",     False),
  ],
}


PAY_CASES = {
  "cody": [
    # (title, level, expected hourly midpoint band) — the estimate must land in
    # the right family, and must never be presented as the employer's figure.
    ("Data Entry Clerk",      "entry", 17, 24),
    ("Medical Coder",         "entry", 20, 30),
    ("Executive Assistant",   "entry", 22, 34),
    ("Claims Processor",      "entry", 18, 26),
    ("Something Unmapped",    "entry", 17, 25),   # falls back to default
  ],
}


def run_pay(pid: str) -> int:
  profile = rc.Profile(pid)
  cases = PAY_CASES.get(pid)
  if not cases:
    return 0
  bad = 0
  for title, lvl, lo, hi in cases:
    est = profile.estimate_pay(title, lvl)
    if not est or est["min"] != lo or est["max"] != hi:
      bad += 1
      print(f"  \u2717 [pay] {title!r} ({lvl}): expected {lo}-{hi}, got {est}", file=sys.stderr)
  # An estimate is only ever attached when the posting states nothing, and it
  # must be labelled as such.
  raw = [{"title": "Data Entry Clerk", "location": {"name": "Remote, US"},
          "absolute_url": "https://example.com/job", "updated_at": "2026-01-01"}]
  got = rc.filter_jobs(profile, "greenhouse", raw, "slug", "bpo")
  if got and got[0].get("pay") and got[0].get("paySource") != "estimate":
    bad += 1
    print(f"  \u2717 [pay] unposted pay was not labelled an estimate", file=sys.stderr)
  if not bad:
    print(f"   \u2713 {pid}: {len(cases)} pay case(s) pass")
  return bad


# (description, should the posting be refused) — the fraud and credential
# screens are the two places where a false negative has a real cost, so they
# get cases rather than trust.
SCREEN_CASES = {
  "cody": {
    "fraud": [
      ("Contact us on Telegram to start your interview.",            True),
      ("Your interview will be conducted via WhatsApp.",             True),
      ("Message our recruiter on Telegram for details.",             True),
      # A comms company naming the channel as a product is not a scam marker.
      ("Our platform integrates with WhatsApp and SMS.",             False),
      ("Build features across WhatsApp, Messenger and Instagram.",   False),
      ("Support customers over Skype, phone and email.",             False),
      ("You will purchase your own equipment up front.",             True),
      ("A cashier's check will be mailed to you.",                   True),
      ("Process payments through your personal bank account.",       True),
      ("Payment via Zelle after each shift.",                        True),
      ("No interview required — hired immediately!",                 True),
      ("Remote data entry. Apply through our careers site.",         False),
      ("You will use company-issued equipment, shipped to you.",     False),
    ],
    "credential": [
      ("Must hold an active CPC certification.",                     True),
      ("Requires a bachelor's degree in business.",                  True),
      ("Licensed insurance adjuster required.",                      True),
      ("Active TS/SCI security clearance required.",                 True),
      ("RN license required.",                                       True),
      ("We provide full training; no degree needed.",                False),
      ("High school diploma or equivalent.",                         False),
    ],
  },
}


# Greenhouse returns HTML-escaped markup, so entity decoding has to happen
# before tag stripping — doing it after put "<div class=...>" back into every
# summary on the board.
SUMMARY_CASES = [
  ("&lt;div class=\"intro\"&gt;&lt;p&gt;Enter claims data into our system daily "
   "and verify it against source documents.&lt;/p&gt;&lt;/div&gt;",
   "Enter claims data"),
  ("<p><strong>About the role:</strong></p><p>You will process invoices and keep "
   "records current for the operations team.</p>", "You will process invoices"),
]


def run_summary() -> int:
  bad = 0
  for raw, expect_start in SUMMARY_CASES:
    got = rc.summary_of(raw) or ""
    if "<" in got or "&lt;" in got or "&amp;" in got:
      bad += 1
      print(f"  \u2717 [summary] markup survived: {got[:70]!r}", file=sys.stderr)
    elif not got.startswith(expect_start):
      bad += 1
      print(f"  \u2717 [summary] expected to start {expect_start!r}, got {got[:70]!r}", file=sys.stderr)
  if not bad:
    print(f"   \u2713 summary: {len(SUMMARY_CASES)} case(s) pass, no markup leaks")
  return bad


def run_screens(pid: str) -> int:
  cases = SCREEN_CASES.get(pid)
  if not cases:
    return 0
  bad = 0
  for kind, rows in cases.items():
    fn = rc.fraud_flags if kind == "fraud" else rc.credential_flags
    for text, want in rows:
      got = bool(fn("Data Entry Clerk", text, None) if kind == "fraud" else fn("Data Entry Clerk", text))
      if got != want:
        bad += 1
        print(f"  \u2717 [{kind}] {text!r}: expected {'refused' if want else 'kept'}", file=sys.stderr)
  n = sum(len(v) for v in cases.values())
  if not bad:
    print(f"   \u2713 {pid}: {n} screening case(s) pass")
  return bad


def run_geo(pid: str) -> int:
  profile = rc.Profile(pid)
  cases = GEO_CASES.get(pid)
  if not cases:
    return 0
  bad = 0
  for loc, want in cases:
    raw = [{"title": GEO_PROBE_TITLE[pid], "location": {"name": loc},
            "absolute_url": "https://example.com/job", "updated_at": "2026-01-01"}]
    got = rc.filter_jobs(profile, "greenhouse", raw, "slug", "gaming")
    lane = "out" if not got else ("remote" if got[0].get("remote") else "nyc")
    if lane != want:
      bad += 1
      print(f"  \u2717 [geo] {loc!r}: expected {want}, got {lane}", file=sys.stderr)
  if not bad:
    print(f"   \u2713 {pid}: {len(cases)} geography case(s) pass")
  return bad


def run(pid: str) -> int:
  profile = rc.Profile(pid)
  cases = CASES.get(pid)
  if not cases:
    print(f"{pid}: no cases defined — add some to scripts/test-filters.py", file=sys.stderr)
    return 0
  bad = 0
  for title, vertical, want in cases:
    raw = [{"title": title, "location": {"name": TITLE_PROBE_LOC[pid]},
            "absolute_url": "https://example.com/job", "updated_at": "2026-01-01"}]
    got = bool(rc.filter_jobs(profile, "greenhouse", raw, "slug", vertical))
    if got != want:
      bad += 1
      print(f"  ✗ [{vertical}] {title!r}: expected {'in' if want else 'out'}, got "
            f"{'in' if got else 'out'}", file=sys.stderr)
  if bad:
    print(f"{pid}: {bad} of {len(cases)} case(s) failed", file=sys.stderr)
  else:
    print(f"   ✓ {pid}: {len(cases)} filter case(s) pass")
  return bad


def main():
  ids = sys.argv[1:] or sorted(
    p.stem for p in (ROOT / "profiles").glob("*.json") if not p.name.endswith(".companies.json"))
  sys.exit(1 if sum(run(i) + run_geo(i) + run_pay(i) + run_screens(i) for i in ids) + run_summary() else 0)


if __name__ == "__main__":
  main()
