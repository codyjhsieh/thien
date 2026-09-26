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
# A description with nothing objectionable in it. Cases that are about titles
# or geography need one, because a profile with requireDescription refuses a
# posting it cannot read — which is itself covered by run_require_description.
BENIGN_DESCRIPTION = (
    "You will enter and verify records in our internal systems, keep files "
    "current, and support the operations team with day-to-day requests. "
    "Full training is provided and no prior experience is required. "
    "We are looking for someone reliable, organised and comfortable with "
    "spreadsheets and email.")

# Which ATS shape to synthesise. A profile that requires a description must be
# probed with a backend that carries one in its listing (Lever), or every case
# would fail on "no description" rather than on the thing it tests.
PROBE_ATS = {"cody": "lever", "sean": "greenhouse", "thien": "greenhouse",
             "alan": "greenhouse"}


def probe_row(pid, title, loc):
  """One synthetic posting in the shape the profile's probe backend uses."""
  if PROBE_ATS.get(pid) == "lever":
    return {"text": title, "categories": {"location": loc},
            "hostedUrl": "https://example.com/job", "createdAt": 0,
            "descriptionPlain": BENIGN_DESCRIPTION}
  return {"title": title, "location": {"name": loc},
          "absolute_url": "https://example.com/job", "updated_at": "2026-01-01"}


GEO_PROBE_TITLE = {"sean": "Environment Artist", "thien": "Operations Analyst",
                   "cody": "Data Entry Clerk",
                   "alan": "Real Estate Acquisitions Associate"}

# A location each profile accepts, so a title case fails on the title
# rather than on geography.
TITLE_PROBE_LOC = {"sean": "New York, NY", "thien": "New York, NY",
                   "cody": "Remote, US", "alan": "New York, NY"}

