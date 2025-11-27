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

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    onItemsPerPageChange,
    totalItems 
}) => {
    // Calculs dérivés
    const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    // Génération des numéros de page à afficher (max 6 pages)
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 6;
        
        if (totalPages <= maxVisiblePages) {
            // Si moins de 6 pages, afficher toutes
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Logique pour afficher un sous-ensemble de pages
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            // Ajuster si on est proche du début
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
            // SECTION 1 : Barre de Pagination Principale
            React.createElement('div', {
                className: 'pagination-container',
                key: 'pagination-main'
            },
                [
                    // Partie Gauche - Sélecteur de lignes
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

                    // Partie Centre - Navigation de pages
                    React.createElement('div', {
                        className: 'pagination-center',
                        key: 'pagination-center'
                    },
                        [
                            // Bouton Première page
                            React.createElement('button', {
                                onClick: () => onPageChange(1),
                                disabled: currentPage === 1,
                                className: 'pagination-button',
                                key: 'first'
                            }, '««'),

                            // Bouton Page précédente
                            React.createElement('button', {
                                onClick: () => onPageChange(Math.max(1, currentPage - 1)),
                                disabled: currentPage === 1,
                                className: 'pagination-button',
                                key: 'prev'
                            }, '«'),

                            // Numéros de page
                            ...pageNumbers.map(page =>
                                React.createElement('button', {
                                    onClick: () => onPageChange(page),
                                    className: `pagination-page-button ${page === currentPage ? 'active' : ''}`,
                                    key: page
                                }, page)
                            ),

                            // Bouton Page suivante
                            React.createElement('button', {
                                onClick: () => onPageChange(Math.min(totalPages, currentPage + 1)),
                                disabled: currentPage === totalPages,
                                className: 'pagination-button',
                                key: 'next'
                            }, '»'),

                            // Bouton Dernière page
                            React.createElement('button', {
                                onClick: () => onPageChange(totalPages),
                                disabled: currentPage === totalPages,
                                className: 'pagination-button',
                                key: 'last'
                            }, '»»')
                        ]
                    ),

                    // Partie Droite - Indicateur de page
                    React.createElement('div', {
                        className: 'pagination-right',
                        key: 'pagination-right'
                    }, `Page ${currentPage} sur ${totalPages}`)
                ]
            ),

            // SECTION 2 : Barre d'Information (Footer)
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
                      className: `pillar-title ${
                        item.title.includes('ROE') ? 'text-green-400' :
                        item.title.includes('ROIC') ? 'text-blue-400' :
                        item.title.includes('Dette') ? 'text-purple-400' :
                        'text-orange-400'
                      }`,
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
                className: 'rating-table',
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
                      className: 'usage-title',
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
                      className: 'warning-title text-orange-400',
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
                      className: 'warning-title text-blue-400',
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
            // Carte explicative
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
                        }, 'L\'Héritage de Warren Buffett'),
                        
                        React.createElement('p', {
                          className: 'text-gray-300 leading-relaxed text-sm',
                          key: 'card-text'
                        }, desc.sections[0].content)
                      ]
                    )
                  ]
                ),
             // Bouton
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
      
      // SECTION DÉROULANTE CORRIGÉE (sans duplication de titre)
      isExpanded && React.createElement('div', {
        className: 'expandable-section p-6 space-y-6 mt-4',
        key: 'methodology-content'
      },
        desc.sections.slice(1).map((section, index) =>
          React.createElement('div', {
            key: `section-${index + 1}`,
            className: 'mb-8 last:mb-0'
          },
            // ⚠️ Appel direct sans afficher le titre ici
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
    onItemsPerPageChange
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
    
    return React.createElement('div', {},
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
                                    }, 'Filtrer par scrore'),
                                    
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
                onPageChange: setCurrentPage,
                itemsPerPage: itemsPerPage,
                onItemsPerPageChange: setItemsPerPage,
                totalItems: filteredData.length
            }),
          )
        ]
    );
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
    totalItems 
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
                    filt === 'ALL' ? '📋 Tous scores' : 
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
                onPageChange: setCurrentPage,
                itemsPerPage: itemsPerPage,
                onItemsPerPageChange: setItemsPerPage,
                totalItems: filteredData.length
            }),
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
    totalItems 
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
              onPageChange: setCurrentPage,
              itemsPerPage: itemsPerPage,
              onItemsPerPageChange: setItemsPerPage,
              totalItems: filteredData.length
            }),
          ]
      )
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
    totalItems 
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
                onPageChange: setCurrentPage,
                itemsPerPage: itemsPerPage,
                onItemsPerPageChange: setItemsPerPage,
                totalItems: filteredData.length
            }),

                ]
            )
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
                            }, `Short Risk (${shortRiskData.length})`)
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
                  getSortedAndFilteredData: getSortedAndFilteredData,
                  getPaginatedData: getPaginatedData,
                  currentPage: currentPage,
                  totalPages: totalPages,
                  onPageChange: setCurrentPage,
                  itemsPerPage: itemsPerPage,
                  onItemsPerPageChange: setItemsPerPage
                  totalItems: filteredBuffettData.length
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
                  totalItems: filteredBuffettData.length
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
                  totalItems: filteredBuffettData.length
              })
            ]
        )
    );
};

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(InvestmentApp));
