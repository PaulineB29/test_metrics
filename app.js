import React, { useState, useEffect } from 'https://esm.sh/react@18'
import ReactDOM from 'https://esm.sh/react-dom@18/client'

// URL de base de l'API
const API_BASE_URL = 'https://test-metrics-hwmp.onrender.com/api';

const ANALYSIS_DESCRIPTIONS = {
  buffett: {
    title: "Buffett Quality Score - Explication pour les Investisseurs",
    sections: [
      {
        title: "L'Héritage de Warren Buffett",
        content: "Cette analyse applique les principes fondamentaux du plus grand investisseur de tous les temps : Warren Buffett. Elle identifie les entreprises d'exception selon sa philosophie : 'Achetez des entreprises merveilleuses à des prix raisonnables.'",
        expanded: true // ← Premier élément ouvert par défaut
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
        content: "Utilisez ces résultats comme point de départ pour vos recherches, pas comme décision finale d'investissement. La qualité durable paie toujours à long terme ! 📈💰",
        expanded: false
      }
    ]
  },
      // Ajouter les autres analyses plus tard
      cashflow: {
        title: "Cash Flow - Les Générateurs de Trésorerie",
        sections: [
          {
            title: "Ce que cette analyse mesure",
            content: "Cette analyse identifie les entreprises qui génèrent d'excellents flux de trésorerie - le véritable 'oxygène' d'une entreprise."
          }
          // ... (vous pourrez compléter plus tard)
        ]
      },
      valuetrap: {
        title: "Value Trap Detector - Éviter les Fausses Bonnes Affaires",
        sections: [] // À compléter
      },
      shortrisk: {
        title: "Short Risk - Détecteur de Détresse",
        sections: [] // À compléter
      }
    };

const InvestmentApp = () => {
    const [activeTab, setActiveTab] = useState('buffett');
    const [buffettData, setBuffettData] = useState([]);
    const [cashFlowData, setCashFlowData] = useState([]);
    const [valueTrapData, setValueTrapData] = useState([]);
    const [shortRiskData, setShortRiskData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Charger toutes les données en parallèle
            const [buffettResponse, cashFlowResponse, valueTrapResponse, shortRiskResponse] = await Promise.all([
                fetch(`${API_BASE_URL}/buffett-scores`),
                fetch(`${API_BASE_URL}/cash-flow-momentum`),
                fetch(`${API_BASE_URL}/value-trap-detector`),
                fetch(`${API_BASE_URL}/short-risk-detector`)
            ]);

            // Vérifier les réponses
            if (!buffettResponse.ok) throw new Error('Erreur Buffett API');
            if (!cashFlowResponse.ok) throw new Error('Erreur Cash Flow API');
            if (!valueTrapResponse.ok) throw new Error('Erreur Value Trap API');
            if (!shortRiskResponse.ok) throw new Error('Erreur Short Risk API');

            // Convertir en JSON
            const [buffettResult, cashFlowResult, valueTrapResult, shortRiskResult] = await Promise.all([
                buffettResponse.json(),
                cashFlowResponse.json(),
                valueTrapResponse.json(),
                shortRiskResponse.json()
            ]);

            setBuffettData(buffettResult);
            setCashFlowData(cashFlowResult);
            setValueTrapData(valueTrapResult);
            setShortRiskData(shortRiskResult);

        } catch (err) {
            console.error('Erreur de chargement:', err);
            setError(`Erreur de connexion: ${err.message}. Vérifiez que le serveur backend est démarré.`);
        } finally {
            setLoading(false);
        }
    };

    
    
   // Filtrage pour Buffett
    const filteredBuffettData = filter === 'ALL' 
        ? buffettData 
        : buffettData.filter(item => item.buffett_rating.includes(filter));

    // Filtrage pour les autres onglets (par défaut tous)
    const filteredCashFlowData = cashFlowData;
    const filteredValueTrapData = valueTrapData;
    const filteredShortRiskData = shortRiskData;

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
                        React.createElement('h1', { 
                            className: 'text-3xl font-bold mb-2',
                            key: 'title'
                        }, '📊 Analyse Investissement - Données Réelles'),
                        React.createElement('p', { 
                            className: 'text-gray-400 mb-6',
                            key: 'subtitle' 
                        }, 'Données en direct depuis PostgreSQL'),
                        React.createElement('div', { 
                            className: 'bg-green-500 text-white p-3 rounded-lg mb-4',
                            key: 'live-warning'
                        }, '✅ Connecté à la base de données en temps réel')
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
                                className: `tab ${activeTab === 'buffett' ? 'active' : ''}`
                            }, `📈 Score Buffett (${buffettData.length})`),
                            React.createElement('button', {
                                key: 'cashflow',
                                onClick: () => setActiveTab('cashflow'),
                                className: `tab ${activeTab === 'cashflow' ? 'active' : ''}`
                            }, `💰 Cash Flow (${cashFlowData.length})`),
                            React.createElement('button', {
                                key: 'valuetrap',
                                onClick: () => setActiveTab('valuetrap'),
                                className: `tab ${activeTab === 'valuetrap' ? 'active' : ''}`
                            }, `🎯 Value Trap (${valueTrapData.length})`),
                            React.createElement('button', {
                                key: 'shortrisk',
                                onClick: () => setActiveTab('shortrisk'),
                                className: `tab ${activeTab === 'shortrisk' ? 'active' : ''}`
                            }, `🚨 Short Risk (${shortRiskData.length})`)
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
                          filter: filter,
                          onFilterChange: setFilter,
                          getRatingColor: getBuffettRatingColor,
                          getValueColor: getValueColor
                        })
                      ]
                    )
                    : activeTab === 'cashflow'
                    ? React.createElement(CashFlowTab, {
                        key: 'cashflow-tab',
                        data: filteredCashFlowData,
                        getCashFlowColor: getCashFlowColor,
                        formatMillions: formatMillions,
                        formatPercent: formatPercent
                    })
                    : activeTab === 'valuetrap'
                    ? React.createElement(ValueTrapTab, {
                        key: 'valuetrap-tab',
                        data: filteredValueTrapData,
                        getValueGradeColor: getValueGradeColor,
                        getValueScoreColor: getValueScoreColor
                    })
                    : React.createElement(ShortRiskTab, {
                        key: 'shortrisk-tab',
                        data: filteredShortRiskData,
                        getShortSignalColor: getShortSignalColor,
                        getRiskScoreColor: getRiskScoreColor,
                        getMetricColor: getMetricColor,
                        formatMillions: formatMillions
                    })
            ]
        )
    );
};

