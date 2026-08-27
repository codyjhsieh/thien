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
GEO_PROBE_TITLE = {"sean": "Environment Artist", "thien": "Operations Analyst"}

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
    raw = [{"title": title, "location": {"name": "New York, NY"},
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
  sys.exit(1 if sum(run(i) + run_geo(i) for i in ids) else 0)


if __name__ == "__main__":
  main()
