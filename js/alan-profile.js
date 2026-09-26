// alan — board profile (generated from profiles/alan.json; do not hand-edit)
// Rebuild: node scripts/build-profile.js alan
window.BOARD_PROFILE = {
  "id": "alan",
  "person": "Alan",
  "boardTitle": "Alan's Real Estate PE Board",
  "docTitle": "alan — NYC commercial real estate: acquisitions, credit, asset management, CMBS and proptech",
  "headline": "Firms",
  "blurb": "live New York postings across commercial real-estate investing and credit — acquisitions, underwriting and originations, asset and portfolio management, CMBS and structured credit, and the proptech product roles built on those workflows.",
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
      "match": "acquisi|investment|transaction|disposition|deal|equity"
    },
    {
      "key": "credit",
      "label": "Credit / Debt",
      "match": "credit|debt|underwrit|origination|lending|loan|cmbs|mortgage|structured|securitiz|servicing|agency|freddie|fannie"
    },
    {
      "key": "assetmgmt",
      "label": "Asset Mgmt",
      "match": "asset\\s+manage|portfolio|valuation|business\\s+plan|dispositions?"
    },
    {
      "key": "product",
      "label": "Product / Tech",
      "match": "product|solutions?|implementation|platform|data|analytics|\\bai\\b"
    },
    {
      "key": "development",
      "label": "Development",
      "match": "development|construction|entitlement"
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
      "bank": "Bank",
      "lending": "Lending"
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
      "bank": "pill-sde",
      "lending": "pill-sde"
    }
  },
  "defaultLevel": "associate",
  "emptyNote": "The bar is a commercial real-estate investing or credit role — acquisitions, underwriting, originations, asset or portfolio management, structured credit, or a proptech product role built on them — sitting in New York.",
  "captureSummary": true,
  "scoring": {
    "coolness": {
      "map": {},
      "byVertical": {
        "repe": 9,
        "assetmgr": 8,
        "famoffice": 7,
        "reit": 8,
        "developer": 7,
        "lender": 9,
        "operator": 6,
        "brokerage": 7,
        "proptech": 8,
        "fintech": 7,
        "saas": 4,
        "insurance": 5,
        "consulting": 5,
        "bank": 6,
        "lending": 5
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
          "\\bcmbs\\b|\\bcommercial\\s+mortgage\\b|\\bstructured\\s+(?:finance|credit)\\b",
          0.2
        ],
        [
          "\\b(?:cre|commercial\\s+real\\s*estate)\\b[^|]{0,40}\\b(?:credit|underwrit|originat)",
          0.2
        ],
        [
          "\\bunderwrit\\w*",
          0.18
        ],
        [
          "\\b(?:agency|multifamily)\\b[^|]{0,30}\\b(?:lending|credit|underwrit|originat)",
          0.18
        ],
        [
          "\\bfreddie\\s*mac\\b|\\bfannie\\s*mae\\b",
          0.18
        ],
        [
          "\\breal\\s*estate\\b[^|]{0,40}\\b(?:credit|debt|lending)\\b",
          0.16
        ],
        [
          "\\basset\\s+manage\\w*|\\bportfolio\\s+manage\\w*",
          0.12
        ],
        [
          "\\breal\\s*estate\\s+private\\s+equity\\b|\\brepe\\b",
          0.1
        ],
        [
          "\\bacquisitions?\\b",
          0.1
        ],
        [
          "\\bproduct\\s+(?:manager|management|specialist|strategist|owner|lead)\\b",
          -0.05
        ],
        [
          "\\bsolutions?\\s+(?:consultant|specialist)\\b|\\bimplementation\\b",
          -0.08
        ],
        [
          "\\bvice\\s+president\\b|\\bvp\\b|\\bdirector\\b|\\bprincipal\\b",
          -0.15
        ],
        [
          "\\bhead\\s+of\\b|\\bmanaging\\b|\\bpartner\\b",
          -0.25
        ]
      ],
      "levelBonus": {
        "analyst": 0.05,
        "associate": 0.1,
        "senior": -0.08
      },
      "clamp": [
        0.05,
        0.75
      ]
    }
  },
  "poolSize": 1926
};
