// sean — board profile (generated from profiles/sean.json; do not hand-edit)
// Rebuild: node scripts/build-profile.js sean
window.BOARD_PROFILE = {
  "id": "sean",
  "person": "Sean",
  "boardTitle": "Sean's Game Art Board",
  "docTitle": "sean — NYC game artist jobs (Concept / 3D / Character / Environment / VFX)",
  "headline": "Studios",
  "blurb": "live NYC postings where the job works on a game — concept, 3D, character, environment, technical art, animation and VFX. Game studios and everyone else who builds real-time worlds.",
  "page": "sean.html",
  "dataFile": "js/sean-data.js",
  "dataGlobal": "SEAN_DATA",
  "profileScript": "js/sean-profile.js",
  "storageKey": "sean_applied",
  "categories": [
    {
      "key": "all",
      "label": "All"
    },
    {
      "key": "technical",
      "label": "Tech Art",
      "match": "technical\\s+art|tech\\s+art|tools?\\s+artist|pipeline|rigg|shader|material|character\\s+td"
    },
    {
      "key": "animation",
      "label": "Animation / VFX",
      "match": "animat|vfx|\\bfx\\b|visual\\s+effects|motion|cinematic"
    },
    {
      "key": "character",
      "label": "Character / Concept",
      "match": "concept|character|creature|illustrat|storyboard|splash|key\\s+art|\\b2d\\b"
    },
    {
      "key": "environment",
      "label": "3D / Environment",
      "match": "\\b3d\\b|environment|prop|level|world|modell?er|sculpt|texture|lighting|background"
    },
    {
      "key": "design",
      "label": "Game Design",
      "match": "game\\s+design|gameplay|level\\s+design|\\bunreal\\b|\\bunity\\b"
    },
    {
      "key": "direction",
      "label": "Art Direction",
      "match": "art\\s+(?:director|lead|manager|supervisor|producer)"
    }
  ],
  "categoryFallback": "direction",
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
    },
    {
      "key": "senior",
      "label": "Senior"
    }
  ],
  "levelPills": {
    "entry": "pill-both",
    "mid": "pill-dev",
    "senior": "pill-ai"
  },
  "verticals": {
    "labels": {
      "gaming": "Gaming",
      "animation": "Animation",
      "immersive": "Immersive",
      "media": "Media",
      "consumer": "Consumer",
      "ai": "AI",
      "sports": "Sports",
      "fitness": "Fitness",
      "marketplace": "Marketplace",
      "devtools": "Dev Tools",
      "fintech": "Fintech",
      "saas": "SaaS",
      "infra": "Infra",
      "health": "Health",
      "adtech": "AdTech",
      "hospitality": "Hospitality",
      "climate": "Climate",
      "vfx": "VFX",
      "security": "Security",
      "cpg": "CPG",
      "igaming": "iGaming",
      "gametech": "Game Tech",
      "simulation": "Simulation",
      "archviz": "Archviz"
    },
    "pills": {
      "gaming": "pill-ai",
      "animation": "pill-mkt",
      "immersive": "pill-ai",
      "media": "pill-mkt",
      "consumer": "pill-mkt",
      "ai": "pill-ai",
      "sports": "pill-ai",
      "fitness": "pill-hosp",
      "marketplace": "pill-mkt",
      "devtools": "pill-dev",
      "fintech": "pill-both",
      "saas": "pill-dev",
      "infra": "pill-dev",
      "health": "pill-hosp",
      "adtech": "pill-dev",
      "hospitality": "pill-hosp",
      "climate": "pill-hosp",
      "vfx": "pill-mkt",
      "security": "pill-dev",
      "cpg": "pill-mkt",
      "igaming": "pill-both",
      "gametech": "pill-dev",
      "simulation": "pill-dev",
      "archviz": "pill-hosp"
    }
  },
  "scoring": {
    "coolness": {
      "map": {
        "rockstargames": 10,
        "riotgames": 10,
        "playstation": 9,
        "nintendo": 9,
        "bungie": 9,
        "epicgames": 9,
        "roblox": 8,
        "discord": 8,
        "fatshark": 8,
        "scopely": 6,
        "tripledot": 5,
        "dreamgames": 5,
        "hasbro": 8,
        "sphereentertainment": 8,
        "crunchyroll": 8,
        "brainpop": 6,
        "fandom": 6,
        "a24": 9,
        "netflix": 8,
        "duolingo": 8,
        "mirage": 9,
        "runway": 9,
        "hedra": 8,
        "meshy": 7,
        "flora": 8,
        "udio": 7,
        "suno": 7,
        "splice": 6,
        "sonymusic": 5,
        "spotify": 6,
        "soundcloud": 5,
        "vaynermedia": 5,
        "lightricks": 5,
        "picsart": 5,
        "cameo": 5,
        "kickstarter": 6,
        "buzzfeed": 4,
        "nyt": 7,
        "vice": 5,
        "reddit": 6,
        "pinterest": 6,
        "etsy": 7,
        "figma": 7,
        "patreon": 8,
        "substack": 7,
        "peloton": 4,
        "squarespace": 4,
        "warby": 6,
        "stockx": 6,
        "goop": 4,
        "nba": 9,
        "nfl": 9,
        "mlb": 8,
        "wnba": 8,
        "draftkings": 6,
        "fanatics": 6,
        "seatgeek": 6,
        "theathletic": 6,
        "overtime": 7,
        "whoop": 6,
        "strava": 6,
        "openai": 5,
        "anthropic": 5,
        "elevenlabs": 6,
        "perplexity": 4
      },
      "byVertical": {
        "gaming": 9,
        "animation": 8,
        "immersive": 8,
        "media": 6,
        "consumer": 5,
        "ai": 6,
        "sports": 6,
        "fitness": 5,
        "marketplace": 5
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
        "frontier": 0.85,
        "agency": 1.1
      },
      "clamp": [
        0.2,
        1.4
      ]
    },
    "replyProb": {
      "base": 0.12,
      "stageTable": [
        [
          "seed",
          0.3
        ],
        [
          "series a\\b",
          0.24
        ],
        [
          "series b\\b",
          0.18
        ],
        [
          "series c\\b",
          0.14
        ],
        [
          "series d\\b",
          0.11
        ],
        [
          "series e\\b",
          0.09
        ],
        [
          "series [fghij]\\b|public|late|take|acquired|private equity",
          0.08
        ]
      ],
      "groupMult": {
        "frontier": 0.6
      },
      "roleCountPenalty": [
        [
          15,
          0.8
        ],
        [
          8,
          0.9
        ]
      ],
      "clamp": [
        0.03,
        0.45
      ]
    },
    "passProb": {
      "base": 0.32,
      "titleRules": [
        [
          "\\b(?:concept|character|environment|prop|level|world|texture|lighting|splash|key)\\s+art\\w*",
          0.16
        ],
        [
          "\\bgame\\s+art\\w*|\\bgame\\s+design\\w*",
          0.15
        ],
        [
          "\\b3d\\b|\\bmodell?er\\b|\\bsculptor\\b",
          0.12
        ],
        [
          "\\banimator\\b|\\banimation\\b|\\brigg\\w*",
          0.1
        ],
        [
          "\\bvfx\\b|\\bvisual\\s+effects\\b",
          0.1
        ],
        [
          "\\btechnical\\s+art\\w*|\\btech\\s+art\\w*",
          0.08
        ],
        [
          "\\bmotion\\s+design\\w*|\\bmotion\\s+graphics\\b",
          0.08
        ],
        [
          "\\billustrat\\w*|\\bstoryboard\\w*",
          0.08
        ],
        [
          "\\bui\\s+art\\w*|\\bproduction\\s+art\\w*|\\bmarketing\\s+art\\w*",
          0.05
        ],
        [
          "\\bsenior\\b|\\bstaff\\b|\\bprincipal\\b|\\blead\\b",
          -0.15
        ],
        [
          "\\bart\\s+director\\b|\\bcreative\\s+director\\b|\\bhead\\s+of\\b|\\bsupervisor\\b",
          -0.25
        ],
        [
          "\\bcinematic\\b|\\bfeature\\s+film\\b|\\bbroadcast\\b",
          -0.05
        ],
        [
          "\\bgraphic\\s+designer\\b|\\bvisual\\s+designer\\b|\\bbrand\\s+designer\\b|\\bcreative\\s+(?:director|lead)\\b",
          -0.1
        ]
      ],
      "levelBonus": {
        "entry": 0.1,
        "mid": 0.02,
        "senior": -0.1
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
        "harvey"
      ],
      "agency": [
        "vaynermedia",
        "hugeinc",
        "metalab",
        "instrument",
        "akqa",
        "codeandtheory",
        "kettle",
        "dept",
        "ideo"
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
        "mult": 0.6
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
  "defaultLevel": "mid",
  "poolSize": 716,
  "emptyNote": "The bar is that the job works on a game and sits in New York. Game studios post plenty of art — it is almost never located here."
};