const DescriptionBox = ({ analysisType }) => {
  const [expandedSections, setExpandedSections] = useState({});
  
  const desc = ANALYSIS_DESCRIPTIONS[analysisType];
  
  // Initialiser l'état des sections développées
  useEffect(() => {
    const initialExpanded = {};
    desc.sections.forEach((section, index) => {
      initialExpanded[index] = section.expanded || false;
    });
    setExpandedSections(initialExpanded);
  }, [analysisType]);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderSection = (section, index) => {
    const isExpanded = expandedSections[index];
    
    // Si c'est le premier élément (toujours visible)
    if (index === 0) {
      return React.createElement('div', { 
        className: 'mb-6',
        key: `default-${index}`
      },
        [
          section.title && React.createElement('h3', { 
            className: 'text-lg font-bold mb-3 text-white',
            key: 'title'
          }, section.title),
          
          React.createElement('p', {
            className: 'text-gray-300 leading-relaxed',
            key: 'content'
          }, section.content)
        ]
      );
    }

    // Pour les autres sections (menu déroulant)
    return React.createElement('div', { 
      className: 'mb-2',
      key: `accordion-${index}`
    },
      [
        // Bouton d'en-tête cliquable
        React.createElement('button', {
          onClick: () => toggleSection(index),
          className: `w-full text-left p-4 rounded-lg transition-all ${
            isExpanded ? 'bg-gray-750' : 'bg-gray-800 hover:bg-gray-750'
          }`,
          key: 'header'
        },
          [
            React.createElement('div', {
              className: 'flex justify-between items-center',
              key: 'header-content'
            },
              [
                React.createElement('h3', {
                  className: 'font-bold text-white',
                  key: 'title'
                }, section.title),
                
                React.createElement('span', {
                  className: 'text-xl',
                  key: 'arrow'
                }, isExpanded ? '▼' : '▶')
              ]
            )
          ]
        ),
        
        // Contenu déroulant
        isExpanded && React.createElement('div', {
          className: 'mt-2 p-4 bg-gray-800 rounded-lg',
          key: 'content'
        },
          renderSectionContent(section)
        )
      ]
    );
  };

  const renderSectionContent = (section) => {
    switch (section.type) {
      case "columns":
        return React.createElement('div', { key: 'columns-content' },
          React.createElement('div', {
            className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
          },
            section.items.map((item, idx) =>
              React.createElement('div', {
                className: 'bg-gray-700 p-4 rounded-lg',
                key: idx
              },
                [
                  React.createElement('div', { 
                    className: 'text-2xl mb-2',
                    key: 'emoji'
                  }, item.emoji),
                  
                  React.createElement('h4', { 
                    className: 'font-bold text-white mb-2',
                    key: 'item-title'
                  }, item.title),
                  
                  React.createElement('p', {
                    className: 'text-gray-300 text-sm mb-2',
                    key: 'desc'
                  }, item.description),
                  
                  item.quote && React.createElement('blockquote', {
                    className: 'text-yellow-400 text-xs italic border-l-2 border-yellow-400 pl-2 mt-2',
                    key: 'quote'
                  }, item.quote),
                  
                  item.note && React.createElement('p', {
                    className: 'text-blue-400 text-xs mt-2',
                    key: 'note'
                  }, item.note)
                ]
              )
            )
          )
        );

      case "table":
        return React.createElement('div', { key: 'table-content' },
          React.createElement('div', {
            className: 'overflow-x-auto',
          },
            React.createElement('table', { 
              className: 'w-full text-sm',
            },
              [
                React.createElement('thead', { key: 'head' },
                  React.createElement('tr', { className: 'bg-gray-600' },
                    section.headers.map((header, idx) =>
                      React.createElement('th', {
                        className: 'px-4 py-2 text-left font-semibold',
                        key: idx
                      }, header)
                    )
                  )
                ),
                
                React.createElement('tbody', { key: 'body' },
                  section.rows.map((row, rowIdx) =>
                    React.createElement('tr', {
                      className: rowIdx % 2 === 0 ? 'bg-gray-700' : 'bg-gray-650',
                      key: rowIdx
                    },
                      row.map((cell, cellIdx) =>
                        React.createElement('td', {
                          className: 'px-4 py-2 border-b border-gray-600',
                          key: cellIdx
                        }, cell)
                      )
                    )
                  )
                )
              ]
            )
          )
        );

            case "comparison":
        return React.createElement('div', { 
          className: 'bg-gray-750 rounded-lg p-6 mb-6',
          key: `comparison-${index}`
        },
          [
            React.createElement('h3', { 
              className: 'text-lg font-bold mb-4 text-white',
              key: 'title'
            }, section.title),
            
            React.createElement('div', {
              className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
              key: 'comparison-grid'
            },
              [
                // Colonne "Ce qu'il faut faire"
                React.createElement('div', {
                  className: 'bg-green-900/30 p-4 rounded-lg border border-green-500',
                  key: 'good'
                },
                  [
                    React.createElement('h4', {
                      className: 'font-bold text-green-400 mb-3',
                      key: 'good-title'
                    }, section.good.title),
                    ...section.good.items.map((item, idx) =>
                      React.createElement('div', {
                        className: 'flex items-center text-green-300 text-sm mb-2',
                        key: `good-${idx}`
                      }, item)
                    )
                  ]
                ),
                
                // Colonne "Ce qu'il faut éviter"
                React.createElement('div', {
                  className: 'bg-red-900/30 p-4 rounded-lg border border-red-500',
                  key: 'bad'
                },
                  [
                    React.createElement('h4', {
                      className: 'font-bold text-red-400 mb-3',
                      key: 'bad-title'
                    }, section.bad.title),
                    ...section.bad.items.map((item, idx) =>
                      React.createElement('div', {
                        className: 'flex items-center text-red-300 text-sm mb-2',
                        key: `bad-${idx}`
                      }, item)
                    )
                  ]
                )
              ]
            )
          ]
        );

      case "usage":
        return React.createElement('div', { 
          className: 'bg-gray-750 rounded-lg p-6 mb-6',
          key: `usage-${index}`
        },
          [
            React.createElement('h3', { 
              className: 'text-lg font-bold mb-4 text-white',
              key: 'title'
            }, section.title),
            
            ...section.items.map((item, idx) =>
              React.createElement('div', {
                className: 'mb-3 p-3 bg-gray-700 rounded-lg',
                key: `usage-${idx}`
              },
                [
                  React.createElement('div', {
                    className: 'font-semibold text-blue-300 mb-1',
                    key: 'target'
                  }, item.target),
                  React.createElement('div', {
                    className: 'text-white',
                    key: 'action'
                  }, item.action)
                ]
              )
            )
          ]
        );

      case "warnings":
        return React.createElement('div', { 
          className: 'bg-yellow-900/20 rounded-lg p-6 mb-6 border border-yellow-500',
          key: `warnings-${index}`
        },
          [
            React.createElement('h3', { 
              className: 'text-lg font-bold mb-4 text-yellow-400',
              key: 'title'
            }, section.title),
            
            React.createElement('div', {
              className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
              key: 'warnings-grid'
            },
              [
                React.createElement('div', {
                  key: 'limitations'
                },
                  [
                    React.createElement('h4', {
                      className: 'font-semibold text-yellow-300 mb-3',
                      key: 'limitations-title'
                    }, section.limitations.title),
                    ...section.limitations.items.map((item, idx) =>
                      React.createElement('div', {
                        className: 'flex items-center text-yellow-200 text-sm mb-2',
                        key: `limit-${idx}`
                      }, item)
                    )
                  ]
                ),
                
                React.createElement('div', {
                  key: 'complements'
                },
                  [
                    React.createElement('h4', {
                      className: 'font-semibold text-blue-300 mb-3',
                      key: 'complements-title'
                    }, section.complements.title),
                    ...section.complements.items.map((item, idx) =>
                      React.createElement('div', {
                        className: 'flex items-center text-blue-200 text-sm mb-2',
                        key: `comp-${idx}`
                      }, item)
                    )
                  ]
                )
              ]
            )
          ]
        );

      case "quote":
        return React.createElement('div', { 
          className: 'bg-purple-900/30 rounded-lg p-6 mb-6 text-center border border-purple-500',
          key: `quote-${index}`
        },
          [
            React.createElement('h3', { 
              className: 'text-xl font-bold mb-3 text-purple-300',
              key: 'content'
            }, section.content),
            
            React.createElement('blockquote', {
              className: 'text-white text-lg italic mb-4',
              key: 'quote'
            }, section.quote),
            
            React.createElement('p', {
              className: 'text-gray-300',
              key: 'note'
            }, section.note)
          ]
        );

      case "final-note":
        return React.createElement('div', { 
          className: 'bg-blue-900/30 rounded-lg p-4 mb-4 text-center',
          key: `final-${index}`
        },
          React.createElement('p', {
            className: 'text-blue-200 font-semibold'
          }, section.content)
        );

            default:
            return React.createElement('p', {
              className: 'text-gray-300 leading-relaxed',
              key: 'default-content'
            }, section.content);
        }
      };
    
            return React.createElement('div', { 
              className: 'bg-gray-800 rounded-lg p-6 mb-8 border-l-4 border-blue-500'
            },
              [
                React.createElement('h2', { 
                  className: 'text-2xl font-bold mb-6 text-white text-center',
                  key: 'main-title'
                }, desc.title),
                
                ...desc.sections.map((section, index) => renderSection(section, index))
              ]
            );
          };
    }
};

  return React.createElement('div', { 
    className: 'bg-gray-800 rounded-lg p-6 mb-8 border-l-4 border-blue-500'
  },
    [
      React.createElement('h2', { 
        className: 'text-2xl font-bold mb-6 text-white text-center',
        key: 'main-title'
      }, desc.title),
      
      ...desc.sections.map((section, index) => renderSection(section, index))
    ]
  );
};


