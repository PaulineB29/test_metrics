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

// Composant Pagination réutilisable
const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
    const pages = [];
    const maxVisiblePages = 4;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    
    return React.createElement('div', {
        className: 'flex flex-col md:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gray-800 rounded-lg'
    },
        [
            // Sélecteur d'items par page
            React.createElement('div', {
                className: 'flex items-center gap-3',
                key: 'items-per-page'
            },
                [
                    React.createElement('span', {
                        className: 'text-gray-300 text-sm font-medium',
                        key: 'label'
                    }, 'Lignes par page:'),
                    
                    React.createElement('select', {
                        value: itemsPerPage,
                        onChange: (e) => onItemsPerPageChange(Number(e.target.value)),
                        className: 'bg-black text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none',
                        key: 'select'
                    },
                        [20, 50, 100, 200].map(value =>
                            React.createElement('option', {
                                value: value,
                                key: value,
                                className: 'bg-gray-800'
                            }, value)
                        )
                    )
                ]
            ),
            
            // Contrôles de pagination
            React.createElement('div', {
                className: 'flex items-center gap-2',
                key: 'pagination-controls'
            },
                [
                    // Bouton Première page
                    React.createElement('button', {
                        onClick: () => onPageChange(1),
                        disabled: currentPage === 1,
                        className: `px-3 py-2 rounded-lg font-medium transition-all ${currentPage === 1 
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                            : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600 hover:border-gray-500'}`,
                    key: 'first'
                    }, '⏮️'),
                    
                    // Bouton Précédent
                    React.createElement('button', {
                        onClick: () => onPageChange(currentPage - 1),
                        disabled: currentPage === 1,
                        className: `px-3 py-2 rounded-lg font-medium transition-all ${currentPage === 1 
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                            : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600 hover:border-gray-500'}`,
                        key: 'prev'
                    }, '◀️'),
                    
                    // Numéros de page
                    ...pages.map(page =>
                        React.createElement('button', {
                            onClick: () => onPageChange(page),
                        className: `px-3 py-2 rounded-lg font-medium transition-all ${currentPage === 1 
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                            : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600 hover:border-gray-500'}`,
                            key: page
                        }, page)
                    ),
                    
                    // Bouton Suivant
                    React.createElement('button', {
                        onClick: () => onPageChange(currentPage + 1),
                        disabled: currentPage === totalPages,
                        className: `px-3 py-2 rounded-lg font-medium transition-all ${currentPage === 1 
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                            : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600 hover:border-gray-500'}`,
                        key: 'next'
                    }, '▶️'),
                    
                    // Bouton Dernière page
                    React.createElement('button', {
                        onClick: () => onPageChange(totalPages),
                        disabled: currentPage === totalPages,
                        className: `px-3 py-2 rounded-lg font-medium transition-all ${currentPage === 1 
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                            : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600 hover:border-gray-500'}`,
                        key: 'last'
                    }, '⏭️')
                ]
            ),
            
            // Informations de pagination
            React.createElement('div', {
                className: 'text-gray-300 text-sm font-medium',
                key: 'page-info'
            }, `Page ${currentPage} sur ${totalPages}`)
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
                  }, 
                    item.title.includes('ROE') ? '📊' :
                    item.title.includes('ROIC') ? '⚙️' :
                    item.title.includes('Dette') ? '🏛️' :
                    item.title.includes('Marge') ? '💰' : '📈'
                  ),
                  
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
          key: 'comparison'
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
          key: 'usage'
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
          key: 'warnings'
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
          key: 'quote'
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
          key: 'final-note'
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

  // Rendu principal avec un seul bouton
  return React.createElement('div', { 
    className: 'bg-gray-800 rounded-lg p-6 mb-8 border-l-4 border-blue-500'
  },
    [
      // Titre principal (toujours visible)
      React.createElement('h2', { 
        className: 'text-2xl font-bold mb-6 text-white text-center',
        key: 'main-title'
      }, desc.title),
      
      // Première section (toujours visible)
      React.createElement('div', { 
        className: 'mb-6',
        key: 'first-section'
      },
        [
          desc.sections[0].title && React.createElement('h3', { 
            className: 'text-lg font-bold mb-3 text-white',
            key: 'title'
          }, desc.sections[0].title),
          
          React.createElement('p', {
            className: 'text-gray-300 leading-relaxed',
            key: 'content'
          }, desc.sections[0].content)
        ]
      ),

      // Bouton "Détail de la méthodologie"
      React.createElement('div', {
        className: 'mb-4',
        key: 'toggle-button'
      },
        React.createElement('button', {
          onClick: toggleExpanded,
          className: 'w-full text-left p-4 rounded-lg bg-gray-750 hover:bg-gray-700 transition-all flex justify-between items-center',
          key: 'header'
        },
          [
            React.createElement('span', {
              className: 'font-bold text-white text-lg',
              key: 'button-text'
            }, '📋 Détail de la méthodologie'),
            
            React.createElement('span', {
              className: 'text-xl',
              key: 'arrow'
            }, isExpanded ? '▼' : '▶')
          ]
        )
      ),
      
      // Contenu déroulant de la méthodologie
      isExpanded && React.createElement('div', {
        className: 'mt-2 p-4 bg-gray-800 rounded-lg space-y-6',
        key: 'methodology-content'
      },
        // Afficher toutes les sections sauf la première (déjà affichée)
        desc.sections.slice(1).map((section, index) =>
          React.createElement('div', {
            key: `section-${index + 1}`,
            className: 'mb-6'
          },
            [
              section.title && React.createElement('h3', { 
                className: 'text-lg font-bold mb-3 text-white',
                key: 'title'
              }, section.title),
              
              renderSectionContent(section)
            ]
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
    onItemsPerPageChange 
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
    
    return React.createElement('div', {},
        [
            // Barre de recherche globale
            React.createElement(GlobalSearchBar, {
                key: 'search-bar',
                searchTerm: searchTerm,
                onSearch: onSearch,
                dataCount: filteredData.length
            }),
          
            // 🔥 FILTRES QUALITÉ Buffett
            React.createElement('div', { 
                className: 'flex gap-2 mb-4 flex-wrap',
                key: 'quality-filters' 
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
                    filt === 'ALL' ? '📋 Toutes qualités' : 
                    filt === 'ELITE' ? '⭐ ELITE' :
                    filt === 'STRONG' ? '✅ STRONG' :
                    filt === 'DECENT' ? '🟡 DECENT' : '🔴 WEAK')
                )
            ),

            // 🔥 FILTRES SECTEUR
            React.createElement('div', { 
                className: 'flex gap-2 mb-6 flex-wrap',
                key: 'sector-filters' 
            },
                SECTORS.map(sector =>
                    React.createElement('button', {
                        key: sector,
                        onClick: () => setSectorFilter(sector),
                        className: `px-4 py-2 rounded-lg transition-all ${
                            sectorFilter === sector 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`
                    }, sector)
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
                onItemsPerPageChange: onItemsPerPageChange
            }),

            // COMPTEUR
            React.createElement('div', { 
                className: 'mt-4 text-gray-400 text-sm',
                key: 'counter'
            }, 
                `📊 ${filteredData.length} entreprise(s) ${filter !== 'ALL' ? getBuffettFilterLabel(filter) : ''} ${sectorFilter !== 'Tous secteurs' ? `dans ${sectorFilter}` : ''} - Affichage ${Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} à ${Math.min(currentPage * itemsPerPage, filteredData.length)}`            )
        ]
    );
};

// Fonction pour les labels des filtres Buffett
const getBuffettFilterLabel = (filter) => {
    const labels = {
        'ELITE': 'de qualité elite',
        'STRONG': 'de qualité strong', 
        'DECENT': 'de qualité décente',
        'WEAK': 'de qualité faible'
    };
    return labels[filter] || '';
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
    getSortedAndFilteredData,
    getPaginatedData,
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange
}) => {
    const [filter, setFilter] = useState('ALL');
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

    const sortedAndFilteredData = getSortedAndFilteredData(data);
    
    const filteredData = sortedAndFilteredData.filter(item => {
        const qualityMatch = filter === 'ALL' || 
            (filter === 'EXCELLENT' && item.fcf_yield > 0.06) ||
            (filter === 'GOOD' && item.fcf_yield > 0.03 && item.fcf_yield <= 0.06) ||
            (filter === 'WEAK' && item.fcf_yield <= 0.03);
        
        const sectorMatch = sectorFilter === 'Tous secteurs' || 
            (item.secteur && item.secteur === sectorFilter);
        
        return qualityMatch && sectorMatch;
    });
    
    const paginatedData = getPaginatedData(filteredData);
    
    return React.createElement('div', { className: 'table-container' },
        [
            // Barre de recherche globale (inchangée)
            React.createElement(GlobalSearchBar, {
                key: 'search-bar',
                searchTerm: searchTerm,
                onSearch: onSearch,
                dataCount: filteredData.length
            }),

            // 🔥 FILTRES QUALITÉ Cash Flow
            React.createElement('div', { 
                className: 'flex gap-2 mb-4 flex-wrap',
                key: 'quality-filters' 
            },
                ['ALL', 'EXCELLENT', 'GOOD', 'WEAK'].map(filt =>
                    React.createElement('button', {
                        key: filt,
                        onClick: () => setFilter(filt),
                        className: `px-4 py-2 rounded-lg transition-all ${
                            filter === filt 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`
                    }, 
                    filt === 'ALL' ? '📋 Toutes qualités' : 
                    filt === 'EXCELLENT' ? '💰 EXCELLENT' :
                    filt === 'GOOD' ? '💸 BON' : '🔴 FAIBLE')
                )
            ),

            // 🔥 FILTRES SECTEUR Cash Flow
            React.createElement('div', { 
                className: 'flex gap-2 mb-6 flex-wrap',
                key: 'sector-filters' 
            },
                SECTORS.map(sector =>
                    React.createElement('button', {
                        key: sector,
                        onClick: () => setSectorFilter(sector),
                        className: `px-4 py-2 rounded-lg transition-all ${
                            sectorFilter === sector 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`
                    }, sector)
                )
            ),
          
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
                                key: 'score',
                                className: 'tooltip',
                                'data-tooltip': 'Score basé sur le yield FCF'
                            }, 'Score')
                        ]
                    ),
                    
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

            // AJOUT PAGINATION
            React.createElement(Pagination, {
                key: 'pagination',
                currentPage: currentPage,
                totalPages: totalPages,
                onPageChange: onPageChange,
                itemsPerPage: itemsPerPage,
                onItemsPerPageChange: onItemsPerPageChange
            }),

            // 🔥 MODIFICATION du compteur
            React.createElement('div', { 
                className: 'mt-4 text-gray-400 text-sm',
                key: 'counter'
            }, 
                `💰 ${filteredData.length} entreprise(s) ${filter !== 'ALL' ? getCashFlowFilterLabel(filter) : 'avec un cash flow positif'} ${sectorFilter !== 'Tous secteurs' ? `dans ${sectorFilter}` : ''} - Affichage ${Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} à ${Math.min(currentPage * itemsPerPage, filteredData.length)}`
            )
        ]
    );
};

      // Fonction utilitaire pour les labels des filtres Cash Flow
      const getCashFlowFilterLabel = (filter) => {
          const labels = {
              'EXCELLENT': 'avec un cash flow excellent',
              'GOOD': 'avec un bon cash flow', 
              'WEAK': 'avec un cash flow faible'
          };
          return labels[filter] || '';
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
    getSortedAndFilteredData,
    getPaginatedData,
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange
}) => {
    const [filter, setFilter] = useState('ALL');
        const [sectorFilter, setSectorFilter] = useState('Tous secteurs'); // 🔥 AJOUT
    
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
  
    const sortedAndFilteredData = getSortedAndFilteredData(data);
    
    // 🔥 MODIFICATION : Ajout du filtre secteur
    const filteredData = sortedAndFilteredData.filter(item => {
        const qualityMatch = filter === 'ALL' || 
            (item.value_grade && item.value_grade.includes(filter));
        
        const sectorMatch = sectorFilter === 'Tous secteurs' || 
            (item.secteur && item.secteur === sectorFilter);
        
        return qualityMatch && sectorMatch;
    });
    
    const paginatedData = getPaginatedData(filteredData);
    
    return React.createElement('div', { className: 'table-container' },
        [
            // Barre de recherche globale (inchangée)
            // Avertissement Value Trap (inchangé)

            // 🔥 FILTRES QUALITÉ Value Trap
            React.createElement('div', { 
                className: 'flex gap-2 mb-4 flex-wrap',
                key: 'quality-filters' 
            },
                ['ALL', 'ELITE_VALUE', 'SOLID_VALUE', 'VALUE_TRAP', 'DEEP_VALUE', 'POTENTIAL'].map(filt =>
                    React.createElement('button', {
                        key: filt,
                        onClick: () => setFilter(filt),
                        className: `px-4 py-2 rounded-lg transition-all ${
                            filter === filt 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`
                    }, 
                    filt === 'ALL' ? '📋 Tous types' : 
                    filt === 'ELITE_VALUE' ? '⭐ ELITE' :
                    filt === 'SOLID_VALUE' ? '✅ SOLIDE' :
                    filt === 'VALUE_TRAP' ? '⚠️ PIÈGE' :
                    filt === 'DEEP_VALUE' ? '🎯 PROFOND' : '📊 POTENTIEL')
                )
            ),

            // 🔥 FILTRES SECTEUR Value Trap
            React.createElement('div', { 
                className: 'flex gap-2 mb-6 flex-wrap',
                key: 'sector-filters' 
            },
                SECTORS.map(sector =>
                    React.createElement('button', {
                        key: sector,
                        onClick: () => setSectorFilter(sector),
                        className: `px-4 py-2 rounded-lg transition-all ${
                            sectorFilter === sector 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`
                    }, sector)
                )
            ),

            // Tableau Value Trap
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
                    
                    // 🔥 CORRECTION : utiliser paginatedData au lieu de sortedAndFilteredData
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
            ),

            // Pagination et compteur
            React.createElement(Pagination, {
                key: 'pagination',
                currentPage: currentPage,
                totalPages: totalPages,
                onPageChange: onPageChange,
                itemsPerPage: itemsPerPage,
                onItemsPerPageChange: onItemsPerPageChange
            }),

            React.createElement('div', { 
                className: 'mt-4 text-gray-400 text-sm',
                key: 'counter'
            }, 
                `🎯 ${filteredData.length} entreprise(s) ${filter !== 'ALL' ? getValueTrapFilterLabel(filter) : 'analysée(s)'} ${sectorFilter !== 'Tous secteurs' ? `dans ${sectorFilter}` : ''} - Affichage ${Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} à ${Math.min(currentPage * itemsPerPage, filteredData.length)}`
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

        // Fonction utilitaire pour les labels des filtres
        const getFilterLabel = (filter) => {
            const labels = {
                'ELITE_VALUE': 'de qualité elite',
                'SOLID_VALUE': 'de qualité solide', 
                'VALUE_TRAP': 'potentiels pièges',
                'DEEP_VALUE': 'de valeur profonde',
                'POTENTIAL': 'à potentiel'
            };
            return labels[filter] || '';
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
    getSortedAndFilteredData,
    getPaginatedData,
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange
}) => {
    const [filter, setFilter] = useState('ALL');
     const [sectorFilter, setSectorFilter] = useState('Tous secteurs'); // 🔥 AJOUT
    
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
  
    const sortedAndFilteredData = getSortedAndFilteredData(data);
    
    // 🔥 MODIFICATION : Ajout du filtre secteur
    const filteredData = sortedAndFilteredData.filter(item => {
        const qualityMatch = filter === 'ALL' || 
            (filter === 'CRITICAL' && item.risk_score >= 8) ||
            (filter === 'HIGH' && item.risk_score >= 5 && item.risk_score < 8) ||
            (filter === 'MEDIUM' && item.risk_score >= 3 && item.risk_score < 5) ||
            (filter === 'LOW' && item.risk_score < 3);
        
        const sectorMatch = sectorFilter === 'Tous secteurs' || 
            (item.secteur && item.secteur === sectorFilter);
        
        return qualityMatch && sectorMatch;
    });
    
    const paginatedData = getPaginatedData(filteredData);
    
    return React.createElement('div', { className: 'table-container' },
        [
            // Barre de recherche globale (inchangée)
            // Avertissement important (inchangé)

            // 🔥 FILTRES QUALITÉ Short Risk
            React.createElement('div', { 
                className: 'flex gap-2 mb-4 flex-wrap',
                key: 'quality-filters' 
            },
                ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(filt =>
                    React.createElement('button', {
                        key: filt,
                        onClick: () => setFilter(filt),
                        className: `px-4 py-2 rounded-lg transition-all ${
                            filter === filt 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`
                    }, 
                    filt === 'ALL' ? '📋 Tous risques' : 
                    filt === 'CRITICAL' ? '🚨 CRITIQUE' :
                    filt === 'HIGH' ? '🔴 ÉLEVÉ' :
                    filt === 'MEDIUM' ? '🟡 MOYEN' : '🟢 FAIBLE')
                )
            ),

            // 🔥 FILTRES SECTEUR Short Risk
            React.createElement('div', { 
                className: 'flex gap-2 mb-6 flex-wrap',
                key: 'sector-filters' 
            },
                SECTORS.map(sector =>
                    React.createElement('button', {
                        key: sector,
                        onClick: () => setSectorFilter(sector),
                        className: `px-4 py-2 rounded-lg transition-all ${
                            sectorFilter === sector 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`
                    }, sector)
                )
            ),

            // Tableau Short Risk
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
                                    className: `px-3 py-2 rounded-full text-xs font-bold text-center text-white ${getShortSignalColor(item.short_signal)}`,
                                    key: 'signal'
                                }, item.short_signal)
                            ]
                        )
                    )
                ]
            ),

            // Pagination et compteur
            React.createElement(Pagination, {
                key: 'pagination',
                currentPage: currentPage,
                totalPages: totalPages,
                onPageChange: onPageChange,
                itemsPerPage: itemsPerPage,
                onItemsPerPageChange: onItemsPerPageChange
            }),

            React.createElement('div', { 
                className: 'mt-4 text-gray-400 text-sm',
                key: 'counter'
            }, 
                `🚨 ${filteredData.length} entreprise(s) à risque ${filter !== 'ALL' ? getRiskFilterLabel(filter) : 'détectée(s)'} ${sectorFilter !== 'Tous secteurs' ? `dans ${sectorFilter}` : ''} - Affichage ${Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} à ${Math.min(currentPage * itemsPerPage, filteredData.length)}`            ),
                      // Légende Short Risk
            React.createElement('div', { 
                className: 'mt-4 p-4 bg-gray-800 rounded-lg text-sm',
                key: 'legend'
            },
                [
                    React.createElement('h3', { 
                        className: 'font-bold mb-2 text-white',
                        key: 'legend-title'
                    }, '📋 Légende Risques:'),
                    React.createElement('div', { 
                        className: 'grid grid-cols-2 gap-2 text-xs',
                        key: 'legend-content'
                    },
                        [
                            React.createElement('div', { key: 'dangerous-debt' }, 
                                '• 🚨 DANGEROUS_DEBT: D/E > 4 (ou > 8 pour banques)'),
                            React.createElement('div', { key: 'interest-crisis' }, 
                                '• 🔥 INTEREST_CRISIS: Coverage intérêt < 1'),
                            React.createElement('div', { key: 'liquidity' }, 
                                '• 💧 LIQUIDITY_PROBLEM: Current ratio < 0.8'),
                            React.createElement('div', { key: 'cash-burn' }, 
                                '• 💰 BURNING_CASH: Net income & cash flow négatifs'),
                            React.createElement('div', { key: 'double-trouble' }, 
                                '• ⚡ DOUBLE_TROUBLE: D/E > 2 ET coverage < 2'),
                            React.createElement('div', { key: 'micro-cap' }, 
                                '• 📉 MICRO_CAP_DISTRESS: Perte + petit chiffre affaires'),
                            React.createElement('div', { key: 'score-critical' }, 
                                '• 🔴 Score 8-15: Risque critique'),
                            React.createElement('div', { key: 'score-high' }, 
                                '• 🟡 Score 5-7: Risque élevé')
                        ]
                    )
                ]
            )
        ]
    );
};
        // Fonction utilitaire pour les labels des filtres de risque
        const getRiskFilterLabel = (filter) => {
            const labels = {
                'CRITICAL': 'critique',
                'HIGH': 'élevé', 
                'MEDIUM': 'moyen',
                'LOW': 'faible'
            };
            return labels[filter] || '';
        };

