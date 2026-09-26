// alan — board profile (generated from profiles/alan.json; do not hand-edit)
// Rebuild: node scripts/build-profile.js alan
window.BOARD_PROFILE = {
  "id": "alan",
  "person": "Alan",
  "boardTitle": "Alan's Real Estate PE Board",
  "docTitle": "alan — real estate private equity & acquisitions jobs, New York",
  "headline": "Firms",
  "blurb": "live New York postings on the investment side of real estate — acquisitions, underwriting, asset management, development and capital markets.",
  "page": "alan.html",
  "dataFile": "js/alan-data.js",
  "dataGlobal": "ALAN_DATA",
  "profileScript": "js/alan-profile.js",
  "storageKey": "alan_applied",
  "categories": [
    {
      "key": "all",
      "label": "All"
    },
    {
      "key": "acquisitions",
      "label": "Acquisitions",
      "match": "acquisi|underwrit|transaction|disposition|investment|deal"
    },
    {
      "key": "assetmgmt",
      "label": "Asset Mgmt",
      "match": "asset\\s+manage|portfolio|valuation|business\\s+plan"
    },
    {
      "key": "development",
      "label": "Development",
      "match": "development|construction|entitlement|pre[\\s-]?development"
    },
    {
      "key": "capital",
      "label": "Capital Markets",
      "match": "capital\\s+markets|debt|credit|financing|origination|lending|structured|mortgage"
    }
  ],
  "categoryFallback": "acquisitions",
  "levels": [
    {
      "key": "all",
      "label": "All levels"
    },
    {
      "key": "analyst",
      "label": "Analyst"
    },
    {
      "key": "associate",
      "label": "Associate"
    },
    {
      "key": "senior",
      "label": "VP+"
    }
  ],
  "levelPills": {
    "analyst": "pill-both",
    "associate": "pill-dev",
    "senior": "pill-ai"
  },
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
      "industrial": "Industrial",
      "repe": "RE Private Equity",
      "reit": "REIT",
      "developer": "Developer",
      "lender": "RE Credit",
      "brokerage": "Brokerage",
      "assetmgr": "Asset Manager",
      "operator": "Operator",
      "famoffice": "Family Office",
      "bank": "Bank"
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
      "industrial": "pill-dev",
      "repe": "pill-both",
      "reit": "pill-dev",
      "developer": "pill-mkt",
      "lender": "pill-ai",
      "brokerage": "pill-hosp",
      "assetmgr": "pill-both",
      "operator": "pill-dev",
      "famoffice": "pill-mkt",
      "bank": "pill-sde"
    }
  },
  "defaultLevel": "associate",
  "emptyNote": "The bar is an investment-side real-estate role — acquisitions, underwriting, asset management, development or capital markets — sitting in New York.",
  "captureSummary": true,
  "scoring": {
    "coolness": {
      "map": {},
      "byVertical": {
        "repe": 9,
        "assetmgr": 8,
        "famoffice": 8,
        "reit": 7,
        "developer": 7,
        "lender": 7,
        "operator": 6,
        "brokerage": 5,
        "proptech": 6,
        "fintech": 5,
        "saas": 4,
        "insurance": 5,
        "consulting": 5
      },
      "default": 4
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
      "base": 0.18,
      "stageTable": [
        [
          "seed",
          0.28
        ],
        [
          "series a\\b",
          0.26
        ],
        [
          "series b\\b",
          0.24
        ],
        [
          "series c\\b",
          0.22
        ],
        [
          "series d\\b",
          0.2
        ],
        [
          "series [efghij]\\b|public|late|acquired|private equity",
          0.16
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
        0.06,
        0.45
      ]
    },
    "passProb": {
      "base": 0.35,
      "titleRules": [
        [
          "\\breal\\s*estate\\s+private\\s+equity\\b|\\brepe\\b",
          0.15
        ],
        [
          "\\bacquisitions?\\b",
          0.12
        ],
        [
          "\\bunderwrit\\w*",
          0.08
        ],
        [
          "\\basset\\s+manage\\w*",
          0.05
        ],
        [
          "\\bcapital\\s+markets\\b|\\bdebt\\b|\\bcredit\\b",
          0.02
        ],
        [
          "\\bvice\\s+president\\b|\\bvp\\b|\\bdirector\\b|\\bprincipal\\b",
          -0.18
        ],
        [
          "\\bhead\\s+of\\b|\\bmanaging\\b|\\bpartner\\b",
          -0.25
        ]
      ],
      "levelBonus": {
        "analyst": 0.08,
        "associate": 0.1,
        "senior": -0.1
      },
      "clamp": [
        0.05,
        0.7
      ]
    }
  },
  "poolSize": 1830
};