// Composant Onglet Buffett 
const BuffettTab = ({ data, filter, onFilterChange, getRatingColor, getValueColor }) => {
    return React.createElement('div', {},
        [
            // Filtres Buffett
            React.createElement('div', { 
                className: 'flex gap-2 mb-6 flex-wrap',
                key: 'filters' 
            },
                ['ALL', 'ELITE', 'STRONG', 'DECENT', 'WEAK'].map(filt =>
                    React.createElement('button', {
                        key: filt,
                        onClick: () => onFilterChange(filt),
                        className: `px-4 py-2 rounded-lg transition-all ${
                            filter === filt 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`
                    }, 
                    filt === 'ALL' ? '📋 Toutes' : 
                    filt === 'ELITE' ? '⭐ ELITE' :
                    filt === 'STRONG' ? '✅ STRONG' :
                    filt === 'DECENT' ? '🟡 DECENT' : '🔴 WEAK')
                )
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
                            // En-tête du tableau
                            React.createElement('div', { 
                                className: 'grid grid-cols-8 gap-4 p-4 bg-gray-700 font-semibold text-sm',
                                key: 'table-header'
                            },
                                ['Symbole', 'Entreprise', 'Secteur', 'ROE', 'ROIC', 'D/E', 'Marge', 'Score'].map(header =>
                                    React.createElement('div', { key: header }, header)
                                )
                            ),
                            
                            // Corps du tableau
                            ...data.map((item, index) =>
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
                    ),

                    // Compteur
                    React.createElement('div', { 
                        className: 'mt-4 text-gray-400 text-sm',
                        key: 'counter'
                    }, 
                        `📊 ${data.length} entreprise(s) trouvée(s) ${
                            filter !== 'ALL' ? `(Filtre: ${filter})` : ''
                        }`
                    )
                ]
            )
        ]
    );
};

