import React, { useState, useEffect } from 'https://esm.sh/react@18'
import ReactDOM from 'https://esm.sh/react-dom@18/client'

// URL de base de l'API
const API_BASE_URL = 'https://test-metrics-hwmp.onrender.com/api';

const ANALYSIS_DESCRIPTIONS = {
  buffett: {
    title: "Buffett Quality Score - Explication pour les Investisseurs",
    sections: [
      {
        title: " L'Héritage de Warren Buffett",
        content: " Cette analyse applique les principes fondamentaux du plus grand investisseur de tous les temps : Warren Buffett. Elle identifie les entreprises d'exception selon sa philosophie :  'Achetez des entreprises merveilleuses à des prix raisonnables.'",
        expanded: true
      },
      {
        title: "Les 4 Piliers de la Qualité Buffett",
        type: "columns",
        items: [
          {
            title: "Rentabilité (ROE)",
            description: "Return on Equity : Ce que l'entreprise gagne avec l'argent des actionnaires",
            quote: "Buffett dit : 'Je cherche des entreprises qui génèrent au moins 15% de ROE'"
          },
          {
            title: "Efficacité (ROIC)",
            description: "Return on Invested Capital : Efficacité de tous les capitaux investis",
            note: "Pourquoi c'est important : Mesure la qualité du management"
          },
          {
            title: "Solidité (Dette/Equity)", 
            description: "Dette par rapport aux capitaux propres : Résistance aux crises",
            rule: "La règle d'or : Moins de dette = plus de résilience"
          },
          {
            title: "Marge (Net Margin)",
            description: "Marge nette : Pourcentage de bénéfice sur chaque vente", 
            indicator: "L'indicateur : Pouvoir de fixation des prix et avantage concurrentiel"
          }
        ],
        expanded: false
      },
      {
        title: "Notre Système de Notation",
        type: "table",
        headers: ["Rating", "Signification", "Critères"],
        rows: [
          ["⭐ ELITE", "Excellence absolue", "ROE > 20%, ROIC > 15%, Dette < 1.5x, Marge > 15%"],
          ["✅ STRONG", "Très haute qualité", "ROE > 12%, ROIC > 10%, Dette < 2x, Marge > 8%"],
          ["🟡 DECENT", "Bonne qualité", "ROE > 8%, ROIC > 6%, Dette < 3x, Marge > 3%"],
          ["🔴 WEAK", "À améliorer", "Ne répond pas aux critères de qualité"]
        ],
        expanded: false
      },
      {
        title: "La Philosophie Buffett en Action",
        type: "comparison", 
        good: {
          title: "Ce que Buffett recherche :",
          items: [
            "✅ Avantage concurrentiel durable (marges élevées)",
            "✅ Management compétent (ROIC élevé)",
            "✅ Peu de dette (résistance aux crises)", 
            "✅ Rentabilité constante (ROE stable)"
          ]
        },
        bad: {
          title: "Ce qu'il évite :",
          items: [
            "❌ Entreprises cycliques sans avantage concurrentiel",
            "❌ Dette excessive",
            "❌ Marges faibles ou erratiques",
            "❌ Management médiocre"
          ]
        },
        expanded: false
      },
      {
        title: "Comment Utiliser Ces Résultats",
        type: "usage",
        items: [
          {
            target: "Pour les investisseurs long terme",
            action: "→ Ciblez ⭐ ELITE et ✅ STRONG pour votre portefeuille de base"
          },
          {
            target: "Pour les investisseurs valeur", 
            action: "→ Étudiez 🟡 DECENT pour trouver des opportunités de revalorisation"
          },
          {
            target: "Pour tous les investisseurs",
            action: "→ Évitez 🔴 WEAK sauf analyse approfondie"
          }
        ],
        expanded: false
      },
      {
        title: "Points de Vigilance",
        type: "warnings",
        limitations: {
          title: "Les limites de l'analyse :",
          items: [
            "Données historiques (le passé ne garantit pas le futur)",
            "Contexte sectoriel (certains secteurs ont naturellement plus de dette)",
            "Évolutions récentes (vérifiez les dernières actualités)"
          ]
        },
        complements: {
          title: "Les compléments nécessaires :",
          items: [
            "Croissance future (les bons chiffres doivent continuer)",
            "Avantage concurrentiel (est-il durable ?)",
            "Qualité du management (intégrité et compétence)"
          ]
        },
        expanded: false
      },
      {
        type: "quote",
        content: "🌟 Le Secret de Buffett",
        quote: "\"Quand vous trouvez une entreprise exceptionnelle, gardez-la longtemps. Le temps est l'ami des merveilleuses entreprises.\"",
        note: "Cette analyse vous donne la première étape : identifier ces entreprises exceptionnelles.",
        expanded: false
      },
      {
        type: "final-note",
        content: "Utilisez ces résultats comme point de départ pour vos recherches, pas comme décision finale d'investissement. La qualité durable paie toujours à long terme !",
        expanded: false
      }
    ]
  },
  cashflow: {
  title: "Cash Flow Quality - Explication pour les Investisseurs",
  sections: [
    {
      title: "La Philosophie Cash Flow de Buffett",
      content: "Cette analyse applique un principe fondamental de Warren Buffett : 'Le bénéfice est une opinion, le cash est un fait.' Elle identifie les entreprises qui génèrent d'excellents flux de trésorerie - le véritable 'oxygène' d'une entreprise selon sa philosophie.",
      expanded: true
    },
    {
      title: "Les 4 Piliers du Cash Flow Durable",
      type: "columns",
      items: [
        {
          title: "Free Cash Flow",
          description: "Argent réellement disponible après les investissements",
          quote: "Buffett dit : 'Je ne me fie qu'au cash flow, pas aux bénéfices comptables'"
        },
        {
          title: "FCF Margin",
          description: "% du chiffre d'affaires transformé en cash libre",
          note: "Pourquoi c'est important : Mesure l'efficacité opérationnelle réelle"
        },
        {
          title: "FCF Yield", 
          description: "Rendement cash par rapport à la valorisation boursière",
          rule: "La règle d'or : Un bon FCF Yield signifie un prix raisonnable"
        },
        {
          title: "Qualité des Profits",
          description: "Cash flow opérationnel vs bénéfice net", 
          indicator: "L'indicateur : Cash flow > bénéfice = qualité supérieure"
        }
      ],
      expanded: false
    },
    {
      title: "Notre Système de Notation Cash Flow",
      type: "table",
      headers: ["Rating", "Signification", "Critères"],
      rows: [
        ["💰 EXCELLENT", "Générateur de cash exceptionnel", "FCF Yield > 6%, FCF Margin > 10%, Cash Flow > Net Income"],
        ["💸 BON", "Bon générateur de cash", "FCF Yield > 3%, FCF Margin > 5%, Cash Flow positif"],
        ["🔴 FAIBLE", "Problèmes de trésorerie", "FCF négatif ou marges insuffisantes"]
      ],
      expanded: false
    },
    {
      title: "La Philosophie Cash Flow en Action",
      type: "comparison", 
      good: {
        title: "Ce que Buffett recherche :",
        items: [
          "✅ Cash flow opérationnel supérieur au bénéfice net",
          "✅ Free Cash Flow constamment positif",
          "✅ FCF Yield attractif (>3%)",
          "✅ Croissance régulière du cash flow"
        ]
      },
      bad: {
        title: "Ce qu'il évite :",
        items: [
          "❌ Bénéfices sans génération de cash",
          "❌ FCF négatif chronique",
          "❌ Dette pour financer les opérations",
          "❌ Cash flow erratique ou cyclique excessif"
        ]
      },
      expanded: false
    },
    {
      title: "Comment Utiliser Ces Résultats",
      type: "usage",
      items: [
        {
          target: "Pour les investisseurs dividendes",
          action: "→ Ciblez 💰 EXCELLENT pour des revenus stables et durables"
        },
        {
          target: "Pour les investisseurs croissance", 
          action: "→ Recherchez 💸 BON avec FCF Margin croissante"
        },
        {
          target: "Pour tous les investisseurs",
          action: "→ Évitez 🔴 FAIBLE sauf turnaround avéré"
        }
      ],
      expanded: false
    },
    {
      title: "Points de Vigilance",
      type: "warnings",
      limitations: {
        title: "Les limites de l'analyse :",
        items: [
          "Cash flow cyclique (certains secteurs ont des flux variables)",
          "Investissements ponctuels (peut temporairement réduire le FCF)",
          "Politique de dividendes (impacte le cash disponible)"
        ]
      },
      complements: {
        title: "Les compléments nécessaires :",
        items: [
          "Croissance du FCF sur plusieurs années",
          "Qualité de la trésorerie (récurrente vs exceptionnelle)",
          "Politique d'investissement (CAPEX intelligent vs gaspillage)"
        ]
      },
      expanded: false
    },
    {
      type: "quote",
      content: "🌟 Le Pouvoir du Cash Flow",
      quote: "\"Dans les moments difficiles, le cash flow est ce qui sépare les entreprises qui survivent de celles qui disparaissent.\"",
      note: "Cette analyse vous aide à identifier les entreprises les plus résilientes.",
      expanded: false
    },
    {
      type: "final-note",
      content: "Le cash flow est la vie de l'entreprise. Utilisez ces résultats pour investir dans des générateurs de trésorerie durables !",
      expanded: false
    }
  ]
},
valuetrap: {
  title: "Value Trap Detector",
  sections: [
    {
      content: "Cette analyse applique la célèbre maxime de Warren Buffett : 'Il vaut mieux acheter une bonne entreprise à un prix raisonnable qu'une entreprise moyenne à un prix très bas.' Elle identifie les vraies opportunités tout en évitant les 'Value Traps' - ces actions qui semblent bon marché mais cachent des problèmes fondamentaux.",
      expanded: true
    },
    {
      title: "Les 4 Piliers de la Valeur Durable",
      type: "columns",
      items: [
        {
          title: "Prix Raisonnable",
          description: "Ratios d'évaluation attractifs mais pas excessifs",
          quote: "Buffett dit : 'Le prix est ce que vous payez, la valeur est ce que vous obtenez'"
        },
        {
          title: "Rentabilité Solide",
          description: "ROE et ROIC élevés et durables",
          note: "Pourquoi c'est important : Mesure la qualité fondamentale"
        },
        {
          title: "Décote Justifiée", 
          description: "P/B ratio bas mais avec de bons fondamentaux",
          rule: "La règle d'or : Une décote doit être temporaire, pas permanente"
        },
        {
          title: "Cohérence des Métriques",
          description: "Alignement entre prix bas et qualité élevée", 
          indicator: "L'indicateur : ROE et ROIC alignés = entreprise saine"
        }
      ],
      expanded: false
    },
    {
      title: "Notre Système de Notation Value",
      type: "table",
      headers: ["Rating", "Signification", "Critères"],
      rows: [
        ["⭐ ELITE_VALUE", "Excellence absolue", "P/E < 8, P/B < 1, ROE > 15%, ROIC > 12%"],
        ["✅ SOLID_VALUE", "Très bon rapport qualité/prix", "P/E < 12, P/B < 1.5, ROE > 12%, ROIC > 10%"],
        ["🟡 POTENTIAL_VALUE", "Opportunité intéressante", "P/E < 15, P/B < 2, ROE > 8%, ROIC > 8%"],
        ["🎯 DEEP_VALUE", "Décote importante à analyser", "Prix très bas mais rentabilité correcte"],
        ["🚨 VALUE_TRAP", "DANGER - À éviter", "Prix bas mais rentabilité faible ou déclinante"],
        ["🔴 SPECULATIVE", "Risque élevé", "Métriques incohérentes ou cycliques excessives"]
      ],
      expanded: false
    },
    {
      title: "La Philosophie Value en Action",
      type: "comparison", 
      good: {
       items: [
          "✅ Prix attractif avec qualité fondamentale",
          "✅ Rentabilité durable et reproductible",
          "✅ Avantage concurrentiel mesurable",
          "✅ Décote temporaire, non structurelle"
        ]
      },
      bad: {
        items: [
          "❌ Prix bas dû à des problèmes fondamentaux",
          "❌ Rentabilité déclinante ou erratique",
          "❌ Secteurs en déclin structurel",
          "❌ Décote permanente justifiée"
        ]
      },
      expanded: false
    },
    {
      title: "Comment Utiliser Ces Résultats",
      type: "usage",
      items: [
        {
          target: "Pour les investisseurs prudents",
          action: "→ Ciblez ⭐ ELITE_VALUE et ✅ SOLID_VALUE"
        },
        {
          target: "Pour les investisseurs opportunistes", 
          action: "→ Explorez 🟡 POTENTIAL_VALUE et 🎯 DEEP_VALUE"
        },
        {
          target: "Pour tous les investisseurs",
          action: "→ Évitez 🚨 VALUE_TRAP et 🔴 SPECULATIVE"
        }
      ],
      expanded: false
    },
    {
      title: "Points de Vigilance",
      type: "warnings",
      limitations: {
        title: "Les limites de l'analyse :",
        items: [
          "Secteurs cycliques (shipping, énergie, matières premières)",
          "Risques géopolitiques spécifiques à certaines régions",
          "Liquidité des petites capitalisations"
        ]
      },
      complements: {
        title: "Les compléments nécessaires :",
        items: [
          "Analyse du secteur et des tendances long terme",
          "Qualité du management et de la gouvernance",
          "Dette et structure financière durable"
        ]
      },
      expanded: false
    },
    {
      type: "quote",
      content: "🌟 Le Secret des Vraies Opportunités",
      quote: "\"Le marché est un appareil qui transfère de l'argent des impatients vers les patients.\"",
      note: "Cette analyse vous aide à identifier les entreprises où la patience sera récompensée.",
      expanded: false
    },
    {
      type: "final-note",
      content: "Les vraies opportunités d'investissement combinent qualité et prix raisonnable. Notre Value Trap Detector vous aide à distinguer les diamants bruts des pièges coûteux !",
      expanded: false
    }
  ]
},
  shortrisk: {
    title: "🔍 Short Selling Candidates - Explication pour les Investisseurs",
    sections: [
      {
        title: "Enteprises avec signaux de détresse financière",
        content: "Identification des entreprises présentant des situations où la santé financière est préoccupante.",
        expanded: true
      },
      {
        title: "Les signaux de danger analysés",
        type: "columns",
        signals: [
          {
            name: "DANGEROUS_DEBT",
            description: "Dette/Equity > 4 (ou > 8 pour les banques)",
            risk: "Risque : Surendettement, difficultés de remboursement"
          },
          {
            name: "INTEREST_CRISIS", 
            description: "Couverture des intérêts < 1",
            risk: "Risque : Impossible de payer les intérêts de la dette"
          },
          {
            name: "LIQUIDITY_PROBLEM",
            description: "Current Ratio < 0.8",
            risk: "Risque : Problèmes de liquidité à court terme"
          },
          {
            name: "BURNING_CASH",
            description: "Résultat net ET cash flow opérationnel négatifs",
            risk: "Risque : L'entreprise brûle du cash des deux côtés"
          },
          {
            name: "DOUBLE_TROUBLE",
            description: "Forte dette + faible couverture des intérêts",
            risk: "Risque : Situation financière très tendue"
          },
          {
            name: "MICRO_CAP_DISTRESS",
            description: "Pertes + petit chiffre d'affaires",
            risk: "Risque : Petite entreprise en difficulté"
          }
        ],
        expanded: false
      },
      {
        title: "Le système de scoring de risque",
        type: "table",
        headers: ["Problème", "Points", "Gravité"],
        rows: [
          ["Dette/Equity > 3", "3 points", "Critique"],
          ["Dette/Equity > 2", "2 points", "Élevée"],
          ["Couverture intérêts < 1", "3 points", "Critique"],
          ["Couverture intérêts < 1.5", "2 points", "Élevée"],
          ["Current Ratio < 0.8", "3 points", "Critique"],
          ["Current Ratio < 1", "2 points", "Élevée"],
          ["Résultat net négatif", "2 points", "Préoccupant"],
          ["Cash flow négatif", "2 points", "Préoccupant"]
        ],
        interpretation: {
          title: "Interprétation du Score de Risque",
          type: "table",
          headers: ["Score", "Niveau de Risque", "Signification"],
          rows: [
            ["0-2 points", "À surveiller", "Entreprises stables financièrement"],
            ["3-4 points", "Risque modéré", "Signaux d'alerte légers"],
            ["5-7 points", "Risque élevé", "Signes de difficultés financières"],
            ["8-15 points", "Risque critique", "Détresse financière avancée"]
          ],
          expanded: false
        }
      },
      {
        title: "Comment utiliser ces informations",
        type: "usage",
        items: [
          {
            target: "Pour les investisseurs prudents",
            action: "→ Évitez ces entreprises dans votre portefeuille"
          },
          {
            target: "Pour les investisseurs avancés",
            action: "→ Surveillez ces signaux pour anticiper les baisses"
          },
          {
            target: "Pour les traders expérimentés",
            action: "→ Analysez ces opportunités de short selling"
          }
        ],
        expanded: false
      },
      {
        title: "MISE EN GARDE IMPORTANTE",
        type: "critical-warning",
        warning: "ATTENTION : Ces signaux indiquent des risques MAIS :",
        caveats: [
          "Certaines situations peuvent être temporaires",
          "Les banques ont naturellement plus de dette",
          "Certaines entreprises peuvent se redresser (turnaround)",
          "Le short selling est TRÈS RISQUÉ"
        ],
        expanded: false
    }
  ]
},
  
dividend: {
  title: "Analyse des Dividendes Durables",
  sections: [
    {
      title: "La Sagesse des Dividendes",
      content: "Cette analyse applique la philosophie de Warren Buffett aux investissements dividendes  Ils doivent être le reflet d'une santé financière exceptionnelle, pas un leurre.",
      expanded: true
    },
    {
      title: "Les 4 Piliers des Dividendes Durables",
      type: "columns",
      items: [
        {
          title: "Rendement Raisonnable",
          description: "Dividend Yield : Le rendement doit être soutenable, pas excessif",
          quote: "Un dividende trop élevé est souvent le signe d'un dividende en danger"
        },
        {
          title: "Couverture des Bénéfices",
          description: "Payout Ratio : Pourcentage des bénéfices versés en dividendes",
          note: "Pourquoi c'est important : Une couverture solide garantit la pérennité"
        },
        {
          title: "Rentabilité (ROE)",
          description: "Return on Equity : L'entreprise doit générer des rendements solides",
          rule: "La règle d'or : ROE > 15% pour une croissance durable des dividendes"
        },
        {
          title: "Solidité Financière",
          description: "Dette/Equity & Cash Flow : Résistance aux crises économiques",
          indicator: "L'indicateur : Cash-flow opérationnel > bénéfice net = qualité des revenus"
        }
      ],
      expanded: false
    },
    {
      title: "Notre Système de Notation des Dividendes",
      type: "table",
      headers: ["Grade", "Signification", "Critères Principaux"],
      rows: [
        ["🏆 ELITE_DIVIDEND", "Excellence absolue dividende", "Yield 2-5%, ROE > 20%, Coverage > 3x, Dette faible"],
        ["⭐ QUALITY_INCOME", "Revenu de haute qualité", "Yield 4-8%, ROE > 18%, Coverage > 2x"],
        ["✅ HIGH_INCOME", "Rendement élevé sécurisé", "Yield 6-12%, ROE > 15%, Coverage > 1.5x"],
        ["📈 GROWTH_INCOME", "Croissance dividende future", "Yield < 3%, ROE > 25%, Fort potentiel"],
        ["🚨 RISKY_INCOME", "Dividende à risque", "Yield > 12% ou Payout > 80%"]
      ],
      expanded: false
    },
    {
      title: "La Philosophie des Dividendes",
      type: "comparison",
      good: {
        items: [
          "✅ Rendement raisonnable et durable",
          "✅ Couverture solide par les bénéfices",
          "✅ Croissance régulière du dividende",
          "✅ Forte rentabilité des capitaux propres"
        ]
      },
      bad: {
        title: "Ce qu'il évite :",
        items: [
          "❌ Rendements excessifs (>12%) souvent insoutenables",
          "❌ Payout ratio trop élevé (>80%)",
          "❌ Dette excessive qui menace le dividende",
          "❌ Dividendes non couverts par le cash-flow"
        ]
      },
      expanded: false
    },
    {
      title: "Comment Utiliser Ces Résultats",
      type: "usage",
      items: [
        {
          target: "Pour les investisseurs revenu",
          action: "→ Privilégiez ⭐ QUALITY_INCOME et ✅ HIGH_INCOME avec safety_score > 5"
        },
        {
          target: "Pour la croissance de revenus",
          action: "→ Ciblez 📈 GROWTH_INCOME pour l'augmentation future des dividendes"
        },
        {
          target: "Pour la sécurité absolue",
          action: "→ Les 🏆 ELITE_DIVIDEND offrent le meilleur équilibre sécurité/rendement"
        }
      ],
      expanded: false
    },
    {
      title: "Points de Vigilance Essentiels",
      type: "warnings",
      limitations: {
        title: "Les pièges à éviter :",
        items: [
          "Un yield élevé peut cacher un prix en baisse (value trap)",
          "Les secteurs cycliques peuvent réduire les dividendes",
          "La dette excessive est le premier danger pour les dividendes"
        ]
      },
      complements: {
        title: "Les vérifications complémentaires :",
        items: [
          "Historique de croissance du dividende (5-10 ans)",
          "Stabilité du secteur d'activité",
          "Politique de dividende de l'entreprise"
        ]
      },
      expanded: false
    },
    {
      type: "quote",
      content: "🌟 La Sagesse des Dividendes Durables",
      quote: "\"Le meilleur dividende est celui qui augmente chaque année, pas celui qui est le plus élevé aujourd'hui.\"",
      note: "Cette analyse identifie les entreprises capables d'augmenter leurs dividendes durablement.",
      expanded: false
    },
    {
      type: "final-note",
      content: "Les meilleurs investissements dividendes sont ceux où vous n'aurez jamais à vendre. Choisissez la qualité, la sécurité, et laissez le temps travailler pour vous !",
      expanded: false
      }
    ]
  }
};
// Composant Barre de Recherche Globale
const GlobalSearchBar = ({ searchTerm, onSearch, dataCount }) => {
    return React.createElement('div', { 
        className: 'mb-6 p-4 bg-gray-800 rounded-lg'
    },
        [
            React.createElement('div', {
                className: 'flex flex-col md:flex-row gap-4 items-center justify-between',
                key: 'search-container'
            },
                [
                    React.createElement('div', {
                        className: 'flex items-center gap-3 flex-1',
                        key: 'search-input'
                    },
                        [
                            React.createElement('span', {
                                className: 'text-2xl',
                                key: 'icon'
                            }, '🔍'),
                            
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'Rechercher dans toutes les colonnes...',
                                value: searchTerm,
                                onChange: (e) => onSearch(e.target.value),
                                className: 'flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none',
                                key: 'input'
                            })
                        ]
                    ),
                    
                    React.createElement('div', {
                        className: 'text-gray-400 text-sm',
                        key: 'counter'
                    }, `${dataCount} résultat(s)`)
                ]
            )
        ]
    );
};

