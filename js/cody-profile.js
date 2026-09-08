// cody — board profile (generated from profiles/cody.json; do not hand-edit)
// Rebuild: node scripts/build-profile.js cody
window.BOARD_PROFILE = {
  "id": "cody",
  "person": "Cody",
  "boardTitle": "Cody's Data Entry Board",
  "docTitle": "cody — remote data entry + admin jobs, little experience needed",
  "headline": "Employers",
  "blurb": "live remote postings that will train you. Every posting is read, not just its title: anything whose requirements section demands prior experience, a degree, a licence or a certification is filtered out, as is anything carrying the classic job-scam markers. Every listing comes from the employer's own applicant-tracking system — never an aggregator.",
  "page": "cody.html",
  "dataFile": "js/cody-data.js",
  "dataGlobal": "CODY_DATA",
  "profileScript": "js/cody-profile.js",
  "storageKey": "cody_applied",
  "defaultLevel": "entry",
  "payEstimate": {
    "interval": "hour",
    "note": "US market midpoint for the role family, not the employer's figure.",
    "titleBands": [
      {
        "match": "medical\\s+(?:coder|records)|coding\\s+specialist",
        "min": 20,
        "max": 30
      },
      {
        "match": "medical\\s+scribe|\\bscribe\\b",
        "min": 15,
        "max": 22
      },
      {
        "match": "claims|billing|insurance|underwrit",
        "min": 18,
        "max": 26
      },
      {
        "match": "title|escrow|loan|mortgage",
        "min": 19,
        "max": 28
      },
      {
        "match": "payroll|accounts\\s+(?:payable|receivable)|invoice|bookkeep",
        "min": 19,
        "max": 27
      },
      {
        "match": "transcription|captioner|scopist|proofread",
        "min": 15,
        "max": 25
      },
      {
        "match": "annotat|label|content\\s+moderat|content\\s+review|reviewer",
        "min": 16,
        "max": 24
      },
      {
        "match": "executive\\s+assistant",
        "min": 22,
        "max": 34
      },
      {
        "match": "administrative|admin|office\\s+(?:assistant|coordinator)|virtual\\s+assistant",
        "min": 18,
        "max": 26
      },
      {
        "match": "operations\\s+(?:associate|coordinator|specialist)|fulfillment",
        "min": 19,
        "max": 28
      },
      {
        "match": "customer\\s+(?:support|service)|support\\s+(?:associate|specialist)|client\\s+services",
        "min": 17,
        "max": 25
      },
      {
        "match": "data\\s+entry|data\\s+clerk|data\\s+processor|data\\s+capture|data\\s+input",
        "min": 17,
        "max": 24
      },
      {
        "match": "quality\\s+(?:assurance|control)|indexer|cataloger|digitiz",
        "min": 17,
        "max": 25
      }
    ],
    "default": {
      "min": 17,
      "max": 25
    },
    "levelMultiplier": {
      "entry": 1,
      "mid": 1.15
    }
  },
  "categories": [
    {
      "key": "all",
      "label": "All"
    },
    {
      "key": "dataentry",
      "label": "Data Entry",
      "match": "data\\s+entry|data\\s+clerk|data\\s+processor|data\\s+capture|data\\s+input|digitiz|indexer|cataloger|data\\s+technician"
    },
    {
      "key": "admin",
      "label": "Admin / EA",
      "match": "administrative|admin|office\\s+(?:assistant|coordinator)|executive\\s+assistant|virtual\\s+assistant|program\\s+assistant|project\\s+assistant"
    },
    {
      "key": "records",
      "label": "Claims / Records",
      "match": "claims|billing|invoice|payroll|accounts|records|filing|intake|enrollment|verification|title|escrow|loan|mortgage|medical\\s+(?:coder|records)|coding"
    },
    {
      "key": "annotation",
      "label": "Annotation / Review",
      "match": "annotat|label|content\\s+moderat|content\\s+review|reviewer|quality\\s+(?:assurance|control)|proofread|transcription|captioner|scopist|scribe"
    },
    {
      "key": "ops",
      "label": "Back Office",
      "match": "operations|fulfillment|order|document|catalog|listing|inventory|master\\s+data|back[\\s-]?office|support|client\\s+services|customer"
    }
  ],
  "categoryFallback": "ops",
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
      "label": "Some experience"
    }
  ],
  "levelPills": {
    "entry": "pill-both",
    "mid": "pill-dev"
  },
  "locations": [
    {
      "key": "all",
      "label": "All"
    },
    {
      "key": "remote",
      "label": "Remote (US)"
    }
  ],
  "verticals": {
    "labels": {
      "bpo": "BPO / Outsourcing",
      "health": "Health",
      "insurance": "Insurance",
      "legal": "Legal Services",
      "logistics": "Logistics",
      "staffing": "Staffing",
      "annotation": "AI Data",
      "research": "Research",
      "fintech": "Fintech",
      "proptech": "Real Estate",
      "accounting": "Accounting",
      "consumer": "Consumer",
      "saas": "SaaS",
      "marketplace": "Marketplace",
      "media": "Media",
      "ai": "AI",
      "gaming": "Gaming",
      "devtools": "Dev Tools",
      "infra": "Infra",
      "adtech": "AdTech",
      "hospitality": "Hospitality",
      "climate": "Climate",
      "sports": "Sports",
      "fitness": "Fitness",
      "security": "Security",
      "cpg": "CPG",
      "immersive": "Immersive",
      "animation": "Animation",
      "vfx": "VFX",
      "igaming": "iGaming",
      "gametech": "Game Tech",
      "simulation": "Simulation",
      "archviz": "Archviz",
      "education": "Education",
      "travel": "Travel",
      "energy": "Energy",
      "retail": "Retail",
      "telecom": "Telecom",
      "pharma": "Pharma",
      "consulting": "Consulting",
      "nonprofit": "Nonprofit",
      "industrial": "Industrial"
    },
    "pills": {
      "bpo": "pill-dev",
      "health": "pill-hosp",
      "insurance": "pill-both",
      "legal": "pill-mkt",
      "logistics": "pill-dev",
      "staffing": "pill-mkt",
      "annotation": "pill-ai",
      "research": "pill-ai",
      "fintech": "pill-both",
      "proptech": "pill-hosp",
      "accounting": "pill-both",
      "consumer": "pill-mkt",
      "saas": "pill-dev",
      "marketplace": "pill-mkt",
      "media": "pill-mkt",
      "ai": "pill-ai",
      "gaming": "pill-ai",
      "devtools": "pill-dev",
      "infra": "pill-dev",
      "adtech": "pill-dev",
      "hospitality": "pill-hosp",
      "climate": "pill-hosp",
      "sports": "pill-ai",
      "fitness": "pill-hosp",
      "security": "pill-dev",
      "cpg": "pill-mkt",
      "immersive": "pill-ai",
      "animation": "pill-mkt",
      "vfx": "pill-mkt",
      "igaming": "pill-both",
      "gametech": "pill-dev",
      "simulation": "pill-dev",
      "archviz": "pill-hosp",
      "education": "pill-ai",
      "travel": "pill-hosp",
      "energy": "pill-hosp",
      "retail": "pill-mkt",
      "telecom": "pill-dev",
      "pharma": "pill-both",
      "consulting": "pill-both",
      "nonprofit": "pill-mkt",
      "industrial": "pill-dev"
    }
  },
  "scoring": {
    "coolness": {
      "map": {},
      "byVertical": {
        "annotation": 7,
        "bpo": 6,
        "staffing": 6,
        "health": 6,
        "insurance": 6,
        "accounting": 6,
        "legal": 5,
        "logistics": 6,
        "proptech": 5,
        "research": 6,
        "fintech": 5,
        "consumer": 5,
        "marketplace": 5,
        "media": 5,
        "saas": 5,
        "ai": 5,
        "gaming": 5
      },
      "default": 5
    },
    "candidateMult": {
      "stageBoost": [
        [
          "seed|series a\\b",
          1.05
        ]
      ],
      "groupMult": {},
      "clamp": [
        0.5,
        1.3
      ]
    },
    "replyProb": {
      "base": 0.2,
      "stageTable": [
        [
          "seed",
          0.3
        ],
        [
          "series a\\b",
          0.28
        ],
        [
          "series b\\b",
          0.26
        ],
        [
          "series c\\b",
          0.24
        ],
        [
          "series d\\b",
          0.22
        ],
        [
          "series e\\b",
          0.2
        ],
        [
          "series [fghij]\\b|public|late|acquired|private equity",
          0.18
        ]
      ],
      "groupMult": {},
      "roleCountPenalty": [
        [
          40,
          0.85
        ],
        [
          15,
          0.95
        ]
      ],
      "clamp": [
        0.08,
        0.5
      ]
    },
    "passProb": {
      "base": 0.45,
      "titleRules": [
        [
          "\\bdata\\s+entry\\b",
          0.2
        ],
        [
          "\\bclerk\\b|\\bprocessor\\b|\\bdata\\s+capture\\b|\\bdata\\s+input\\b",
          0.15
        ],
        [
          "\\bannotat\\w*|\\blabel\\w*|\\breviewer\\b|\\bcontent\\s+moderat",
          0.12
        ],
        [
          "\\badministrative\\b|\\badmin\\b|\\boffice\\s+assistant\\b|\\bvirtual\\s+assistant\\b",
          0.1
        ],
        [
          "\\btranscription\\w*|\\bcaptioner\\b|\\bproofread",
          0.1
        ],
        [
          "\\bentry[\\s-]level\\b|\\bno\\s+experience\\b|\\btrainee\\b|\\bapprentice\\b",
          0.15
        ],
        [
          "\\bmedical\\s+(?:coder|records)\\b|\\bcoding\\s+specialist\\b",
          -0.15
        ],
        [
          "\\bexecutive\\s+assistant\\b",
          -0.1
        ],
        [
          "\\bii\\b|\\biii\\b|\\bexperienced\\b",
          -0.12
        ]
      ],
      "levelBonus": {
        "entry": 0.12,
        "mid": 0
      },
      "clamp": [
        0.1,
        0.85
      ]
    },
    "groups": {},
    "penalties": [],
    "tiers": [
      {
        "min": 8,
        "label": "Strong fit",
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
  "captureSummary": true,
  "poolSize": 913
};