// Composant Onglet Cash Flow (inchangé)
const CashFlowTab = ({ data, getCashFlowColor, formatMillions, formatPercent }) => {
    return React.createElement('div', { className: 'table-container' },
        [
            React.createElement('div', { 
                className: 'bg-gray-800 rounded-lg overflow-hidden shadow-xl',
                key: 'table'
            },
                [
                    // En-tête du tableau Cash Flow
                    React.createElement('div', { 
                        className: 'grid grid-cols-10 gap-4 p-4 bg-gray-700 font-semibold text-sm',
                        key: 'table-header'
                    },
                        ['Symbole', 'Entreprise', 'Secteur', 'Cash Flow Op.', 'Free Cash Flow', 'Revenus', 'Net Income', 'Marge FCF', 'Yield FCF', 'Score'].map(header =>
                            React.createElement('div', { 
                                key: header,
                                className: 'tooltip',
                                'data-tooltip': header === 'Marge FCF' ? 'Free Cash Flow / Revenus' : 
                                               header === 'Yield FCF' ? 'Free Cash Flow / Market Cap' : ''
                            }, header)
                        )
                    ),
                    
                    // Corps du tableau Cash Flow
                    ...data.map((item, index) =>
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
                                }, `${(Number(item.fcf_margin) * 100).toFixed(1)}%`),
                               React.createElement('div', { 
                                    className: getCashFlowColor(item.fcf_yield, 'yield'),
                                    key: 'fcf-yield'
                                }, `${(Number(item.fcf_yield) * 100).toFixed(1)}%`), 
                                React.createElement('div', { 
                                    className: `px-3 py-2 rounded-full text-xs font-bold text-center text-white ${
                                        item.fcf_yield > 0.06 ? 'bg-gradient-purple' : 'bg-gradient-teal'
                                    }`,
                                    key: 'rating'
                                }, item.fcf_yield > 0.06 ? '💰 EXCELLENT' : '💸 BON')
                            ]
                        )
                    )
                ]
            ),

            // Compteur Cash Flow
            React.createElement('div', { 
                className: 'mt-4 text-gray-400 text-sm',
                key: 'counter'
            }, 
                `💰 ${data.length} entreprise(s) avec un cash flow positif trouvée(s)`
            )
        ]
    );
};

