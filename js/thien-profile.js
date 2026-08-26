// thien — board profile (generated from profiles/thien.json; do not hand-edit)
// Rebuild: node scripts/build-profile.js thien
window.BOARD_PROFILE = {
  "id": "thien",
  "person": "Thien",
  "boardTitle": "Thien's Job Board",
  "docTitle": "thien — NYC analyst jobs (Strategic / Ops / Data / BI)",
  "headline": "Companies",
  "blurb": "live analyst postings (Strategic / Operations / Data / BI). Ranked by fit for Thien's background — sorted highest first.",
  "page": "index.html",
  "dataFile": "js/data.js",
  "dataGlobal": "DATA",
  "profileScript": "js/thien-profile.js",
  "storageKey": "thien_applied",
  "categories": [
    {
      "key": "all",
      "label": "All"
    },
    {
      "key": "bi",
      "label": "BI",
      "match": "business\\s+intelligence|\\bbi\\s+(?:analyst|developer)\\b"
    },
    {
      "key": "strategic",
      "label": "Strategic",
      "match": "\\b(strategic|strategy|corporate\\s+strategy|business\\s+strategy)\\b"
    },
    {
      "key": "operations",
      "label": "Operations",
      "match": "\\b(operations|ops|revops|sales\\s+operations|marketing\\s+operations|supply\\s+chain|logistics|procurement|fulfillment|inventory|revenue\\s+operations)\\b"
    },
    {
      "key": "data",
      "label": "Data",
      "match": "\\b(data|analytics|reporting|product\\s+analyst|growth\\s+analyst|marketing\\s+analyst)\\b"
    }
  ],
  "categoryFallback": "operations",
  "levels": [
    {
      "key": "all",
      "label": "All levels"
    },
    {
      "key": "entry",
      "label": "Entry"
    },
    {
      "key": "mid",
      "label": "Mid"
    }
  ],
  "verticals": {
    "labels": {
      "ai": "AI",
      "hospitality": "Hospitality",
      "marketplace": "Marketplace",
      "devtools": "Dev Tools",
      "fintech": "Fintech",
      "saas": "SaaS",
      "infra": "Infra",
      "health": "Health",
      "sports": "Sports",
      "fitness": "Fitness",
      "media": "Media",
      "consumer": "Consumer",
      "gaming": "Gaming",
      "adtech": "AdTech",
      "climate": "Climate",
      "security": "Security",
      "cpg": "CPG"
    },
    "pills": {
      "ai": "pill-ai",
      "hospitality": "pill-hosp",
      "marketplace": "pill-mkt",
      "devtools": "pill-dev",
      "fintech": "pill-both",
      "saas": "pill-dev",
      "infra": "pill-dev",
      "health": "pill-hosp",
      "sports": "pill-ai",
      "fitness": "pill-hosp",
      "media": "pill-mkt",
      "consumer": "pill-mkt",
      "gaming": "pill-ai",
      "adtech": "pill-dev",
      "climate": "pill-hosp",
      "security": "pill-dev",
      "cpg": "pill-mkt"
    }
  },
  "scoring": {
    "coolness": {
      "map": {
        "partiful": 10,
        "dorsia": 10,
        "suno": 10,
        "flora": 10,
        "udio": 10,
        "substack": 9,
        "plot": 9,
        "qloo": 9,
        "slate": 9,
        "patreon": 9,
        "hang": 9,
        "beacons": 9,
        "aura-frames": 9,
        "output": 9,
        "runway": 9,
        "hedra": 9,
        "ideogram": 8,
        "hume-ai": 8,
        "lovable": 8,
        "warp": 8,
        "cursor": 8,
        "etsy": 8,
        "nyt": 8,
        "reddit": 8,
        "seatgeek": 7,
        "opus-training": 7,
        "glossgenius": 7,
        "bombas": 7,
        "resortpass": 7,
        "spotify": 7,
        "huggingface": 7,
        "perplexity": 7,
        "notion": 7,
        "linear": 7,
        "figma": 7,
        "elevenlabs": 7,
        "mighty-networks": 7,
        "crosby": 7,
        "vercel": 6,
        "replit": 6,
        "airtable": 6,
        "glide": 6,
        "blockworks": 6,
        "kalshi": 6,
        "polymarket": 6,
        "whatnot": 6,
        "ro": 6,
        "hopper": 6,
        "lyft": 6,
        "bilt": 6,
        "mirage": 6,
        "sesame-ai": 6,
        "black-forest-labs": 6,
        "navan": 5,
        "metropolis": 5,
        "via": 5,
        "cityblock": 5,
        "propel": 5,
        "loopai": 5,
        "blee": 5,
        "sequence": 5,
        "headway": 5,
        "maven-clinic": 5,
        "spring-health": 5,
        "talkspace": 5,
        "k-health": 5,
        "camber": 5,
        "abridge": 5,
        "squarespace": 5,
        "mercury": 5,
        "stripe": 5,
        "robinhood": 5,
        "block": 5,
        "reflex-robotics": 5,
        "cartesia": 5,
        "clay-labs": 5,
        "commure": 4,
        "oscar": 4,
        "zocdoc": 4,
        "lemonade": 4,
        "rho": 4,
        "brigit": 4,
        "stash": 4,
        "chime": 4,
        "betterment": 4,
        "airgoods": 4,
        "hebbia": 4,
        "openai": 4,
        "anthropic": 4,
        "mistral": 4,
        "cognition": 4,
        "modal": 4,
        "normal-computing": 4,
        "stainless": 4,
        "hex": 4,
        "watershed": 4,
        "ramp": 4,
        "disney": 4,
        "mercor": 4,
        "sofi": 3,
        "wealthfront": 3,
        "affirm": 3,
        "doordash": 6,
        "alphasense": 3,
        "snorkel-ai": 3,
        "cohere": 3,
        "harvey": 3,
        "writer": 3,
        "decagon": 3,
        "sierra": 3,
        "unify": 3,
        "kustomer": 3,
        "attentive": 3,
        "iterable": 3,
        "braze": 3,
        "knock": 3,
        "plaid": 3,
        "alchemy": 3,
        "galaxy-digital": 3,
        "brex": 3,
        "tavily": 3,
        "langchain": 3,
        "baseten": 3,
        "deepgram": 3,
        "assemblyai": 3,
        "poolside": 3,
        "fireworks": 3,
        "pinecone": 3,
        "braintrust": 3,
        "arize": 3,
        "logrocket": 3,
        "general-context": 3,
        "sola": 3,
        "gusto": 3,
        "yext": 2,
        "the-trade-desk": 2,
        "doubleverify": 2,
        "asana": 2,
        "mongodb": 2,
        "datadog": 2,
        "cockroach-labs": 2,
        "neon": 2,
        "monte-carlo": 2,
        "carta": 2,
        "modern-treasury": 2,
        "alloy": 2,
        "middesk": 2,
        "pinwheel": 2,
        "sandbar": 2,
        "fireblocks": 2,
        "gemini": 2,
        "jane-street": 2,
        "two-sigma": 2,
        "justworks": 2,
        "distyl": 2,
        "glean": 2,
        "rilla": 2,
        "credal": 2,
        "clear": 2,
        "scaleai": 2,
        "coreweave": 2,
        "sigma-computing": 2,
        "nbcuniversal": 2,
        "drata": 1,
        "secureframe": 1,
        "ridgeline": 1,
        "salesforce": 1,
        "forge": 1,
        "blackrock": 1,
        "goldman-sachs": 1,
        "de-shaw": 1,
        "worldquant": 1,
        "point72": 1,
        "jump-trading": 1,
        "virtu": 1,
        "ideo": 8,
        "hugeinc": 6,
        "metalab": 6,
        "instrument": 6,
        "akqa": 5,
        "codeandtheory": 5,
        "kettle": 5,
        "dept": 4,
        "nearform": 4,
        "thoughtworks": 4,
        "vsapartners": 4,
        "palantir": 5,
        "factory": 6,
        "openevidence": 6,
        "vannevarlabs": 5,
        "andela": 3,
        "turing": 3,
        "toptal": 3,
        "pariveda": 3,
        "capco": 2,
        "ultra": 6,
        "tuesday-labs": 6,
        "offdeal": 5,
        "clarion": 4,
        "spur": 4,
        "ryvn": 4,
        "pointone": 4,
        "ambral": 3,
        "codes-health": 3,
        "greenboard": 3,
        "diligencesquared": 3,
        "fleetline": 3,
        "piramidalinc": 6,
        "tennr": 5,
        "fortuna-health": 5,
        "junction": 5,
        "garage": 5,
        "loula": 4,
        "prosper-ai": 4,
        "finny": 4,
        "careswift": 4,
        "atg": 4,
        "avallon": 3,
        "solva": 3,
        "claim-health": 3,
        "a24": 9,
        "aimeleondore": 8,
        "splice": 6,
        "sonymusic": 6,
        "goop": 5,
        "livenation": 4,
        "honestco": 3,
        "ganni": 9,
        "rockstargames": 9,
        "duolingo": 8,
        "blackbird": 8,
        "bdg": 8,
        "farmers-dog": 7,
        "soundcloud": 7,
        "uniswap": 6,
        "attio": 6,
        "graphite": 6,
        "browserbase": 6,
        "fanduel": 6,
        "handshake": 5,
        "midpage": 5,
        "semgrep": 5,
        "peloton": 4,
        "equinox": 4,
        "materialize": 4,
        "knotapi": 4,
        "extend": 4,
        "ripple": 4,
        "databento": 4,
        "numeric": 3,
        "numeral": 3,
        "socure": 3,
        "imprint": 3,
        "nayya": 3,
        "dailypay": 2,
        "mosaic": 2,
        "octus": 2,
        "nyc-gov": 2,
        "drw": 1,
        "imc": 1,
        "flow-traders": 1,
        "old-mission": 1,
        "socotec": 1,
        "nba": 10,
        "nfl": 10,
        "mlb": 10,
        "wnba": 9,
        "draftkings": 9,
        "fanatics": 9,
        "underdog": 8,
        "prizepicks": 8,
        "theathletic": 9,
        "overtime": 8,
        "sportradar": 7,
        "dazn": 7,
        "whoop": 8,
        "strava": 8,
        "classpass": 6,
        "barrys": 6,
        "instacart": 5,
        "uber": 6,
        "pinterest": 6,
        "airbnb": 7,
        "stockx": 7,
        "warby": 8,
        "rentherunway": 6,
        "himsandhers": 5,
        "sweetgreen": 7,
        "compass": 4,
        "netflix": 8,
        "vice": 5,
        "bloomberg-media": 5,
        "wondery": 6,
        "current": 5,
        "marqeta": 4,
        "nubank": 6,
        "rocket-money": 4,
        "databricks": 5,
        "snowflake": 4,
        "segment": 4,
        "box": 2,
        "hubspot": 3,
        "verkada": 4
      },
      "byVertical": {
        "sports": 8,
        "fitness": 8,
        "media": 6,
        "consumer": 6,
        "ai": 5,
        "devtools": 4,
        "infra": 4
      },
      "default": 4
    },
    "candidateMult": {
      "stageBoost": [
        [
          "seed|series a\\b",
          1.1
        ]
      ],
      "groupMult": {
        "frontier": 0.75,
        "quantGated": 0.35,
        "bulgeBracket": 0.6
      },
      "clamp": [
        0.2,
        1.4
      ]
    },
    "replyProb": {
      "base": 0.14,
      "stageTable": [
        [
          "seed",
          0.32
        ],
        [
          "series a\\b",
          0.26
        ],
        [
          "series b\\b",
          0.2
        ],
        [
          "series c\\b",
          0.15
        ],
        [
          "series d\\b",
          0.12
        ],
        [
          "series e\\b",
          0.1
        ],
        [
          "series [fghij]\\b|public|late|take",
          0.08
        ]
      ],
      "groupMult": {
        "frontier": 0.5
      },
      "roleCountPenalty": [
        [
          15,
          0.75
        ],
        [
          10,
          0.88
        ]
      ],
      "clamp": [
        0.03,
        0.45
      ]
    },
    "passProb": {
      "base": 0.35,
      "titleRules": [
        [
          "operations\\s+analyst|business\\s+operations|bizops",
          0.18
        ],
        [
          "supply\\s+chain|logistics|procurement|fulfillment|inventory",
          0.2
        ],
        [
          "data\\s+analyst|analytics\\s+analyst|reporting\\s+analyst",
          0.15
        ],
        [
          "business\\s+intelligence|\\bbi\\s+(?:analyst|developer)\\b",
          0.12
        ],
        [
          "strategy|strategic",
          0.05
        ],
        [
          "marketing\\s+analyst|growth\\s+analyst|product\\s+analyst",
          0.05
        ],
        [
          "revenue\\s+operations|revops|sales\\s+operations|marketing\\s+operations",
          0.02
        ],
        [
          "senior|staff|principal|lead",
          -0.3
        ],
        [
          "actuar|underwrit|quantitative|\\bquant\\b",
          -0.25
        ],
        [
          "machine\\s+learning|ml\\s+scientist|data\\s+scientist",
          -0.15
        ]
      ],
      "levelBonus": {
        "entry": 0.1,
        "mid": 0.02
      },
      "clamp": [
        0.05,
        0.7
      ]
    },
    "groups": {
      "frontier": [
        "openai",
        "anthropic",
        "cohere",
        "mistral",
        "perplexity",
        "huggingface",
        "cursor",
        "cognition",
        "glean",
        "sierra",
        "scaleai",
        "harvey",
        "runway",
        "black-forest-labs"
      ],
      "quantGated": [
        "de-shaw",
        "two-sigma",
        "jane-street",
        "point72",
        "worldquant",
        "jump-trading",
        "virtu",
        "drw",
        "imc",
        "flow-traders",
        "old-mission"
      ],
      "bulgeBracket": [
        "goldman-sachs",
        "morgan-stanley",
        "jpmorgan",
        "blackrock",
        "citi",
        "bofa"
      ]
    },
    "penalties": [
      {
        "name": "crypto",
        "ids": [
          "alchemy",
          "blockworks",
          "chainalysis",
          "elliptic",
          "fireblocks",
          "galaxy-digital",
          "gemini",
          "ledger",
          "notabene",
          "ondofinance",
          "paxos",
          "polymarket",
          "ripple",
          "trm-labs",
          "uniswap"
        ],
        "mult": 0.5
      }
    ],
    "tiers": [
      {
        "min": 8,
        "label": "Goldilocks",
        "cls": "fit-strong"
      },
      {
        "min": 5,
        "label": "Worth trying",
        "cls": "fit-worth"
      },
      {
        "min": 2,
        "label": "Long shot",
        "cls": "fit-long"
      },
      {
        "min": -1,
        "label": "Tough bar",
        "cls": "fit-tough"
      }
    ]
  },
  "defaultLevel": "mid"
};