// COMPOSANT PRINCIPAL - InvestmentApp
const InvestmentApp = () => {
    const [activeTab, setActiveTab] = useState('buffett');
    const [buffettData, setBuffettData] = useState([]);
    const [cashFlowData, setCashFlowData] = useState([]);
    const [valueTrapData, setValueTrapData] = useState([]);
    const [shortRiskData, setShortRiskData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('ALL');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [globalSearch, setGlobalSearch] = useState('');
        
    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    // DONNÉES FILTRÉES
    const filteredBuffettData = filter === 'ALL' 
        ? buffettData 
        : buffettData.filter(item => item.buffett_rating && item.buffett_rating.includes(filter));

    const filteredCashFlowData = cashFlowData || [];
    const filteredValueTrapData = valueTrapData || [];
    const filteredShortRiskData = shortRiskData || [];

    // 🔥 CORRECTION : UNE SEULE DÉFINITION de getSortedAndFilteredData
    const getSortedAndFilteredData = (data) => {
        if (!data) return [];
        
        // Filtrage par recherche globale
        let filteredData = data;
        if (globalSearch) {
            const searchLower = globalSearch.toLowerCase();
            filteredData = data.filter(item => 
                Object.values(item).some(value => 
                    value && value.toString().toLowerCase().includes(searchLower)
                )
            );
        }
    
        // Tri
        if (sortConfig.key) {
            filteredData = [...filteredData].sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
    
                // Gestion des valeurs nulles/undefined
                if (aValue === null || aValue === undefined) aValue = '';
                if (bValue === null || bValue === undefined) bValue = '';
    
                // Conversion en nombre si possible
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
            default: dataLength = 0;
        }
        setTotalPages(Math.ceil(dataLength / itemsPerPage));
        
        // Revenir à la page 1 quand les données changent
        setCurrentPage(1);
    }, [filteredBuffettData, filteredCashFlowData, filteredValueTrapData, filteredShortRiskData, activeTab, itemsPerPage]);
   
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

    useEffect(() => {
        fetchAllData();
    }, []);

  


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
                          getValueColor: getValueColor,
                          sortConfig: sortConfig,
                          onSort: handleSort,
                          searchTerm: globalSearch,
                          onSearch: handleGlobalSearch,
                          getSortedAndFilteredData: getSortedAndFilteredData,
                          getPaginatedData: getPaginatedData,
                          currentPage: currentPage,
                          totalPages: totalPages,
                          onPageChange: setCurrentPage,
                          itemsPerPage: itemsPerPage,
                          onItemsPerPageChange: setItemsPerPage
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
                  getSortedAndFilteredData: getSortedAndFilteredData,
                  getPaginatedData: getPaginatedData,
                  currentPage: currentPage,
                  totalPages: totalPages,
                  onPageChange: setCurrentPage,
                  itemsPerPage: itemsPerPage,
                  onItemsPerPageChange: setItemsPerPage
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
                  getSortedAndFilteredData: getSortedAndFilteredData,
                  getPaginatedData: getPaginatedData,
                  currentPage: currentPage,
                  totalPages: totalPages,
                  onPageChange: setCurrentPage,
                  itemsPerPage: itemsPerPage,
                  onItemsPerPageChange: setItemsPerPage
              })
              : React.createElement(ShortRiskTab, {
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
                  getSortedAndFilteredData: getSortedAndFilteredData,
                  getPaginatedData: getPaginatedData,
                  currentPage: currentPage,
                  totalPages: totalPages,
                  onPageChange: setCurrentPage,
                  itemsPerPage: itemsPerPage,
                  onItemsPerPageChange: setItemsPerPage
              })
            ]
        )
    );
};

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(InvestmentApp));