// Composant En-tête de Tableau avec Tri
const SortableHeader = ({ column, sortConfig, onSort, children }) => {
    const isSorted = sortConfig.key === column;
    
    return React.createElement('div', {
        className: `flex items-center gap-2 cursor-pointer hover:text-blue-300 transition-colors ${
            isSorted ? 'text-blue-400 font-bold' : ''
        }`,
        onClick: () => onSort(column),
        key: column
    },
        [
            React.createElement('span', { key: 'text' }, children),
            React.createElement('span', { 
                className: 'text-xs',
                key: 'arrow'
            }, isSorted ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕')
        ]
    );
};

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    onItemsPerPageChange,
    totalItems 
}) => {
    const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 6;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }
        
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return React.createElement('div', { key: 'pagination' },
        [
            React.createElement('div', {
                className: 'pagination-container',
                key: 'pagination-main'
            },
                [
                    React.createElement('div', {
                        className: 'pagination-left',
                        key: 'pagination-left'
                    },
                        [
                            React.createElement('span', {
                                className: 'pagination-label',
                                key: 'label'
                            }, 'Lignes par page:'),
                            
                            React.createElement('select', {
                                value: itemsPerPage,
                                onChange: (e) => onItemsPerPageChange(Number(e.target.value)),
                                className: 'pagination-select',
                                key: 'select'
                            },
                                [20, 50, 100].map(value =>
                                    React.createElement('option', {
                                        value: value,
                                        key: value,
                                        className: 'bg-slate-800'
                                    }, value)
                                )
                            )
                        ]
                    ),

                    React.createElement('div', {
                        className: 'pagination-center',
                        key: 'pagination-center'
                    },
                        [
                            React.createElement('button', {
                                onClick: () => onPageChange(1),
                                disabled: currentPage === 1,
                                className: 'pagination-button',
                                key: 'first'
                            }, '««'),

                            React.createElement('button', {
                                onClick: () => onPageChange(Math.max(1, currentPage - 1)),
                                disabled: currentPage === 1,
                                className: 'pagination-button',
                                key: 'prev'
                            }, '«'),

                            ...pageNumbers.map(page =>
                                React.createElement('button', {
                                    onClick: () => onPageChange(page),
                                    className: `pagination-page-button ${page === currentPage ? 'active' : ''}`,
                                    key: page
                                }, page)
                            ),

                            React.createElement('button', {
                                onClick: () => onPageChange(Math.min(totalPages, currentPage + 1)),
                                disabled: currentPage === totalPages,
                                className: 'pagination-button',
                                key: 'next'
                            }, '»'),

                            React.createElement('button', {
                                onClick: () => onPageChange(totalPages),
                                disabled: currentPage === totalPages,
                                className: 'pagination-button',
                                key: 'last'
                            }, '»»')
                        ]
                    ),

                    React.createElement('div', {
                        className: 'pagination-right',
                        key: 'pagination-right'
                    }, `Page ${currentPage} sur ${totalPages}`)
                ]
            ),

            React.createElement('div', {
                className: 'pagination-footer',
                key: 'pagination-footer'
            }, `${totalItems} entreprise(s) - Affichage ${startItem} à ${endItem}`)
        ]
    );
};