// Composant Onglet Value Trap Detector
const ValueTrapTab = ({ data, getValueGradeColor, getValueScoreColor }) => {
    return React.createElement('div', { className: 'table-container' },
        [
            // Avertissement Value Trap
            React.createElement('div', { 
                className: 'warning-trap p-4 rounded-lg mb-6',
                key: 'warning'
            },
                [
                    React.createElement('h3', { 
                        className: 'font-bold mb-2',
                        key: 'warning-title'
                    }, '⚠️ Attention aux Value Traps !'),
                    React.createElement('p', { 
                        className: 'text-sm',
                        key: 'warning-text'
                    }, 'Une action peut sember "bon marché" (faible P/E, P/B) mais cacher des problèmes structurels. Vérifiez toujours la rentabilité (ROE, ROIC) !')
                ]
            ),

            // Tableau Value Trap
            React.createElement('div', { 
                className: 'bg-gray-800 rounded-lg overflow-hidden shadow-xl',
                key: 'table'
            },
                [
                    // En-tête du tableau Value Trap
                    React.createElement('div', { 
                        className: 'grid grid-cols-12 gap-2 p-4 bg-gray-700 font-semibold text-xs',
                        key: 'table-header'
                    },
                        ['Symbole', 'Entreprise', 'Secteur', 'P/E', 'P/B', 'P/FCF', 'EV/EBITDA', 'ROE', 'ROIC', 'Graham', 'Score', 'Grade'].map(header =>
                            React.createElement('div', { 
                                key: header,
                                className: 'tooltip',
                                'data-tooltip': 
                                    header === 'Graham' ? 'Multiple de Graham (P/E × P/B)' :
                                    header === 'Score' ? 'Score Value (ROE/P/E + marge sécurité)' :
                                    header === 'Grade' ? 'Classification risque/valeur' : ''
                            }, header)
                        )
                    ),
                    
                    // Corps du tableau Value Trap
                    ...data.map((item, index) =>
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
            ),

            // Compteur Value Trap
            React.createElement('div', { 
                className: 'mt-4 text-gray-400 text-sm',
                key: 'counter'
            }, 
                `🎯 ${data.length} entreprise(s) analysée(s) pour détecter les value traps`
            ),

            // Légende Value Trap
            React.createElement('div', { 
                className: 'mt-4 p-4 bg-gray-800 rounded-lg text-sm',
                key: 'legend'
            },
                [
                    React.createElement('h3', { 
                        className: 'font-bold mb-2',
                        key: 'legend-title'
                    }, '📋 Légende Value Trap:'),
                    React.createElement('div', { 
                        className: 'grid grid-cols-2 gap-2 text-xs',
                        key: 'legend-content'
                    },
                        [
                            React.createElement('div', { key: 'elite' }, 
                                '• ⭐ ELITE_VALUE: P/E < 8, P/B < 1, ROE > 15%'),
                            React.createElement('div', { key: 'solid' }, 
                                '• ✅ SOLID_VALUE: P/E < 12, P/B < 1.5, ROE > 12%'),
                            React.createElement('div', { key: 'trap' }, 
                                '• ⚠️ VALUE_TRAP: P/E < 6, P/B < 0.8, ROE < 8%'),
                            React.createElement('div', { key: 'deep' }, 
                                '• 🎯 DEEP_VALUE: P/E < P/B × 10'),
                            React.createElement('div', { key: 'potential' }, 
                                '• 📊 POTENTIAL_VALUE: P/E < 15, P/B < 2, ROE > 8%'),
                            React.createElement('div', { key: 'speculative' }, 
                                '• 🚫 SPECULATIVE: Autres cas')
                        ]
                    )
                ]
            )
        ]
    );
};
// Composant Onglet Short Risk Detector
const ShortRiskTab = ({ data, getShortSignalColor, getRiskScoreColor, getMetricColor, formatMillions }) => {
    return React.createElement('div', { className: 'table-container' },
        [
            // Avertissement important
            React.createElement('div', { 
                className: 'alert-warning p-4 rounded-lg mb-6',
                key: 'warning'
            },
                [
                    React.createElement('h3', { 
                        className: 'font-bold mb-2',
                        key: 'warning-title'
                    }, '⚠️ MISE EN GARDE IMPORTANTE'),
                    React.createElement('p', { 
                        className: 'text-sm mb-2',
                        key: 'warning-text-1'
                    }, 'Ces entreprises présentent des risques MAIS :'),
                    React.createElement('ul', { 
                        className: 'text-sm list-disc list-inside space-y-1',
                        key: 'warning-list'
                    },
                        [
                            'Certaines peuvent être des turnarounds',
                            'Les banques ont souvent des D/E élevés par nature',
                            'Certaines situations peuvent être temporaires',
                            'Ne pas short seller sans analyse fondamentale approfondie !'
                        ].map((item, index) => 
                            React.createElement('li', { key: index }, item)
                        )
                    )
                ]
            ),

            // Tableau Short Risk
            React.createElement('div', { 
                className: 'bg-gray-800 rounded-lg overflow-hidden shadow-xl',
                key: 'table'
            },
                [
                    // En-tête du tableau Short Risk
                    React.createElement('div', { 
                        className: 'grid grid-cols-11 gap-2 p-4 bg-gray-700 font-semibold text-xs',
                        key: 'table-header'
                    },
                        ['Symbole', 'Entreprise', 'Secteur', 'Dette/Equity', 'Coverage Int.', 'Current Ratio', 'Net Income', 'Cash Flow Op.', 'Revenus', 'Score Risque', 'Signal'].map(header =>
                            React.createElement('div', { 
                                key: header,
                                className: 'tooltip',
                                'data-tooltip': 
                                    header === 'Coverage Int.' ? 'Intérêt Coverage (EBIT / Charges intérêts)' :
                                    header === 'Current Ratio' ? 'Liquidité courante (Actif court terme / Passif court terme)' :
                                    header === 'Score Risque' ? 'Score de risque composite (0-15+)' : ''
                            }, header)
                        )
                    ),
                    
                    // Corps du tableau Short Risk
                    ...data.map((item, index) =>
                        React.createElement('div', {
                            key: item.symbole + index,
                            className: 'grid grid-cols-11 gap-2 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors text-sm'
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
                                    className: item.debt_to_equity > 3 ? 'text-red-400 font-bold' : 
                                               item.debt_to_equity > 2 ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold',
                                    key: 'debt'
                                }, `${Number(item.debt_to_equity).toFixed(2)}x`),
                                React.createElement('div', { 
                                    className: item.interest_coverage < 1 ? 'text-red-400 font-bold' : 
                                              item.interest_coverage < 1.5 ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold',
                                    key: 'interest'
                                }, `${Number(item.interest_coverage).toFixed(2)}`),  // ← Formaté + couleurs unifiées
                                React.createElement('div', { 
                                    className: item.current_ratio < 0.8 ? 'text-red-400 font-bold' : 
                                              item.current_ratio < 1 ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold',
                                    key: 'current'
                                }, `${Number(item.current_ratio).toFixed(2)}`),  // ← Formaté + couleurs unifiées
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
                                }, item.risk_score),  // ← Couleurs unifiées
                                React.createElement('div', { 
                                    className: `px-3 py-2 rounded-full text-xs font-bold text-center text-white ${getShortSignalColor(item.short_signal)}`,
                                    key: 'signal'
                                }, item.short_signal)
                            ]
                        )
                    )
                ]
            ),

            // Compteur Short Risk
            React.createElement('div', { 
                className: 'mt-4 text-gray-400 text-sm',
                key: 'counter'
            }, 
                `🚨 ${data.length} entreprise(s) à risque détectée(s)`
            ),

            // Légende Short Risk
            React.createElement('div', { 
                className: 'mt-4 p-4 bg-gray-800 rounded-lg text-sm',
                key: 'legend'
            },
                [
                    React.createElement('h3', { 
                        className: 'font-bold mb-2',
                        key: 'legend-title'
                    }, '📋 Légende Risques:'),
                    React.createElement('div', { 
                        className: 'grid grid-cols-2 gap-2 text-xs',
                        key: 'legend-content'
                    },
                        [
                            React.createElement('div', { key: 'dangerous-debt' }, 
                                '• DANGEROUS_DEBT: D/E > 4 (ou > 8 pour banques)'),
                            React.createElement('div', { key: 'interest-crisis' }, 
                                '• INTEREST_CRISIS: Coverage intérêt < 1'),
                            React.createElement('div', { key: 'liquidity' }, 
                                '• LIQUIDITY_PROBLEM: Current ratio < 0.8'),
                            React.createElement('div', { key: 'cash-burn' }, 
                                '• BURNING_CASH: Net income & cash flow négatifs'),
                            React.createElement('div', { key: 'double-trouble' }, 
                                '• DOUBLE_TROUBLE: D/E > 2 ET coverage < 2'),
                            React.createElement('div', { key: 'micro-cap' }, 
                                '• MICRO_CAP_DISTRESS: Perte + petit chiffre affaires'),
                            React.createElement('div', { key: 'score-critical' }, 
                                '• Score 8-15: Risque critique'),
                            React.createElement('div', { key: 'score-high' }, 
                                '• Score 5-7: Risque élevé')
                        ]
                    )
                ]
            )
        ]
    );
};

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(InvestmentApp));