# (location, expected lane) — "out" means the role should not appear at all.
# A profile with no geoRemote never produces "remote".
GEO_CASES = {
  # Alan's board is New York or nothing: no remote lane, so a remote posting is
  # simply out rather than tagged.
  "alan": [
    ("New York, NY",                "nyc"),
    ("Manhattan, New York",         "nyc"),
    ("New York, NY / Stamford, CT", "nyc"),
    ("Remote - US",                 "out"),
    ("Dallas, TX",                  "out"),
    ("London, United Kingdom",      "out"),
    ("Newark, NJ",                  "out"),
  ],
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
  "alan": [
    # The title itself says real-estate investment — counts at any employer,
    # including a bank, an insurer or a company buying its own buildings.
    ("Real Estate Private Equity Associate",   "saas",      True),
    ("Associate, Real Estate Acquisitions",    "consumer",  True),
    ("Real Estate Investments Associate",      "insurance", True),
    ("Analyst, Real Estate Capital Markets",   "fintech",   True),
    ("Multifamily Acquisitions Associate",     "saas",      True),
    ("Real Estate Asset Management Associate", "saas",      True),
    # "Acquisitions Associate" with no property word in it is a real-estate job
    # at a real-estate firm and a corp-dev or growth job anywhere else, so it
    # sits in the broad lane rather than the strict one. The Farmer's Dog posts
    # an "Acquisition Manager" and Figma a "Product Manager, Acquisition".
    ("Acquisitions Associate",                 "repe",      True),
    ("Acquisitions Associate",                 "saas",      False),
    ("Acquisitions Analyst",                   "lender",    True),
    ("Acquisitions Analyst",                   "media",     False),
    ("Associate - Acquisitions",               "reit",      True),
    ("Associate - Acquisitions",               "media",     False),
    ("Acquisition Manager, Enablement",        "consumer",  False),
    ("Product Manager, Acquisition",           "saas",      False),
    # The broad lane widens the net only where the firm's business IS real
    # estate. "Investment Associate" at a venture fund is a different job with
    # the same words in it.
    ("Investment Associate",                   "repe",      True),
    ("Investment Associate",                   "saas",      False),
    ("Asset Management Analyst",               "reit",      True),
    ("Asset Management Analyst",               "media",     False),
    # Fintech is NOT in broadVerticals: his fintech targets are product and
    # credit roles, and those name the workflow in the title.
    ("Asset Management Analyst",               "fintech",   False),
    ("Development Associate",                  "developer", True),
    ("Underwriting Analyst",                   "lender",    True),
    # A diversified manager, a bank and an insurer all have a real-estate desk,
    # but almost everything they post is something else. Their verticals are
    # outside broadVerticals, so only a title that names real estate counts.
    ("Investment Associate, Private Credit",   "assetmgr",  False),
    ("Investment Banking Analyst",             "assetmgr",  False),
    ("Equity Research Associate",              "assetmgr",  False),
    ("Ratings Associate, Investment Products", "assetmgr",  False),
    ("Real Estate Acquisitions Associate",     "assetmgr",  True),
    # Fund accounting and finance operations live inside real-estate groups and
    # carry every real-estate word, but they are not the job Alan asked for.
    ("Real Estate Development Accountant",      "brokerage", False),
    ("Real Estate Fund Accountant",             "repe",      False),
    ("Real Estate Debt Finance & Operations, Associate", "assetmgr", False),
    ("Real Estate Financial Reporting Analyst", "reit",      False),
    # "Acquisition" belongs to recruiting and marketing at least as often as it
    # belongs to real estate, and "development" belongs to sales and software.
    ("Talent Acquisition Partner",             "repe",      False),
    ("Customer Acquisition Manager",           "repe",      False),
    ("User Acquisition Associate",             "saas",      False),
    ("Business Development Associate",         "repe",      False),
    ("Software Engineer, Real Estate Platform", "proptech", False),
    # Property-side work at a real-estate firm is not the investment side.
    ("Leasing Consultant",                     "reit",      False),
    ("Property Manager",                       "operator",  False),
    ("Real Estate Agent",                      "brokerage", False),
    ("Maintenance Technician",                 "operator",  False),
    ("Recruiting Coordinator",                 "repe",      False),
    ("Acquisitions Intern",                    "repe",      False),

    # ── the credit side he already works on ──────────────────────────────
    ("Commercial Real Estate Underwriter",     "bank",      True),
    ("CRE Credit Analyst",                     "bank",      True),
    ("Real Estate Debt Originations Associate", "assetmgr", True),
    ("CMBS Analyst",                           "assetmgr",  True),
    ("Commercial Mortgage Backed Securities Associate", "saas", True),
    ("Agency Multifamily Underwriter",         "lender",    True),
    ("Freddie Mac Loan Servicing Analyst",     "lender",    True),
    ("Structured Finance Associate, Real Estate", "assetmgr", True),
    ("Real Estate Private Credit Associate",   "assetmgr",  True),
    ("Multifamily Credit Underwriting Manager", "lender",   True),
    ("Portfolio Manager, Commercial Real Estate", "bank",   True),
    ("Underwriting Analyst",                   "lender",    True),
    ("Asset Manager",                          "reit",      True),
    # Credit that is not real-estate credit stays out.
    ("Senior Credit Underwriter (C&I)",        "bank",      False),
    ("Consumer Lending Analyst",               "bank",      False),
    ("Auto Loan Underwriter",                  "bank",      False),
    ("Underwriter II, Financial Lines",        "insurance", False),
    ("Senior Underwriter, Political Violence", "insurance", False),

    # ── product and proptech built on those workflows ────────────────────
    ("Product Manager, CRE Lending",           "saas",      True),
    ("Product Specialist, Real Estate Valuations", "saas",  True),
    ("Real Estate Product Strategist",         "media",     True),
    ("Product Manager",                        "proptech",  True),
    ("Solutions Consultant",                   "proptech",  True),
    ("Product Manager",                        "consumer",  False),
    ("Product Manager, Acquisition",           "saas",      False),
    # A fintech's product roles count only when the title names the workflow
    # Alan knows. A payments PM is not a CRE underwriting PM.
    ("Senior Product Manager - Business Lending", "fintech", True),
    ("Staff Product Manager, Credit",          "fintech",   True),
    ("Staff Product Manager, Payments",        "fintech",   False),
    ("Product Manager, Mobile",                "fintech",   False),
    ("Senior Product Manager, Crypto Wallet",  "fintech",   False),
    ("Portfolio Manager ECM US",               "fintech",   False),
    # Shapes that reached the board and should not have.
    ("Learning and Development Specialist",    "fintech",   False),
    ("Partner Development Manager",            "proptech",  False),
    ("IT Program & Portfolio Manager",         "operator",  False),
    ("Associate Product Manager (New Grad)",   "proptech",  False),
    ("2027 Private Equity Analyst",            "fintech",   False),
    # Summer analyst is the internship by another name, and this board is for
    # associates. QuadReal posted a three-month one and it landed.
    ("Summer Analyst, U.S. Real Estate Debt",  "repe",      False),
    ("Real Estate Summer Associate",           "repe",      False),
    ("Analyst Program - Real Estate Debt",     "assetmgr",  True),
  ],
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
  raw = [probe_row(pid, "Data Entry Clerk", "Remote, US")]
  got = rc.filter_jobs(profile, PROBE_ATS.get(pid, "greenhouse"), raw, "slug", "bpo")
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


# Every one of these came off a real posting that reached the board because
# the parser missed it. The gap between the number and "experience" is prose,
# so it needs room; and a posting calling itself entry-level in one paragraph
# while asking for five years in the next is asking for five years.
YEARS_CASES = [
  ("2-4 years of relevant administrative experience supporting executives.", 2),
  ("7+ years of experience in an administrative role.",                      7),
  ("5+ years of relevant professional experience.",                          5),
  ("1+ years customer-facing experience.",                                   1),
  ("This is an entry-level position. Requires 5+ years of experience.",      5),
  ("Minimum 3 years hands-on background with spreadsheets.",                 3),
  ("We welcome applicants of all levels. No experience is required.",        0),
  ("Great communication skills required.",                                None),
]


def run_years() -> int:
  bad = 0
  for text, want in YEARS_CASES:
    got = rc.years_required(text)
    if got != want:
      bad += 1
      print(f"  \u2717 [years] {text[:52]!r}: expected {want}, got {got}", file=sys.stderr)
  if not bad:
    print(f"   \u2713 years: {len(YEARS_CASES)} case(s) pass")
  return bad


# Experience demanded in prose rather than in years. Each of these came off a
# real posting: the screen has to catch a requirement, ignore a preference,
# and keep the two straight when they sit in the same list.
DEMAND_CASES = [
  ("<h3>Requirements</h3><ul><li>Experience resolving billing disputes.</li></ul>", True),
  ("<h3>Requirements</h3><ul><li>Previous experience transacting cryptocurrency</li></ul>", True),
  ("<h3>What we look for</h3><ul><li>Minimum 1 year relevant call center experience</li></ul>", True),
  ("<h3>Requirements</h3><ul><li>Bachelor's degree</li></ul>", True),
  ("<h3>Who you are</h3><ul><li>Experience in Customer Support via phone</li></ul>", True),
  # A preference is not a barrier, even inside a requirements list.
  ("<h3>Requirements</h3><ul><li>Experience with Excel preferred but not required.</li></ul>", False),
  ("<h3>Requirements</h3><ul><li>Experience with billing software (e.g., Stripe) is a plus.</li></ul>", False),
  ("<h3>Nice to have</h3><ul><li>Experience with Looker</li></ul>", False),
  ("<h3>What we look for</h3><ul><li>Full training provided, no experience required.</li></ul>", False),
  # Salary boilerplate mentions experience without demanding any.
  ("<h3>Requirements</h3><ul><li>Pay is determined by factors including relevant experience.</li></ul>", False),
  # A demand and its softener in the same list must not contaminate each other.
  ("<h3>Requirements</h3><ul><li>Experience resolving disputes.</li>"
   "<li>Experience with Stripe is a plus.</li></ul>", True),
  # No requirements section at all: nothing to judge.
  ("<p>We are a friendly team looking for someone reliable.</p>", False),
]


def run_demands() -> int:
  bad = 0
  for text, want in DEMAND_CASES:
    got = bool(rc.experience_demands(text))
    if got != want:
      bad += 1
      print(f"  \u2717 [demand] {text[:58]!r}: expected {'refused' if want else 'kept'}", file=sys.stderr)
  if not bad:
    print(f"   \u2713 demands: {len(DEMAND_CASES)} prose-experience case(s) pass")
  return bad


def run_require_description(pid: str) -> int:
  """A profile with requireDescription must refuse a posting it cannot read.
  Unread is unscreened, which on this board is the whole point."""
  profile = rc.Profile(pid)
  if not profile.require_description:
    return 0
  base = {"title": "Data Entry Clerk", "location": {"name": "Remote, US"},
          "absolute_url": "https://example.com/job", "updated_at": "2026-01-01"}
  bad = 0
  # Lever is used because its description comes from the listing, so no
  # network request is attempted when the field is missing or too short.
  lever_row = {"text": "Data Entry Clerk", "categories": {"location": "Remote, US"},
               "hostedUrl": "https://example.com/job", "createdAt": 0}
  if rc.filter_jobs(profile, "lever", [dict(lever_row)], "slug", "bpo"):
    bad += 1
    print("  \u2717 [require-description] a posting with no description was kept", file=sys.stderr)
  lever_row["descriptionPlain"] = BENIGN_DESCRIPTION
  if not rc.filter_jobs(profile, "lever", [dict(lever_row)], "slug", "bpo"):
    bad += 1
    print("  \u2717 [require-description] a readable posting was refused", file=sys.stderr)
  if not bad:
    print(f"   \u2713 {pid}: unreadable postings are refused, readable ones kept")
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
    raw = [probe_row(pid, GEO_PROBE_TITLE[pid], loc)]
    got = rc.filter_jobs(profile, PROBE_ATS.get(pid, "greenhouse"), raw, "slug", "gaming")
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
    raw = [probe_row(pid, title, TITLE_PROBE_LOC[pid])]
    got = bool(rc.filter_jobs(profile, PROBE_ATS.get(pid, "greenhouse"), raw, "slug", vertical))
    if got != want:
      bad += 1
      print(f"  ✗ [{vertical}] {title!r}: expected {'in' if want else 'out'}, got "
            f"{'in' if got else 'out'}", file=sys.stderr)
  if bad:
    print(f"{pid}: {bad} of {len(cases)} case(s) failed", file=sys.stderr)
  else:
    print(f"   ✓ {pid}: {len(cases)} filter case(s) pass")
  return bad


# ── the dead-link detector ────────────────────────────────────────────────
# Several ATSs answer 200 with a "no longer accepting applications" shell. The
# link checker treats that as a 404, so the pattern has to be tight: too loose
# and it prunes live postings whose text happens to contain "no longer".
GONE_CASES = [
  ("This job is no longer available", True),
  ("No longer accepting applications for this role", True),
  ("The position has been filled", True),
  ("Sorry, this posting does not exist", True),
  ("Job not found", True),
  ("This requisition has been closed", True),
  ("You will no longer need to chase invoices manually", False),
  ("We are hiring a Data Entry Clerk", False),
  ("Position: Administrative Assistant. Apply now.", False),
  ("This role is open to remote candidates", False),
]


def run_gone() -> int:
  spec = importlib.util.spec_from_file_location("cu", ROOT / "scripts" / "check-urls.py")
  cu = importlib.util.module_from_spec(spec)
  argv, sys.argv = sys.argv, ["cu"]
  try:
    spec.loader.exec_module(cu)
  finally:
    sys.argv = argv
  bad = 0
  for body, want in GONE_CASES:
    if bool(cu.GONE.search(body)) != want:
      bad += 1
      print(f"  ✗ gone: {body!r} expected {'gone' if want else 'live'}", file=sys.stderr)
  if not bad:
    print(f"   ✓ gone-page: {len(GONE_CASES)} case(s) pass")
  return bad


# ── company identity ──────────────────────────────────────────────────────
# scout.py decides whether a board belongs to the company we named. Every case
# below is a real board it got wrong at some point. This runs offline: it tests
# the comparison, not the network.
IDENTITY_CASES = [
  # The declared name is the legal entity doing the hiring, so it routinely
  # swaps one industry suffix for another, or names a subsidiary.
  ("Blackstone", "64012 Blackstone Real Estate Advisors LP", True),
  ("Carlyle Group", "1P284 THE CARLYLE GROUP EMPLOYEE CO., LLC", True),
  ("Brookfield Asset Management", "Brookfield", True),
  ("Regions Financial", "Regions Bank", True),
  ("PNC Financial Services", "PNC Bank, National Association", True),
  ("Truist Securities", "Truist Bank", True),
  ("Simon Property Group", "Simon Management Associates II, LLC", True),
  ("Savills", "Savills plc", True),
  # Finance abbreviates itself, so a short core is compared as an acronym.
  ("JLL", "*US AMR-JLL Corporate Headquarters", True),
  ("CIBC", "Canadian Imperial Bank of Commerce", True),
  ("AIG", "AIG MEXICO SEGUROS INTERAMERICANA", True),
  # Sharing one word is not identification. A Workday tenant guessed as
  # "western" for Western Alliance Bancorporation is a Colorado university.
  ("Western Alliance Bancorporation", "Western Colorado University", False),
  ("Wunderman Thompson", "VML", False),
  ("Gradle", "Develocity", False),
  ("Zendesk", "Acme Widgets", False),
  # Known limitation, asserted rather than hidden: two real companies separated
  # only by an industry suffix cannot be told apart by name. Geography is what
  # keeps Heartland Bank of New Zealand off a New York board.
  ("Heartland Financial", "C200 Heartland Bank Limited", True),
]


def run_identity() -> int:
  spec = importlib.util.spec_from_file_location("scout", ROOT / "scripts" / "scout.py")
  sc = importlib.util.module_from_spec(spec)
  argv, sys.argv = sys.argv, ["scout"]
  try:
    spec.loader.exec_module(sc)
  finally:
    sys.argv = argv
  bad = 0
  for name, declared, want in IDENTITY_CASES:
    if sc.same_company(name, declared) != want:
      bad += 1
      print(f"  ✗ identity: {name!r} vs {declared!r} expected "
            f"{'same' if want else 'different'}", file=sys.stderr)
  if not bad:
    print(f"   ✓ identity: {len(IDENTITY_CASES)} company-name case(s) pass")
  return bad


def main():
  ids = sys.argv[1:] or sorted(
    p.stem for p in (ROOT / "profiles").glob("*.json") if not p.name.endswith(".companies.json"))
  sys.exit(1 if sum(run(i) + run_geo(i) + run_pay(i) + run_screens(i) + run_require_description(i) for i in ids) + run_summary() + run_years() + run_demands() + run_gone() + run_identity() else 0)


if __name__ == "__main__":
  main()