const DescriptionBox = ({ analysisType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const desc = ANALYSIS_DESCRIPTIONS[analysisType];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderSectionContent = (section) => {
    switch (section.type) {
      case "columns":
        return React.createElement('div', { key: 'columns-content' },
          [
            React.createElement('h3', {
              className: 'section-title section-title-green',
              key: 'title'
            }, section.title),
            
            React.createElement('div', {
              className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
              key: 'pillars-grid'
            },
              section.items.map((item, idx) =>
                React.createElement('div', {
                  className: 'pillar-card',
                  key: idx
                },
                  [
                    React.createElement('h4', { 
                      className: 'pillar-title text-white',
                      key: 'item-title'
                    }, item.title),
                    
                    React.createElement('p', {
                      className: 'pillar-text',
                      key: 'desc'
                    }, item.description),
                    
                    (item.quote || item.note) && React.createElement('p', {
                      className: `pillar-quote ${
                        item.quote ? 'border-yellow-400' : 'border-blue-400'
                      }`,
                      key: 'quote-note'
                    }, item.quote || item.note)
                  ]
                )
              )
            )
          ]
        );

      case "table":
        return React.createElement('div', { key: 'table-content' },
          [
            React.createElement('h3', {
              className: 'section-title section-title-yellow',
              key: 'title'
            }, section.title),
            
            React.createElement('div', {
              className: 'overflow-x-auto rounded-lg',
              key: 'table-container'
            },
              React.createElement('table', { 
                className: 'rating-table'
              },
                [
                  React.createElement('thead', { key: 'head' },
                    React.createElement('tr', {},
                      section.headers.map((header, idx) =>
                        React.createElement('th', {
                          key: idx
                        }, header)
                      )
                    )
                  ),
                  
                  React.createElement('tbody', { key: 'body' },
                    section.rows.map((row, rowIdx) =>
                      React.createElement('tr', {
                        key: rowIdx
                      },
                        row.map((cell, cellIdx) =>
                          React.createElement('td', {
                            key: cellIdx,
                            className: cellIdx === 0 ? 
                              (cell.includes('ELITE') ? 'text-yellow-400 font-semibold' :
                               cell.includes('STRONG') ? 'text-green-400 font-semibold' :
                               cell.includes('DECENT') ? 'text-orange-400 font-semibold' :
                               cell.includes('EXCELLENT') ? 'text-green-400 font-semibold' :
                               'text-red-400 font-semibold') : 
                              (cellIdx === 1 ? 'text-slate-300' : 'text-slate-400')
                          }, cell)
                        )
                      )
                    )
                  )
                ]
              )
            )
          ]
        );

      case "comparison":
        return React.createElement('div', { key: 'comparison' },
          [
            React.createElement('h3', {
              className: 'section-title section-title-blue',
              key: 'title'
            }, section.title),
            
            React.createElement('div', {
              className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
              key: 'comparison-grid'
            },
              [
                React.createElement('div', {
                  className: 'philosophy-card philosophy-good',
                  key: 'good'
                },
                  [
                    React.createElement('h4', {
                      className: 'philosophy-title text-green-400',
                      key: 'good-title'
                    }, section.good.title),
                    
                    ...section.good.items.map((item, idx) =>
                      React.createElement('div', {
                        className: 'list-item',
                        key: `good-${idx}`
                      },
                        [
                          React.createElement('span', {
                            className: 'text-green-400',
                            key: 'check'
                          }, '✓'),
                          React.createElement('span', {
                            key: 'text'
                          }, item.replace('✅ ', ''))
                        ]
                      )
                    )
                  ]
                ),
                
                React.createElement('div', {
                  className: 'philosophy-card philosophy-bad',
                  key: 'bad'
                },
                  [
                    React.createElement('h4', {
                      className: 'philosophy-title text-red-400',
                      key: 'bad-title'
                    }, section.bad.title),
                    
                    ...section.bad.items.map((item, idx) =>
                      React.createElement('div', {
                        className: 'list-item',
                        key: `bad-${idx}`
                      },
                        [
                          React.createElement('span', {
                            className: 'text-red-400',
                            key: 'cross'
                          }, '✗'),
                          React.createElement('span', {
                            key: 'text'
                          }, item.replace('❌ ', ''))
                        ]
                      )
                    )
                  ]
                )
              ]
            )
          ]
        );      

      case "usage":
        return React.createElement('div', { key: 'usage' },
          [
            React.createElement('h3', {
              className: 'section-title section-title-purple',
              key: 'title'
            }, section.title),
            
            React.createElement('div', {
              className: 'space-y-4',
              key: 'usage-cards'
            },
              section.items.map((item, idx) =>
                React.createElement('div', {
                  className: 'usage-card',
                  key: `usage-${idx}`
                },
                  [
                    React.createElement('h4', {
                      className: 'usage-title text-white',
                      key: 'target'
                    }, item.target),
                    React.createElement('p', {
                      className: 'text-slate-300 text-sm',
                      key: 'action'
                    }, item.action)
                  ]
                )
              )
            )
          ]
        );
        
      case "warnings":
        return React.createElement('div', { key: 'warnings' },
    [
      React.createElement('h3', {
        className: 'section-title section-title-red',
        key: 'title'
      }, section.title),
      
      React.createElement('div', {
        className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
        key: 'warnings-grid'
      },
        [
          React.createElement('div', {
            className: 'warning-column',
            key: 'limitations'
          },
            [
              React.createElement('h4', {
                className: 'warning-title text-white',
                key: 'limitations-title'
              }, section.limitations.title),
              
              ...section.limitations.items.map((item, idx) =>
                React.createElement('div', {
                  className: 'list-item',
                  key: `limit-${idx}`
                },
                  [
                    React.createElement('span', {
                      className: 'text-orange-400',
                      key: 'bullet'
                    }, '•'),
                    React.createElement('span', {
                      key: 'text'
                    }, item)
                  ]
                )
              )
            ]
          ),
          
          React.createElement('div', {
            className: 'warning-column',
            key: 'complements'
          },
            [
              React.createElement('h4', {
                className: 'warning-title text-white',
                key: 'complements-title'
              }, section.complements.title),
              
              ...section.complements.items.map((item, idx) =>
                React.createElement('div', {
                  className: 'list-item',
                  key: `comp-${idx}`
                },
                  [
                    React.createElement('span', {
                      className: 'text-blue-400',
                      key: 'bullet'
                    }, '•'),
                    React.createElement('span', {
                      key: 'text'
                    }, item)
                  ]
                )
              )
            ]
          )
        ]
      )
    ]
  );

      case "quote":
        return React.createElement('div', { 
          className: 'secret-section',
          key: 'quote'
        },
          [
            React.createElement('h3', { 
              className: 'secret-title',
              key: 'content'
            }, section.content),
            
            React.createElement('blockquote', {
              className: 'secret-quote',
              key: 'quote'
            }, section.quote),
            
            React.createElement('p', {
              className: 'secret-text',
              key: 'note'
            }, section.note)
          ]
        );
        
      case "final-note":
        return React.createElement('div', { 
          className: 'secret-text text-center',
          key: 'final-note'
        }, section.content);
        
      case "critical-warning":
        return React.createElement('div', { key: 'critical-warning' },
          [
            React.createElement('h3', {
              className: 'section-title section-title-red text-center',
              key: 'title'
            }, section.title),
            
            React.createElement('div', {
              className: 'critical-warning-card',
              key: 'warning-content'
            },
              [
                React.createElement('p', {
                  className: 'critical-warning-text',
                  key: 'warning'
                }, section.warning),
                
                React.createElement('div', {
                  className: 'space-y-3 mt-4',
                  key: 'caveats-list'
                },
                  section.caveats.map((caveat, idx) =>
                    React.createElement('div', {
                      className: 'flex items-start gap-3',
                      key: idx
                    },
                      [
                        React.createElement('span', {
                          className: 'text-yellow-400 text-lg',
                          key: 'bullet'
                        }, '•'),
                        React.createElement('span', {
                          className: 'text-gray-300',
                          key: 'text'
                        }, caveat)
                      ]
                    )
                  )
                )
              ]
            )
          ]
        );

      
        default:
          return React.createElement('p', {
            className: 'text-gray-300 leading-relaxed',
            key: 'default-content'
          }, section.content);
    }
  };

  return React.createElement('div', { 
      className: 'glass-main'
    },
      [          
        React.createElement('div', { 
          key: 'explanation-card'
        },
          [
            React.createElement('div', {
              className: 'flex items-start gap-4',
              key: 'card-content'
            },
              [
                React.createElement('div', {
                  className: 'border-left-blue h-12',
                  key: 'blue-bar'
                }),
                
                React.createElement('div', { key: 'text-content' },
                  [
                    React.createElement('h2', { 
                      className: 'text-lg mb-3 text-white',
                      key: 'card-title'
                    }, desc.sections[0].title),
                    
                    React.createElement('p', {
                      className: 'text-gray-300 leading-relaxed text-sm',
                      key: 'card-text'
                    }, desc.sections[0].content)
                  ]
                )
              ]
            ),
            
            React.createElement('button', {
              onClick: toggleExpanded,
              className: 'btn-primary-custom flex justify-between items-center mt-4',
              key: 'toggle-button'
            },
              [
                React.createElement('span', {
                  className: 'text-white',
                  key: 'button-text'
                }, 'Détail de la méthodologie'),
                
                React.createElement('span', {
                  className: 'transition-transform',
                  key: 'arrow',
                  style: { transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }
                }, '▼')
              ]
            )
          ]
        ),
        
        isExpanded && React.createElement('div', {
          className: 'expandable-section p-6 space-y-6 mt-4',
          key: 'methodology-content'
        },
          desc.sections.slice(1).map((section, index) =>
            React.createElement('div', {
              key: `section-${index + 1}`,
              className: 'mb-8 last:mb-0'
            },
              renderSectionContent(section)
            )
          )
        )
      ]
  );
};

// Composant Onglet Buffett avec Filtres Secteur
const BuffettTab = ({ 
    data, 
    filter, 
    onFilterChange, 
    getRatingColor, 
    getValueColor, 
    sortConfig, 
    onSort, 
    searchTerm, 
    onSearch, 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    onItemsPerPageChange,
    totalItems
}) => {
    const [sectorFilter, setSectorFilter] = useState('Tous secteurs');
    
    const SECTORS = [
        'Tous secteurs',
        'Industrials',
        'Technology', 
        'Financial Services',
        'Consumer Cyclical',
        'Consumer Defensive', 
        'Healthcare',
        'Basic Materials',
        'Energy',
        'Communication Services',
        'Utilities',
        'Real Estate'
    ];

    const QUALITY_FILTERS = [
        { value: 'ALL', label: 'Tous scores' },
        { value: 'ELITE', label: 'ELITE' },
        { value: 'STRONG', label: 'STRONG' },
        { value: 'DECENT', label: 'DECENT' },
        { value: 'WEAK', label: 'WEAK' }
    ];


// Fonctions de tri et pagination locales
    const getSortedAndFilteredData = (data) => {
        if (!data) return [];
        
        let filteredData = data;
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filteredData = data.filter(item => 
                Object.values(item).some(value => 
                    value && value.toString().toLowerCase().includes(searchLower)
                )
            );
        }

        if (sortConfig.key) {
            filteredData = [...filteredData].sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (aValue === null || aValue === undefined) aValue = '';
                if (bValue === null || bValue === undefined) bValue = '';

                if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredData;
    };

    const getPaginatedData = (data) => {
        if (!data || data.length === 0) return [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const sortedAndFilteredData = getSortedAndFilteredData(data);
  
    // Appliquer les filtres qualité ET secteur
    const filteredData = sortedAndFilteredData.filter(item => {
        // Filtre qualité
        const qualityMatch = filter === 'ALL' || 
            (item.buffett_rating && item.buffett_rating.includes(filter));
        
        // Filtre secteur
        const sectorMatch = sectorFilter === 'Tous secteurs' || 
            (item.secteur && item.secteur === sectorFilter);
        
        return qualityMatch && sectorMatch;
    });
    
    const paginatedData = getPaginatedData(filteredData);

    const handleQualityChange = (e) => {
        onFilterChange(e.target.value);
    };

    const handleSectorChange = (e) => {
        setSectorFilter(e.target.value);
    };
    
    
        [
            // Section Recherche et Filtres (NOUVEAU DESIGN COMPACT)
            React.createElement('div', { 
                className: 'search-section mb-6',
                key: 'search-filters'
            },
                [
                    // Barre de recherche avec compteur
                    React.createElement('div', {
                        className: 'search-input-container',
                        key: 'search-bar'
                    },
                        [
                            React.createElement('div', {
                                className: 'search-icon',
                                key: 'search-icon'
                            }, '🔍'), // Icône plus simple
                            
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'Rechercher entreprises', // Texte simplifié
                                value: searchTerm,
                                onChange: (e) => onSearch(e.target.value),
                                className: 'search-input',
                                key: 'search-input'
                            }),
                            
                            React.createElement('div', {
                                className: 'results-counter',
                                key: 'counter'
                            }, `${filteredData.length} résultat(s)`)
                        ]
                    ),

                    // Grid des dropdowns
                    React.createElement('div', {
                        className: 'dropdown-grid',
                        key: 'dropdowns-grid'
                    },
                        [
                            // Dropdown Qualité
                            React.createElement('div', {
                                className: 'dropdown-group',
                                key: 'quality-dropdown'
                            },
                                [
                                    React.createElement('label', {
                                        className: 'dropdown-label',
                                        key: 'quality-label'
                                    }, 'Filtrer par score'),
                                    
                                    React.createElement('select', {
                                        value: filter,
                                        onChange: handleQualityChange,
                                        className: 'dropdown-select',
                                        key: 'quality-select'
                                    },
                                        QUALITY_FILTERS.map(option =>
                                            React.createElement('option', {
                                                value: option.value,
                                                key: option.value,
                                                className: 'bg-gray-800'
                                            }, option.label)
                                        )
                                    )
                                ]
                            ),

                            // Dropdown Secteur
                            React.createElement('div', {
                                className: 'dropdown-group',
                                key: 'sector-dropdown'
                            },
                                [
                                    React.createElement('label', {
                                        className: 'dropdown-label',
                                        key: 'sector-label'
                                    }, 'Filtrer par secteur'),
                                    
                                    React.createElement('select', {
                                        value: sectorFilter,
                                        onChange: handleSectorChange,
                                        className: 'dropdown-select',
                                        key: 'sector-select'
                                    },
                                        SECTORS.map(sector =>
                                            React.createElement('option', {
                                                value: sector,
                                                key: sector,
                                                className: 'bg-gray-800'
                                            }, sector)
                                        )
                                    )
                                ]
                            )
                        ]
                    )
                ]
            ),
          
            // Tableau Buffett
            React.createElement('div', { 
                className: 'table-container',
                key: 'table-container'
            },
                [
                    React.createElement('div', { 
                        className: 'bg-gray-800 rounded-lg overflow-hidden shadow-xl',
                        key: 'table'
                    },
                        [
                            // En-tête du tableau AVEC TRI
                            React.createElement('div', { 
                                className: 'grid grid-cols-8 gap-4 p-4 bg-gray-700 font-semibold text-sm',
                                key: 'table-header'
                            },
                                [
                                    React.createElement(SortableHeader, {
                                        key: 'symbole',
                                        column: 'symbole',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Symbole'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'nom',
                                        column: 'nom',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Entreprise'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'secteur',
                                        column: 'secteur',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Secteur'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'roe',
                                        column: 'roe',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'ROE'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'roic',
                                        column: 'roic',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'ROIC'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'debt_to_equity',
                                        column: 'debt_to_equity',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'D/E'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'net_margin',
                                        column: 'net_margin',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Marge'),
                                    
                                    React.createElement('div', { key: 'score' }, 'Score')
                                ]
                            ),
                            
                            // Corps du tableau
                            ...paginatedData.map((item, index) =>
                                React.createElement('div', {
                                    key: item.symbole + index,
                                    className: 'grid grid-cols-8 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors text-sm'
                                },
                                    [
                                        React.createElement('div', { 
                                            className: 'font-bold text-lg',
                                            key: 'symbole'
                                        }, item.symbole),
                                        React.createElement('div', { 
                                            className: 'col-span-2 font-semibold',
                                            key: 'nom' 
                                        }, item.nom),
                                        React.createElement('div', { 
                                            className: 'text-gray-300',
                                            key: 'secteur' 
                                        }, item.secteur),
                                        React.createElement('div', { 
                                            className: getValueColor(item.roe, 15, 10),
                                            key: 'roe'
                                         }, `${Number(item.roe).toFixed(2)}%`),
                                        React.createElement('div', { 
                                            className: getValueColor(item.roic, 12, 8),
                                            key: 'roic'
                                        }, `${Number(item.roic).toFixed(2)}%`),
                                        React.createElement('div', { 
                                            className: item.debt_to_equity < 2 ? 'text-green-400 font-bold' : 
                                                      item.debt_to_equity < 3 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                            key: 'debt'
                                        }, `${Number(item.debt_to_equity).toFixed(2)}x`),
                                        React.createElement('div', { 
                                            className: getValueColor(item.net_margin, 8, 5),
                                            key: 'margin'
                                        }, `${Number(item.net_margin).toFixed(2)}%`),
                                        React.createElement('div', { 
                                            className: `px-3 py-2 rounded-full text-xs font-bold text-center text-white ${getRatingColor(item.buffett_rating)}`,
                                            key: 'rating'
                                        }, item.buffett_rating)
                                    ]
                                )
                            )
                        ]
                    )
                ]
            ),

            // PAGINATION
            React.createElement(Pagination, {
                key: 'pagination',
                currentPage: currentPage,
                totalPages: totalPages,
                onPageChange: onPageChange, 
                itemsPerPage: itemsPerPage,
                onItemsPerPageChange: onItemsPerPageChange, 
                totalItems: filteredData.length
            })
         ]
      };

// Composant Onglet Cash Flow avec filtres, Tri, Recherche et PAGINATION
const CashFlowTab = ({ 
    data, 
    getCashFlowColor, 
    formatMillions, 
    formatPercent, 
    sortConfig, 
    onSort, 
    searchTerm, 
    onSearch, 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    onItemsPerPageChange,
    totalItems
}) => {
    const [filter, setFilter] = useState('ALL');
    const [sectorFilter, setSectorFilter] = useState('Tous secteurs');

    const CASH_FLOW_FILTERS = [
        { value: 'ALL', label: 'Tous scores' },
        { value: 'EXCELLENT', label: '💰 EXCELLENT' },
        { value: 'GOOD', label: '💸 BON' },
        { value: 'WEAK', label: '🔴 FAIBLE' }
    ];

    const SECTORS = [
        'Tous secteurs',
        'Industrials',
        'Technology', 
        'Financial Services',
        'Consumer Cyclical',
        'Consumer Defensive', 
        'Healthcare',
        'Basic Materials',
        'Energy',
        'Communication Services',
        'Utilities',
        'Real Estate'
    ];

        const getCashFlowRating = (item) => {
        if (item.fcf_yield > 0.06) return '💰 EXCELLENT';
        if (item.fcf_yield > 0.03) return '💸 BON';
        return '🔴 FAIBLE';
    };

      const getCashFlowRatingColor = (item) => {
        if (item.fcf_yield > 0.06) return 'bg-green-600';
        if (item.fcf_yield > 0.03) return 'bg-blue-600';
        return 'bg-red-600';
    };
        
    const getSortedAndFilteredData = (data) => {
        if (!data) return [];
        
        let filteredData = data;
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filteredData = data.filter(item => 
                Object.values(item).some(value => 
                    value && value.toString().toLowerCase().includes(searchLower)
                )
            );
        }

        if (sortConfig.key) {
            filteredData = [...filteredData].sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (aValue === null || aValue === undefined) aValue = '';
                if (bValue === null || bValue === undefined) bValue = '';

                if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredData;
    };

    const getPaginatedData = (data) => {
        if (!data || data.length === 0) return [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

      const sortedAndFilteredData = React.useMemo(() => {
        return getSortedAndFilteredData(data);
    }, [data, searchTerm, sortConfig]);

      const filteredData = React.useMemo(() => {
        return sortedAndFilteredData.filter(item => {
            const qualityMatch = filter === 'ALL' || 
                (filter === 'EXCELLENT' && item.fcf_yield > 0.06) ||
                (filter === 'GOOD' && item.fcf_yield > 0.03 && item.fcf_yield <= 0.06) ||
                (filter === 'WEAK' && item.fcf_yield <= 0.03);
            
            const sectorMatch = sectorFilter === 'Tous secteurs' || 
                (item.secteur && item.secteur === sectorFilter);
            
            return qualityMatch && sectorMatch;
        });
    }, [sortedAndFilteredData, filter, sectorFilter]);

      const paginatedData = React.useMemo(() => {
        return getPaginatedData(filteredData);
    }, [filteredData, currentPage, itemsPerPage]);

      
        [
            // DESCRIPTION BOX 
            React.createElement(DescriptionBox, {
                key: 'description',
                analysisType: 'cashflow'
            }),  
          
            // Section Recherche et Filtres (MÊME DESIGN QUE BUFFETT)
            React.createElement('div', { 
                className: 'search-section mb-6',
                key: 'search-filters'
            },
                [
                    React.createElement('div', {
                        className: 'search-input-container',
                        key: 'search-bar'
                    },
                        [
                            React.createElement('div', {
                                className: 'search-icon',
                                key: 'search-icon'
                            }, '🔍'),
                            
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'Rechercher entreprises',
                                value: searchTerm,
                                onChange: (e) => onSearch(e.target.value),
                                className: 'search-input',
                                key: 'search-input'
                            }),
                            
                            React.createElement('div', {
                                className: 'results-counter',
                                key: 'counter'
                            }, `${filteredData.length} résultat(s)`)
                        ]
                    ),

                    React.createElement('div', {
                        className: 'dropdown-grid',
                        key: 'dropdowns-grid'
                    },
                        [
                            React.createElement('div', {
                                className: 'dropdown-group',
                                key: 'quality-dropdown'
                            },
                                [
                                    React.createElement('label', {
                                        className: 'dropdown-label',
                                        key: 'quality-label'
                                    }, 'Filtrer par score'),
                                    
                                    React.createElement('select', {
                                        value: filter,
                                        onChange: (e) => setFilter(e.target.value),
                                        className: 'dropdown-select',
                                        key: 'quality-select'
                                    },
                                        CASH_FLOW_FILTERS.map(option =>
                                            React.createElement('option', {
                                                value: option.value,
                                                key: option.value,
                                                className: 'bg-gray-800'
                                            }, option.label)
                                        )
                                    )
                                ]
                            ),

                            React.createElement('div', {
                                className: 'dropdown-group',
                                key: 'sector-dropdown'
                            },
                                [
                                    React.createElement('label', {
                                        className: 'dropdown-label',
                                        key: 'sector-label'
                                    }, 'Filtrer par secteur'),
                                    
                                    React.createElement('select', {
                                        value: sectorFilter,
                                        onChange: (e) => setSectorFilter(e.target.value),
                                        className: 'dropdown-select',
                                        key: 'sector-select'
                                    },
                                        SECTORS.map(sector =>
                                            React.createElement('option', {
                                                value: sector,
                                                key: sector,
                                                className: 'bg-gray-800'
                                            }, sector)
                                        )
                                    )
                                ]
                            )
                        ]
                    )
                ]
            ),
          
            // Tableau (MÊME DESIGN QUE BUFFETT)
            React.createElement('div', { 
                className: 'table-container',
                key: 'table-container'
            },
                [
                    React.createElement('div', { 
                        className: 'bg-gray-800 rounded-lg overflow-hidden shadow-xl',
                        key: 'table'
                    },
                        [
                            // En-tête du tableau Cash Flow AVEC TRI
                            React.createElement('div', { 
                                className: 'grid grid-cols-10 gap-4 p-4 bg-gray-700 font-semibold text-sm',
                                key: 'table-header'
                            },
                                [
                                    React.createElement(SortableHeader, {
                                        key: 'symbole',
                                        column: 'symbole',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Symbole'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'nom',
                                        column: 'nom',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Entreprise'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'secteur',
                                        column: 'secteur',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Secteur'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'operating_cash_flow',
                                        column: 'operating_cash_flow',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Cash Flow Op.'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'free_cash_flow',
                                        column: 'free_cash_flow',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Free Cash Flow'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'revenue',
                                        column: 'revenue',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Revenus'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'net_income',
                                        column: 'net_income',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Net Income'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'fcf_margin',
                                        column: 'fcf_margin',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Marge FCF'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'fcf_yield',
                                        column: 'fcf_yield',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Yield FCF'),
                                    
                                    React.createElement('div', { 
                                        key: 'score'
                                    }, 'Score')
                                ]
                            ),
                            
                            // Corps du tableau
                            ...paginatedData.map((item, index) =>
                                React.createElement('div', {
                                    key: item.symbole + index,
                                    className: 'grid grid-cols-10 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors text-sm'
                                },
                                    [
                                        React.createElement('div', { 
                                            className: 'font-bold text-lg',
                                            key: 'symbole'
                                        }, item.symbole),
                                        React.createElement('div', { 
                                            className: 'font-semibold',
                                            key: 'nom' 
                                        }, item.nom),
                                        React.createElement('div', { 
                                            className: 'text-gray-300',
                                            key: 'secteur' 
                                        }, item.secteur),
                                        React.createElement('div', { 
                                            className: 'text-green-400 font-bold',
                                            key: 'op-cf'
                                        }, formatMillions(item.operating_cash_flow)),
                                        React.createElement('div', { 
                                            className: 'text-blue-400 font-bold',
                                            key: 'fcf'
                                        }, formatMillions(item.free_cash_flow)),
                                        React.createElement('div', { 
                                            key: 'revenue'
                                        }, formatMillions(item.revenue)),
                                        React.createElement('div', { 
                                            key: 'net-income'
                                        }, formatMillions(item.net_income)),
                                        React.createElement('div', { 
                                            className: getCashFlowColor(item.fcf_margin, 'margin'),
                                            key: 'fcf-margin'
                                        }, formatPercent(item.fcf_margin)),
                                        React.createElement('div', { 
                                            className: getCashFlowColor(item.fcf_yield, 'yield'),
                                            key: 'fcf-yield'
                                        }, formatPercent(item.fcf_yield)),
                                        React.createElement('div', { 
                                            className: `px-3 py-2 rounded-full text-xs font-bold text-center text-white ${getCashFlowRatingColor(item)}`,
                                            key: 'rating'
                                        }, getCashFlowRating(item))
                                    ]
                                )
                            )
                        ]
                    )
                ]
            ),

            // PAGINATION (MÊME DESIGN QUE BUFFETT)
            React.createElement(Pagination, {
                key: 'pagination',
                currentPage: currentPage,
                totalPages: totalPages,
                onPageChange: onPageChange, 
                itemsPerPage: itemsPerPage,
                onItemsPerPageChange: onItemsPerPageChange, 
                totalItems: filteredData.length
            })
        ]
   };

// Composant Onglet Value Trap Detector avec Filtres, Tri, Recherche et PAGINATION
const ValueTrapTab = ({ 
    data, 
    getValueGradeColor, 
    getValueScoreColor, 
    sortConfig, 
    onSort, 
    searchTerm, 
    onSearch, 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    onItemsPerPageChange,
    totalItems 
}) => {
    const [filter, setFilter] = useState('ALL');
    const [sectorFilter, setSectorFilter] = useState('Tous secteurs');

    const VALUE_TRAP_FILTERS = [
        { value: 'ALL', label: 'Tous types' },
        { value: 'ELITE_VALUE', label: '⭐ ELITE' },
        { value: 'SOLID_VALUE', label: '✅ SOLIDE' },
        { value: 'VALUE_TRAP', label: '⚠️ PIÈGE' },
        { value: 'DEEP_VALUE', label: '🎯 PROFOND' },
        { value: 'POTENTIAL', label: '📊 POTENTIEL' }
    ];

    const SECTORS = [
        'Tous secteurs',
        'Industrials',
        'Technology', 
        'Financial Services',
        'Consumer Cyclical',
        'Consumer Defensive', 
        'Healthcare',
        'Basic Materials',
        'Energy',
        'Communication Services',
        'Utilities',
        'Real Estate'
    ];

    const getSortedAndFilteredData = (data) => {
        if (!data) return [];
        
        let filteredData = data;
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filteredData = data.filter(item => 
                Object.values(item).some(value => 
                    value && value.toString().toLowerCase().includes(searchLower)
                )
            );
        }

        if (sortConfig.key) {
            filteredData = [...filteredData].sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (aValue === null || aValue === undefined) aValue = '';
                if (bValue === null || bValue === undefined) bValue = '';

                if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredData;
    };

    
    const getPaginatedData = (data) => {
        if (!data || data.length === 0) return [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    // ✅ CORRECTION : Une seule déclaration avec useMemo
    const sortedAndFilteredData = React.useMemo(() => {
        return getSortedAndFilteredData(data);
    }, [data, searchTerm, sortConfig]);

    const filteredData = React.useMemo(() => {
        return sortedAndFilteredData.filter(item => {
            const qualityMatch = filter === 'ALL' || 
                (item.value_grade && item.value_grade.includes(filter));
            
            const sectorMatch = sectorFilter === 'Tous secteurs' || 
                (item.secteur && item.secteur === sectorFilter);
            
            return qualityMatch && sectorMatch;
        });
    }, [sortedAndFilteredData, filter, sectorFilter]);

    const paginatedData = React.useMemo(() => {
        return getPaginatedData(filteredData);
    }, [filteredData, currentPage, itemsPerPage]);
  

    return React.createElement('div', {},
        [
            React.createElement(DescriptionBox, {
                key: 'description',
                analysisType: 'valuetrap'
            }),

            // Section Recherche et Filtres
            React.createElement('div', { 
                className: 'search-section mb-6',
                key: 'search-filters'
            },
                [
                    React.createElement('div', {
                        className: 'search-input-container',
                        key: 'search-bar'
                    },
                        [
                            React.createElement('div', {
                                className: 'search-icon',
                                key: 'search-icon'
                            }, '🔍'),
                            
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'Rechercher entreprises',
                                value: searchTerm,
                                onChange: (e) => onSearch(e.target.value),
                                className: 'search-input',
                                key: 'search-input'
                            }),
                            
                            React.createElement('div', {
                                className: 'results-counter',
                                key: 'counter'
                            }, `${filteredData.length} résultat(s)`)
                        ]
                    ),

                    React.createElement('div', {
                        className: 'dropdown-grid',
                        key: 'dropdowns-grid'
                    },
                        [
                            React.createElement('div', {
                                className: 'dropdown-group',
                                key: 'quality-dropdown'
                            },
                                [
                                    React.createElement('label', {
                                        className: 'dropdown-label',
                                        key: 'quality-label'
                                    }, 'Filtrer par type'),
                                    
                                    React.createElement('select', {
                                        value: filter,
                                        onChange: (e) => setFilter(e.target.value),
                                        className: 'dropdown-select',
                                        key: 'quality-select'
                                    },
                                        VALUE_TRAP_FILTERS.map(option =>
                                            React.createElement('option', {
                                                value: option.value,
                                                key: option.value,
                                                className: 'bg-gray-800'
                                            }, option.label)
                                        )
                                    )
                                ]
                            ),

                            React.createElement('div', {
                                className: 'dropdown-group',
                                key: 'sector-dropdown'
                            },
                                [
                                    React.createElement('label', {
                                        className: 'dropdown-label',
                                        key: 'sector-label'
                                    }, 'Filtrer par secteur'),
                                    
                                    React.createElement('select', {
                                        value: sectorFilter,
                                        onChange: (e) => setSectorFilter(e.target.value),
                                        className: 'dropdown-select',
                                        key: 'sector-select'
                                    },
                                        SECTORS.map(sector =>
                                            React.createElement('option', {
                                                value: sector,
                                                key: sector,
                                                className: 'bg-gray-800'
                                            }, sector)
                                        )
                                    )
                                ]
                            )
                        ]
                    )
                ]
            ),
          
            // Tableau Value Trap (MÊME DESIGN QUE BUFFETT)
            React.createElement('div', { 
                className: 'table-container',
                key: 'table-container'
            },
                [
                    React.createElement('div', { 
                        className: 'bg-gray-800 rounded-lg overflow-hidden shadow-xl',
                        key: 'table'
                    },
                        [
                            // En-tête du tableau Value Trap AVEC TRI
                            React.createElement('div', { 
                                className: 'grid grid-cols-12 gap-2 p-4 bg-gray-700 font-semibold text-xs',
                                key: 'table-header'
                            },
                                [
                                    React.createElement(SortableHeader, {
                                        key: 'symbole',
                                        column: 'symbole',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Symbole'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'nom',
                                        column: 'nom',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Entreprise'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'secteur',
                                        column: 'secteur',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Secteur'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'pe_ratio',
                                        column: 'pe_ratio',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'P/E'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'pb_ratio',
                                        column: 'pb_ratio',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'P/B'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'price_to_fcf',
                                        column: 'price_to_fcf',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'P/FCF'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'evToEbitda',
                                        column: 'evToEbitda',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'EV/EBITDA'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'roe',
                                        column: 'roe',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'ROE'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'roic',
                                        column: 'roic',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'ROIC'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'graham_multiple',
                                        column: 'graham_multiple',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Graham'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'value_score',
                                        column: 'value_score',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Score'),
                                    
                                    React.createElement('div', { key: 'grade' }, 'Grade')
                                ]
                            ),
                            
                            // Corps du tableau
                            ...paginatedData.map((item, index) =>
                                React.createElement('div', {
                                    key: item.symbole + index,
                                    className: 'grid grid-cols-12 gap-2 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors text-xs'
                                },
                                    [
                                        React.createElement('div', { 
                                            className: 'font-bold text-sm',
                                            key: 'symbole'
                                        }, item.symbole),
                                        React.createElement('div', { 
                                            className: 'font-semibold',
                                            key: 'nom' 
                                        }, item.nom),
                                        React.createElement('div', { 
                                            className: 'text-gray-300',
                                            key: 'secteur' 
                                        }, item.secteur),
                                        React.createElement('div', { 
                                            className: item.pe_ratio < 8 ? 'text-green-400 font-bold' : 
                                                      item.pe_ratio < 15 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                            key: 'pe'
                                        }, `${Number(item.pe_ratio).toFixed(2)}`),
                                        React.createElement('div', { 
                                            className: item.pb_ratio < 1 ? 'text-green-400 font-bold' : 
                                                      item.pb_ratio < 2 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                            key: 'pb'
                                        }, `${Number(item.pb_ratio).toFixed(2)}`),
                                        React.createElement('div', { 
                                            className: item.price_to_fcf < 10 ? 'text-green-400 font-bold' : 
                                                      item.price_to_fcf < 20 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                            key: 'p-fcf'
                                        }, `${Number(item.price_to_fcf).toFixed(2)}`),
                                        React.createElement('div', { 
                                            className: item.evToEbitda < 8 ? 'text-green-400 font-bold' : 
                                                      item.evToEbitda < 15 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                            key: 'ev-ebitda'
                                        }, `${Number(item.evToEbitda).toFixed(2)}`),
                                        React.createElement('div', { 
                                            className: item.roe > 15 ? 'text-green-400 font-bold' : 
                                                      item.roe > 8 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                            key: 'roe'
                                        }, `${Number(item.roe).toFixed(2)}%`),
                                        React.createElement('div', { 
                                            className: item.roic > 12 ? 'text-green-400 font-bold' : 
                                                      item.roic > 8 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                            key: 'roic'
                                        }, `${Number(item.roic).toFixed(2)}%`),
                                        React.createElement('div', { 
                                            className: item.graham_multiple < 15 ? 'text-green-400 font-bold' : 
                                                      item.graham_multiple < 22.5 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                            key: 'graham'
                                        }, `${Number(item.graham_multiple).toFixed(2)}`),
                                        React.createElement('div', { 
                                            className: getValueScoreColor(item.value_score),
                                            key: 'score'
                                        }, `${Number(item.value_score).toFixed(2)}`),
                                        React.createElement('div', { 
                                            className: `px-2 py-1 rounded-full text-xs font-bold text-center text-white ${getValueGradeColor(item.value_grade)}`,
                                            key: 'grade'
                                        }, item.value_grade)
                                    ]
                                )
                            )
                        ]
                    )
                ]
            ),

            // PAGINATION (MÊME DESIGN QUE BUFFETT)
            React.createElement(Pagination, {
                key: 'pagination',
                currentPage: currentPage,
                totalPages: totalPages,
                onPageChange: onPageChange, 
                itemsPerPage: itemsPerPage,
                onItemsPerPageChange: onItemsPerPageChange, 
                totalItems: filteredData.length
            })
        ]
    );
};

// Composant Onglet Short Risk Detector avec Filtres, Tri et Recherche
const ShortRiskTab = ({ 
    data, 
    getShortSignalColor, 
    getRiskScoreColor, 
    getMetricColor, 
    formatMillions, 
    sortConfig, 
    onSort, 
    searchTerm, 
    onSearch, 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    onItemsPerPageChange,
    totalItems 
}) => {
    const [filter, setFilter] = useState('ALL');
    const [sectorFilter, setSectorFilter] = useState('Tous secteurs');

    const RISK_FILTERS = [
        { value: 'ALL', label: 'Tous risques' },
        { value: 'CRITICAL', label: '🚨 CRITIQUE' },
        { value: 'HIGH', label: '🔴 ÉLEVÉ' },
        { value: 'MEDIUM', label: '🟡 MOYEN' },
        { value: 'LOW', label: '🟢 FAIBLE' }
    ];

    const SECTORS = [
        'Tous secteurs',
        'Industrials',
        'Technology', 
        'Financial Services',
        'Consumer Cyclical',
        'Consumer Defensive', 
        'Healthcare',
        'Basic Materials',
        'Energy',
        'Communication Services',
        'Utilities',
        'Real Estate'
    ];

    const getSortedAndFilteredData = (data) => {
        if (!data) return [];
        
        let filteredData = data;
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filteredData = data.filter(item => 
                Object.values(item).some(value => 
                    value && value.toString().toLowerCase().includes(searchLower)
                )
            );
        }

        if (sortConfig.key) {
            filteredData = [...filteredData].sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (aValue === null || aValue === undefined) aValue = '';
                if (bValue === null || bValue === undefined) bValue = '';

                if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredData;
    };

        const getPaginatedData = (data) => {
                if (!data || data.length === 0) return [];
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                return data.slice(startIndex, endIndex);
            };
        
            // ✅ CORRECTION : Une seule déclaration avec useMemo
            const sortedAndFilteredData = React.useMemo(() => {
                return getSortedAndFilteredData(data);
            }, [data, searchTerm, sortConfig]);
        
            const filteredData = React.useMemo(() => {
                return sortedAndFilteredData.filter(item => {
                    const qualityMatch = filter === 'ALL' || 
                        (filter === 'CRITICAL' && item.risk_score >= 8) ||
                        (filter === 'HIGH' && item.risk_score >= 5 && item.risk_score < 8) ||
                        (filter === 'MEDIUM' && item.risk_score >= 3 && item.risk_score < 5) ||
                        (filter === 'LOW' && item.risk_score < 3);
                    
                    const sectorMatch = sectorFilter === 'Tous secteurs' || 
                        (item.secteur && item.secteur === sectorFilter);
                    
                    return qualityMatch && sectorMatch;
                });
            }, [sortedAndFilteredData, filter, sectorFilter]);
        
            const paginatedData = React.useMemo(() => {
                return getPaginatedData(filteredData);
            }, [filteredData, currentPage, itemsPerPage]);
        
            return React.createElement('div', {},
                [

                  React.createElement(DescriptionBox, {
                         key: 'description',
                         analysisType: 'shortrisk'
                   }),  
                  
                    // Section Recherche et Filtres (MÊME DESIGN QUE BUFFETT)
                    React.createElement('div', { 
                        className: 'search-section mb-6',
                        key: 'search-filters'
                    },
                                [
                                      React.createElement('div', {
                                           className: 'search-input-container',
                                           key: 'search-bar'
                                        },
                                  [
                                      React.createElement('div', {
                                          className: 'search-icon',
                                          key: 'search-icon'
                                      }, '🔍'),
                                      
                                      React.createElement('input', {
                                          type: 'text',
                                          placeholder: 'Rechercher entreprises',
                                          value: searchTerm,
                                          onChange: (e) => onSearch(e.target.value),
                                          className: 'search-input',
                                          key: 'search-input'
                                      }),
                                      
                                      React.createElement('div', {
                                          className: 'results-counter',
                                          key: 'counter'
                                      }, `${filteredData.length} résultat(s)`)
                                  ]
                              ),
          
                              React.createElement('div', {
                                  className: 'dropdown-grid',
                                  key: 'dropdowns-grid'
                              },
                                  [
                                      React.createElement('div', {
                                          className: 'dropdown-group',
                                          key: 'quality-dropdown'
                                      },
                                          [
                                              React.createElement('label', {
                                                  className: 'dropdown-label',
                                                  key: 'quality-label'
                                              }, 'Filtrer par risque'),
                                              
                                              React.createElement('select', {
                                                  value: filter,
                                                  onChange: (e) => setFilter(e.target.value),
                                                  className: 'dropdown-select',
                                                  key: 'quality-select'
                                              },
                                                  RISK_FILTERS.map(option =>
                                                      React.createElement('option', {
                                                          value: option.value,
                                                          key: option.value,
                                                          className: 'bg-gray-800'
                                                      }, option.label)
                                                  )
                                              )
                                          ]
                                      ),

                            React.createElement('div', {
                                className: 'dropdown-group',
                                key: 'sector-dropdown'
                            },
                                [
                                    React.createElement('label', {
                                        className: 'dropdown-label',
                                        key: 'sector-label'
                                    }, 'Filtrer par secteur'),
                                    
                                    React.createElement('select', {
                                        value: sectorFilter,
                                        onChange: (e) => setSectorFilter(e.target.value),
                                        className: 'dropdown-select',
                                        key: 'sector-select'
                                    },
                                        SECTORS.map(sector =>
                                            React.createElement('option', {
                                                value: sector,
                                                key: sector,
                                                className: 'bg-gray-800'
                                            }, sector)
                                        )
                                    )
                                ]
                            )
                        ]
                    )
                ]
            ),
          
            // Tableau Short Risk (MÊME DESIGN QUE BUFFETT)
            React.createElement('div', { 
                className: 'table-container',
                key: 'table-container'
            },
                [
                    React.createElement('div', { 
                        className: 'bg-gray-800 rounded-lg overflow-hidden shadow-xl',
                        key: 'table'
                    },
                        [
                            // En-tête du tableau Short Risk AVEC TRI
                            React.createElement('div', { 
                                className: 'grid grid-cols-11 gap-2 p-4 bg-gray-700 font-semibold text-sm',
                                key: 'table-header'
                            },
                                [
                                    React.createElement(SortableHeader, {
                                        key: 'symbole',
                                        column: 'symbole',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Symbole'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'nom',
                                        column: 'nom',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Entreprise'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'secteur',
                                        column: 'secteur',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Secteur'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'debt_to_equity',
                                        column: 'debt_to_equity',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Dette/Equity'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'interest_coverage',
                                        column: 'interest_coverage',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Coverage Int.'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'current_ratio',
                                        column: 'current_ratio',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Current Ratio'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'net_income',
                                        column: 'net_income',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Net Income'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'operating_cash_flow',
                                        column: 'operating_cash_flow',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Cash Flow Op.'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'revenue',
                                        column: 'revenue',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Revenus'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'risk_score',
                                        column: 'risk_score',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Score Risque'),
                                    
                                    React.createElement('div', { key: 'signal' }, 'Signal')
                                ]
                            ),
                            
                            // Corps du tableau Short Risk
                            ...paginatedData.map((item, index) =>
                                React.createElement('div', {
                                    key: item.symbole + index,
                                    className: 'grid grid-cols-11 gap-2 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors text-sm'
                                },
                                    [
                                        React.createElement('div', { 
                                            className: 'font-bold text-lg',
                                            key: 'symbole'
                                        }, item.symbole),
                                        React.createElement('div', { 
                                            className: 'font-semibold',
                                            key: 'nom' 
                                        }, item.nom),
                                        React.createElement('div', { 
                                            className: 'text-gray-300',
                                            key: 'secteur' 
                                        }, item.secteur),
                                        React.createElement('div', { 
                                            className: item.debt_to_equity > 3 ? 'text-red-400 font-bold' : 
                                                      item.debt_to_equity > 2 ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold',
                                            key: 'debt'
                                        }, `${Number(item.debt_to_equity).toFixed(2)}x`),
                                        React.createElement('div', { 
                                            className: item.interest_coverage < 1 ? 'text-red-400 font-bold' : 
                                                      item.interest_coverage < 1.5 ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold',
                                            key: 'interest'
                                        }, `${Number(item.interest_coverage).toFixed(2)}`),
                                        React.createElement('div', { 
                                            className: item.current_ratio < 0.8 ? 'text-red-400 font-bold' : 
                                                      item.current_ratio < 1 ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold',
                                            key: 'current'
                                        }, `${Number(item.current_ratio).toFixed(2)}`),
                                        React.createElement('div', { 
                                            className: item.net_income < 0 ? 'text-red-400 font-bold' : 'text-green-400 font-bold',
                                            key: 'net-income'
                                        }, formatMillions(item.net_income)),
                                        React.createElement('div', { 
                                            className: item.operating_cash_flow < 0 ? 'text-red-400 font-bold' : 'text-green-400 font-bold',
                                            key: 'cash-flow'
                                        }, formatMillions(item.operating_cash_flow)),
                                        React.createElement('div', { 
                                            key: 'revenue'
                                        }, formatMillions(item.revenue)),
                                        React.createElement('div', { 
                                            className: item.risk_score >= 8 ? 'text-red-400 font-bold' : 
                                                      item.risk_score >= 5 ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold',
                                            key: 'risk-score'
                                        }, item.risk_score),
                                        React.createElement('div', { 
                                            className: `px-3 py-2 rounded-full text-xs font-bold text-center text-white ${
                                                item.risk_score >= 8 ? 'bg-red-600' : 
                                                item.risk_score >= 5 ? 'bg-orange-600' : 
                                                'bg-yellow-600'
                                            }`,
                                            key: 'signal'
                                        }, item.short_signal)
                                    ]
                                )
                            )
                        ]
                    )
                ]
            ),

            // PAGINATION (MÊME DESIGN QUE BUFFETT)
            React.createElement(Pagination, {
                key: 'pagination',
                currentPage: currentPage,
                totalPages: totalPages,
                onPageChange: onPageChange, 
                itemsPerPage: itemsPerPage,
                onItemsPerPageChange: onItemsPerPageChange, 
                totalItems: filteredData.length
            })
        ]
    );
};
// Composant Onglet Dividend avec Filtres, Tri, Recherche et PAGINATION
const DividendTab = ({ 
    data, 
    getDividendGradeColor, 
    getSafetyScoreColor, 
    sortConfig, 
    onSort, 
    searchTerm, 
    onSearch, 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    onItemsPerPageChange,
    totalItems 
}) => {
    const [filter, setFilter] = useState('ALL');
    const [sectorFilter, setSectorFilter] = useState('Tous secteurs');

    const DIVIDEND_FILTERS = [
        { value: 'ALL', label: 'Tous grades' },
        { value: 'ELITE_DIVIDEND', label: '🏆 ELITE' },
        { value: 'QUALITY_INCOME', label: '⭐ QUALITÉ' },
        { value: 'HIGH_INCOME', label: '✅ HAUT RENDEMENT' },
        { value: 'GROWTH_INCOME', label: '📈 CROISSANCE' },
        { value: 'RISKY_INCOME', label: '🚨 RISQUE' }
    ];

    const SECTORS = [
        'Tous secteurs',
        'Industrials',
        'Technology', 
        'Financial Services',
        'Consumer Cyclical',
        'Consumer Defensive', 
        'Healthcare',
        'Basic Materials',
        'Energy',
        'Communication Services',
        'Utilities',
        'Real Estate'
    ];

    const getSortedAndFilteredData = (data) => {
        if (!data) return [];
        
        let filteredData = data;
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filteredData = data.filter(item => 
                Object.values(item).some(value => 
                    value && value.toString().toLowerCase().includes(searchLower)
                )
            );
        }

        if (sortConfig.key) {
            filteredData = [...filteredData].sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (aValue === null || aValue === undefined) aValue = '';
                if (bValue === null || bValue === undefined) bValue = '';

                if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredData;
    };

    const getPaginatedData = (data) => {
        if (!data || data.length === 0) return [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const sortedAndFilteredData = React.useMemo(() => {
        return getSortedAndFilteredData(data);
    }, [data, searchTerm, sortConfig]);

    const filteredData = React.useMemo(() => {
        return sortedAndFilteredData.filter(item => {
            const qualityMatch = filter === 'ALL' || 
                (item.dividend_grade && item.dividend_grade.includes(filter));
            
            const sectorMatch = sectorFilter === 'Tous secteurs' || 
                (item.secteur && item.secteur === sectorFilter);
            
            return qualityMatch && sectorMatch;
        });
    }, [sortedAndFilteredData, filter, sectorFilter]);

    const paginatedData = React.useMemo(() => {
        return getPaginatedData(filteredData);
    }, [filteredData, currentPage, itemsPerPage]);

    return React.createElement('div', {},
        [
            React.createElement(DescriptionBox, {
                key: 'description',
                analysisType: 'dividend'
            }),

            // Section Recherche et Filtres
            React.createElement('div', { 
                className: 'search-section mb-6',
                key: 'search-filters'
            },
                [
                    React.createElement('div', {
                        className: 'search-input-container',
                        key: 'search-bar'
                    },
                        [
                            React.createElement('div', {
                                className: 'search-icon',
                                key: 'search-icon'
                            }, '🔍'),
                            
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'Rechercher entreprises',
                                value: searchTerm,
                                onChange: (e) => onSearch(e.target.value),
                                className: 'search-input',
                                key: 'search-input'
                            }),
                            
                            React.createElement('div', {
                                className: 'results-counter',
                                key: 'counter'
                            }, `${filteredData.length} résultat(s)`)
                        ]
                    ),

                    React.createElement('div', {
                        className: 'dropdown-grid',
                        key: 'dropdowns-grid'
                    },
                        [
                            React.createElement('div', {
                                className: 'dropdown-group',
                                key: 'quality-dropdown'
                            },
                                [
                                    React.createElement('label', {
                                        className: 'dropdown-label',
                                        key: 'quality-label'
                                    }, 'Filtrer par grade'),
                                    
                                    React.createElement('select', {
                                        value: filter,
                                        onChange: (e) => setFilter(e.target.value),
                                        className: 'dropdown-select',
                                        key: 'quality-select'
                                    },
                                        DIVIDEND_FILTERS.map(option =>
                                            React.createElement('option', {
                                                value: option.value,
                                                key: option.value,
                                                className: 'bg-gray-800'
                                            }, option.label)
                                        )
                                    )
                                ]
                            ),

                            React.createElement('div', {
                                className: 'dropdown-group',
                                key: 'sector-dropdown'
                            },
                                [
                                    React.createElement('label', {
                                        className: 'dropdown-label',
                                        key: 'sector-label'
                                    }, 'Filtrer par secteur'),
                                    
                                    React.createElement('select', {
                                        value: sectorFilter,
                                        onChange: (e) => setSectorFilter(e.target.value),
                                        className: 'dropdown-select',
                                        key: 'sector-select'
                                    },
                                        SECTORS.map(sector =>
                                            React.createElement('option', {
                                                value: sector,
                                                key: sector,
                                                className: 'bg-gray-800'
                                            }, sector)
                                        )
                                    )
                                ]
                            )
                        ]
                    )
                ]
            ),
          
            // Tableau Dividend (MÊME DESIGN QUE BUFFETT)
            React.createElement('div', { 
                className: 'table-container',
                key: 'table-container'
            },
                [
                    React.createElement('div', { 
                        className: 'bg-gray-800 rounded-lg overflow-hidden shadow-xl',
                        key: 'table'
                    },
                        [
                            // En-tête du tableau Dividend AVEC TRI
                            React.createElement('div', { 
                                className: 'grid grid-cols-11 gap-2 p-4 bg-gray-700 font-semibold text-xs',
                                key: 'table-header'
                            },
                                [
                                    React.createElement(SortableHeader, {
                                        key: 'symbole',
                                        column: 'symbole',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Symbole'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'nom',
                                        column: 'nom',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Entreprise'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'secteur',
                                        column: 'secteur',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Secteur'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'dividend_yield',
                                        column: 'dividend_yield',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Dividend Yield'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'earnings_yield',
                                        column: 'earnings_yield',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Earnings Yield'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'payout_ratio',
                                        column: 'payout_ratio',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Payout Ratio'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'roe',
                                        column: 'roe',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'ROE'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'debt_equity',
                                        column: 'debt_equity',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Dette/Equity'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'coverage_ratio',
                                        column: 'coverage_ratio',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Coverage Ratio'),
                                    
                                    React.createElement(SortableHeader, {
                                        key: 'safety_score',
                                        column: 'safety_score',
                                        sortConfig: sortConfig,
                                        onSort: onSort
                                    }, 'Safety Score'),
                                    
                                    React.createElement('div', { key: 'grade' }, 'Grade')
                                ]
                            ),
                            
                            // Corps du tableau
                            ...paginatedData.map((item, index) =>
                                React.createElement('div', {
                                    key: item.symbole + index,
                                    className: 'grid grid-cols-11 gap-2 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors text-xs'
                                },
                                    [
                                        React.createElement('div', { 
                                            className: 'font-bold text-sm',
                                            key: 'symbole'
                                        }, item.symbole),
                                        React.createElement('div', { 
                                            className: 'font-semibold',
                                            key: 'nom' 
                                        }, item.nom),
                                        React.createElement('div', { 
                                            className: 'text-gray-300',
                                            key: 'secteur' 
                                        }, item.secteur),
                                        React.createElement('div', { 
                                            className: item.dividend_yield > 12 ? 'text-red-400 font-bold' : 
                                                      item.dividend_yield > 6 ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold',
                                            key: 'dividend-yield'
                                        }, `${Number(item.dividend_yield).toFixed(2)}%`),
                                        React.createElement('div', { 
                                            className: 'text-blue-400 font-bold',
                                            key: 'earnings-yield'
                                        }, `${Number(item.earnings_yield).toFixed(2)}%`),
                                        React.createElement('div', { 
                                            className: item.payout_ratio > 0.8 ? 'text-red-400 font-bold' : 
                                                      item.payout_ratio > 0.5 ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold',
                                            key: 'payout-ratio'
                                        }, `${Number(item.payout_ratio).toFixed(2)}`),
                                        React.createElement('div', { 
                                            className: item.roe > 20 ? 'text-green-400 font-bold' : 
                                                      item.roe > 15 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                            key: 'roe'
                                        }, `${Number(item.roe).toFixed(1)}%`),
                                        React.createElement('div', { 
                                            className: item.debt_equity > 1 ? 'text-red-400 font-bold' : 
                                                      item.debt_equity > 0.5 ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold',
                                            key: 'debt-equity'
                                        }, `${Number(item.debt_equity).toFixed(2)}`),
                                        React.createElement('div', { 
                                            className: item.coverage_ratio > 2 ? 'text-green-400 font-bold' : 
                                                      item.coverage_ratio > 1.5 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                            key: 'coverage'
                                        }, `${Number(item.coverage_ratio).toFixed(1)}x`),
                                        React.createElement('div', { 
                                            className: getSafetyScoreColor(item.safety_score),
                                            key: 'safety-score'
                                        }, item.safety_score),
                                        React.createElement('div', { 
                                            className: `px-2 py-1 rounded-full text-xs font-bold text-center text-white ${getDividendGradeColor(item.dividend_grade)}`,
                                            key: 'grade'
                                        }, item.dividend_grade)
                                    ]
                                )
                            )
                        ]
                    )
                ]
            ),

            // PAGINATION (MÊME DESIGN QUE BUFFETT)
            React.createElement(Pagination, {
                key: 'pagination',
                currentPage: currentPage,
                totalPages: totalPages,
                onPageChange: onPageChange, 
                itemsPerPage: itemsPerPage,
                onItemsPerPageChange: onItemsPerPageChange, 
                totalItems: filteredData.length
            })
        ]
    );
};

// COMPOSANT PRINCIPAL - InvestmentApp
const InvestmentApp = () => {
    const [activeTab, setActiveTab] = useState('buffett');
    const [buffettData, setBuffettData] = useState([]);
    const [cashFlowData, setCashFlowData] = useState([]);
    const [valueTrapData, setValueTrapData] = useState([]);
    const [shortRiskData, setShortRiskData] = useState([]);
    const [dividendData, setDividendData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // ÉTATS LOCAUX POUR CHAQUE ONGLET
    const [buffettFilter, setBuffettFilter] = useState('ALL');
    const [cashFlowFilter, setCashFlowFilter] = useState('ALL');
    const [valueTrapFilter, setValueTrapFilter] = useState('ALL');
    const [shortRiskFilter, setShortRiskFilter] = useState('ALL');
    const [dividendFilter, setDividendFilter] = useState('ALL');
    
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [globalSearch, setGlobalSearch] = useState('');
        
    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    // DONNÉES FILTRÉES (supprimer l'ancien filtre global)
    const filteredBuffettData = buffettData || [];
    const filteredCashFlowData = cashFlowData || [];
    const filteredValueTrapData = valueTrapData || [];
    const filteredShortRiskData = shortRiskData || [];
    const filteredDividendData = dividendData || [];

    // FONCTION PAGINATION
    const getPaginatedData = (data) => {
        if (!data || data.length === 0) return [];
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    // CALCUL DES PAGES
    useEffect(() => {
        let dataLength = 0;
        switch (activeTab) {
            case 'buffett': dataLength = filteredBuffettData.length; break;
            case 'cashflow': dataLength = filteredCashFlowData.length; break;
            case 'valuetrap': dataLength = filteredValueTrapData.length; break;
            case 'shortrisk': dataLength = filteredShortRiskData.length; break;
            case 'dividend': dataLength = filteredDividendData.length; break;
            default: dataLength = 0;
        }
        setTotalPages(Math.ceil(dataLength / itemsPerPage));
        
        // Revenir à la page 1 quand les données changent
        setCurrentPage(1);
    }, [filteredBuffettData, filteredCashFlowData, filteredValueTrapData, filteredShortRiskData, filteredDividendData, activeTab, itemsPerPage]);
   
    // FONCTION DE TRI
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // FONCTION DE RECHERCHE GLOBALE
    const handleGlobalSearch = (searchTerm) => {
        setGlobalSearch(searchTerm);
    };

    const fetchAllData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Charger toutes les données en parallèle
          const [buffettResponse, cashFlowResponse, valueTrapResponse, shortRiskResponse, dividendResponse] = await Promise.all([ 
                fetch(`${API_BASE_URL}/buffett-scores`),
                fetch(`${API_BASE_URL}/cash-flow-momentum`),
                fetch(`${API_BASE_URL}/value-trap-detector`),
                fetch(`${API_BASE_URL}/short-risk-detector`),
                fetch(`${API_BASE_URL}/dividend-quality`) 
              ]);

            // Vérifier les réponses
            if (!buffettResponse.ok) throw new Error('Erreur Buffett API');
            if (!cashFlowResponse.ok) throw new Error('Erreur Cash Flow API');
            if (!valueTrapResponse.ok) throw new Error('Erreur Value Trap API');
            if (!shortRiskResponse.ok) throw new Error('Erreur Short Risk API');
            if (!dividendResponse.ok) throw new Error('Erreur Dividend API');

               // Convertir en JSON
            const [buffettResult, cashFlowResult, valueTrapResult, shortRiskResult, dividendResult] = await Promise.all([ // ← VIRGULE AJOUTÉE
              buffettResponse.json(),
              cashFlowResponse.json(),
              valueTrapResponse.json(),
              shortRiskResponse.json(),
              dividendResponse.json() 
            ]);
        
            setBuffettData(buffettResult);
            setCashFlowData(cashFlowResult);
            setValueTrapData(valueTrapResult);
            setShortRiskData(shortRiskResult);
            setDividendData(dividendResult); 
        
          } catch (err) {
            console.error('Erreur de chargement:', err);
            setError(`Erreur de connexion: ${err.message}. Vérifiez que le serveur backend est démarré.`);
          } finally {
            setLoading(false);
          }
        };
    useEffect(() => {
        fetchAllData();
    }, []);

  // Ajoutez les fonctions de style pour Dividend :
    const getDividendGradeColor = (grade) => {
        if (grade.includes('ELITE_DIVIDEND')) return 'bg-gradient-yellow';
        if (grade.includes('QUALITY_INCOME')) return 'bg-gradient-green';
        if (grade.includes('HIGH_INCOME')) return 'bg-gradient-blue';
        if (grade.includes('GROWTH_INCOME')) return 'bg-gradient-purple';
        if (grade.includes('RISKY_INCOME')) return 'bg-gradient-red';
        return 'bg-gradient-gray';
    };

    const getSafetyScoreColor = (score) => {
        if (score >= 7) return 'text-green-400 font-bold';
        if (score >= 5) return 'text-yellow-400 font-bold';
        if (score >= 3) return 'text-orange-400 font-bold';
        return 'text-red-400 font-bold';
    };

  
    // Fonctions de style (inchangées)
    const getBuffettRatingColor = (rating) => {
        if (rating.includes('ELITE')) return 'bg-gradient-yellow';
        if (rating.includes('STRONG')) return 'bg-gradient-green';
        if (rating.includes('DECENT')) return 'bg-gradient-blue';
        return 'bg-gradient-red';
    };

    const getValueColor = (value, excellent, good) => {
        if (value >= excellent) return 'text-green-400 font-bold';
        if (value >= good) return 'text-yellow-400 font-bold';
        return 'text-red-400 font-bold';
    };

    const getCashFlowColor = (value, type) => {
        if (type === 'margin') {
            if (value > 0.3) return 'text-green-400 font-bold';
            if (value > 0.15) return 'text-yellow-400 font-bold';
            return 'text-red-400 font-bold';
        } else if (type === 'yield') {
            if (value > 0.06) return 'text-green-400 font-bold';
            if (value > 0.03) return 'text-yellow-400 font-bold';
            return 'text-red-400 font-bold';
        }
    };

    const getValueGradeColor = (grade) => {
        if (grade.includes('ELITE_VALUE')) return 'value-badge-elite';
        if (grade.includes('SOLID_VALUE')) return 'value-badge-solid';
        if (grade.includes('VALUE_TRAP')) return 'value-badge-trap';
        if (grade.includes('POTENTIAL_VALUE')) return 'value-badge-potential';
        if (grade.includes('DEEP_VALUE')) return 'value-badge-deep';
        return 'value-badge-speculative';
    };

    const getValueScoreColor = (score) => {
        if (score > 30) return 'score-excellent';
        if (score > 20) return 'score-good';
        if (score > 10) return 'score-average';
        return 'score-poor';
    };

    const getShortSignalColor = (signal) => {
        if (signal.includes('DANGEROUS_DEBT')) return 'risk-badge-danger';
        if (signal.includes('INTEREST_CRISIS')) return 'risk-badge-crisis';
        if (signal.includes('LIQUIDITY_PROBLEM')) return 'risk-badge-liquidity';
        if (signal.includes('BURNING_CASH')) return 'risk-badge-cashburn';
        if (signal.includes('DOUBLE_TROUBLE')) return 'risk-badge-trouble';
        if (signal.includes('MICRO_CAP_DISTRESS')) return 'risk-badge-distress';
        return 'risk-badge-watch';
    };

    const getRiskScoreColor = (score) => {
        if (score >= 8) return 'risk-score-critical';
        if (score >= 5) return 'risk-score-high';
        if (score >= 3) return 'risk-score-medium';
        return 'risk-score-low';
    };

    const getMetricColor = (value, metric) => {
        if (metric === 'debt_to_equity') {
            return value > 3 ? 'metric-danger' : value > 2 ? 'metric-warning' : 'metric-ok';
        }
        if (metric === 'interest_coverage') {
            return value < 1 ? 'metric-danger' : value < 1.5 ? 'metric-warning' : 'metric-ok';
        }
        if (metric === 'current_ratio') {
            return value < 0.8 ? 'metric-danger' : value < 1 ? 'metric-warning' : 'metric-ok';
        }
        if (metric === 'net_income') {
            return value < 0 ? 'metric-danger' : 'metric-ok';
        }
        if (metric === 'operating_cash_flow') {
            return value < 0 ? 'metric-danger' : 'metric-ok';
        }
        return 'metric-ok';
    };

    const formatMillions = (value) => {
        if (value === null || value === undefined) return 'N/A';
        if (value < 0) {
            return `-$${Math.abs(value / 1000000).toFixed(1)}M`;
        }
        return `$${(value / 1000000).toFixed(1)}M`;
    };

    const formatPercent = (value) => {
        if (value === null || value === undefined) return 'N/A';
        return `${(value * 100).toFixed(1)}%`;
    };

    if (error) {
        return React.createElement('div', { 
            className: 'min-h-screen bg-gray-900 flex items-center justify-center text-white' 
        },
            React.createElement('div', { className: 'text-center' },
                [
                    React.createElement('h2', { 
                        className: 'text-2xl mb-4 text-red-400',
                        key: 'error-title'
                    }, '❌ Erreur de Connexion'),
                    React.createElement('p', { 
                        className: 'mb-4',
                        key: 'error-message' 
                    }, error),
                    React.createElement('button', {
                        key: 'retry-btn',
                        onClick: fetchAllData,
                        className: 'px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors'
                    }, '🔄 Réessayer')
                ]
            )
        );
    }

    if (loading) {
        return React.createElement('div', { 
            className: 'min-h-screen bg-gray-900 flex items-center justify-center' 
        },
            React.createElement('div', { className: 'text-center text-white' },
                [
                    React.createElement('div', { 
                        className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4',
                        key: 'spinner'
                    }),
                    React.createElement('p', { key: 'text' }, 'Chargement des données depuis la base de données...')
                ]
            )
        );
    }

    return React.createElement('div', { className: 'min-h-screen bg-gray-900 text-white p-4' },
        React.createElement('div', { className: 'max-w-7xl mx-auto' },
            [
                // En-tête
                React.createElement('div', { key: 'header' },
                    [
                        React.createElement('div', { 
                            className: 'glass-header',
                            key: 'main-header'
                        },
                            [
                                React.createElement('div', {
                                    className: 'flex items-center gap-4 mb-4',
                                    key: 'title-section'
                                },
                                    [
                                        React.createElement('div', {
                                            className: 'header-icon text-xl',
                                            key: 'main-icon'
                                        }, ''),
                                        
                                        React.createElement('div', { key: 'title-text' },
                                            [
                                                React.createElement('h1', { 
                                                    className: 'text-3xl font-bold text-white mb-0',
                                                    key: 'main-title'
                                                }, 'Analyse d\'entreprises'),
                                            ]
                                        )
                                    ]
                                ),
                            ]
                        )
                    ]
                ),
                
                // Onglets
                React.createElement('div', { 
                    className: 'tabs-container',
                    key: 'tabs'
                },
                    React.createElement('div', { className: 'tabs' },
                        [
                            React.createElement('button', {
                                key: 'buffett',
                                onClick: () => setActiveTab('buffett'),
                                className: `tab tab-gradient ${activeTab === 'buffett' ? 'active' : ''}`
                            }, `Qualité Buffett (${buffettData.length})`),
                            React.createElement('button', {
                                key: 'cashflow',
                                onClick: () => setActiveTab('cashflow'),
                                className: `tab tab-gradient ${activeTab === 'cashflow' ? 'active' : ''}`
                            }, `Cash Flow (${cashFlowData.length})`),
                            React.createElement('button', {
                                key: 'valuetrap',
                                onClick: () => setActiveTab('valuetrap'),
                                className: `tab tab-gradient ${activeTab === 'valuetrap' ? 'active' : ''}`
                            }, `Value Trap (${valueTrapData.length})`),
                            React.createElement('button', {
                                key: 'shortrisk',
                                onClick: () => setActiveTab('shortrisk'),
                                className: `tab tab-gradient ${activeTab === 'shortrisk' ? 'active' : ''}`
                            }, `Short Risk (${shortRiskData.length})`),
                          React.createElement('button', {
                                key: 'dividend',
                                onClick: () => setActiveTab('dividend'),
                                className: `tab tab-gradient ${activeTab === 'dividend' ? 'active' : ''}`
                            }, `Dividendes (${dividendData.length})`)
                        ]
                    )
                ),

                // Contenu des onglets
                activeTab === 'buffett' 
                    ? React.createElement('div', { key: 'buffett-tab' },
                        [
                            React.createElement(DescriptionBox, {
                                key: 'description',
                                analysisType: 'buffett'
                            }),
                            React.createElement(BuffettTab, {
                                key: 'table',
                                data: filteredBuffettData,
                                filter: buffettFilter,
                                onFilterChange: setBuffettFilter,
                                getRatingColor: getBuffettRatingColor,
                                getValueColor: getValueColor,
                                sortConfig: sortConfig,
                                onSort: handleSort,
                                searchTerm: globalSearch,
                                onSearch: handleGlobalSearch,
                                currentPage: currentPage,
                                totalPages: totalPages,
                                onPageChange: setCurrentPage,
                                itemsPerPage: itemsPerPage,
                                onItemsPerPageChange: setItemsPerPage,
                                totalItems: filteredBuffettData.length
                            })
                        ]
                    )
                    : activeTab === 'cashflow'
                        ? React.createElement(CashFlowTab, {
                        key: 'cashflow-tab',
                        data: filteredCashFlowData,
                        getCashFlowColor: getCashFlowColor,
                        formatMillions: formatMillions,
                        formatPercent: formatPercent,
                        sortConfig: sortConfig,
                        onSort: handleSort,
                        searchTerm: globalSearch,
                        onSearch: handleGlobalSearch,
                        currentPage: currentPage,
                        totalPages: totalPages,
                        onPageChange: setCurrentPage,
                        itemsPerPage: itemsPerPage,
                        onItemsPerPageChange: setItemsPerPage,
                        totalItems: filteredCashFlowData.length
                    })
                    : activeTab === 'valuetrap'
                    ? React.createElement(ValueTrapTab, {
                        key: 'valuetrap-tab',
                        data: filteredValueTrapData,
                        getValueGradeColor: getValueGradeColor,
                        getValueScoreColor: getValueScoreColor,
                        sortConfig: sortConfig,
                        onSort: handleSort,
                        searchTerm: globalSearch,
                        onSearch: handleGlobalSearch,
                        currentPage: currentPage,
                        totalPages: totalPages,
                        onPageChange: setCurrentPage,
                        itemsPerPage: itemsPerPage,
                        onItemsPerPageChange: setItemsPerPage,
                        totalItems: filteredValueTrapData.length
                    })
                      : activeTab === 'shortrisk'
                      ? React.createElement(ShortRiskTab, {
                        key: 'shortrisk-tab',
                        data: filteredShortRiskData,
                        getShortSignalColor: getShortSignalColor,
                        getRiskScoreColor: getRiskScoreColor,
                        getMetricColor: getMetricColor,
                        formatMillions: formatMillions,
                        sortConfig: sortConfig,
                        onSort: handleSort,
                        searchTerm: globalSearch,
                        onSearch: handleGlobalSearch,
                        currentPage: currentPage,
                        totalPages: totalPages,
                        onPageChange: setCurrentPage,
                        itemsPerPage: itemsPerPage,
                        onItemsPerPageChange: setItemsPerPage,
                        totalItems: filteredShortRiskData.length
                    })
                    : activeTab === 'dividend'
                    ? React.createElement(DividendTab, {
                        key: 'dividend-tab',
                        data: filteredDividendData,
                        getDividendGradeColor: getDividendGradeColor,
                        getSafetyScoreColor: getSafetyScoreColor,
                        sortConfig: sortConfig,
                        onSort: handleSort,
                        searchTerm: globalSearch,
                        onSearch: handleGlobalSearch,
                        currentPage: currentPage,
                        totalPages: totalPages,
                        onPageChange: setCurrentPage,
                        itemsPerPage: itemsPerPage,
                        onItemsPerPageChange: setItemsPerPage,
                        totalItems: filteredDividendData.length
                    })
            ]
        )
    );
}; 

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(InvestmentApp));
