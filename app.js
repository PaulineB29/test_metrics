// Données mockées SCORE BUFFETT
const mockBuffettData = [
    {
        symbole: "AAPL",
        nom: "Apple Inc.",
        secteur: "Technologie",
        roe: 25.8,
        roic: 22.1,
        debt_to_equity: 1.8,
        net_margin: 21.2,
        buffett_rating: "⭐ ELITE"
    },
    {
        symbole: "MSFT",
        nom: "Microsoft Corporation",
        secteur: "Technologie",
        roe: 18.9,
        roic: 15.3,
        debt_to_equity: 2.1,
        net_margin: 16.8,
        buffett_rating: "✅ STRONG"
    },
    {
        symbole: "GOOGL",
        nom: "Alphabet Inc.",
        secteur: "Technologie",
        roe: 12.4,
        roic: 10.2,
        debt_to_equity: 2.8,
        net_margin: 11.5,
        buffett_rating: "🟡 DECENT"
    },
    {
        symbole: "TSLA",
        nom: "Tesla Inc.",
        secteur: "Automobile",
        roe: 8.2,
        roic: 6.7,
        debt_to_equity: 4.2,
        net_margin: 7.1,
        buffett_rating: "🔴 WEAK"
    },
    {
        symbole: "JNJ",
        nom: "Johnson & Johnson",
        secteur: "Santé",
        roe: 22.5,
        roic: 18.7,
        debt_to_equity: 1.5,
        net_margin: 18.9,
        buffett_rating: "⭐ ELITE"
    },
    {
        symbole: "V",
        nom: "Visa Inc.",
        secteur: "Services Financiers",
        roe: 40.2,
        roic: 35.8,
        debt_to_equity: 0.8,
        net_margin: 51.3,
        buffett_rating: "⭐ ELITE"
    }
];

// Données mockées MOMENTUM CASH FLOW
const mockCashFlowData = [
    {
        symbole: "AAPL",
        nom: "Apple Inc.",
        secteur: "Technologie",
        operating_cash_flow: 110.543,
        free_cash_flow: 90.215,
        revenue: 383.285,
        net_income: 96.995,
        fcf_margin: 0.235,
        fcf_yield: 0.045
    },
    {
        symbole: "MSFT",
        nom: "Microsoft Corporation",
        secteur: "Technologie",
        operating_cash_flow: 87.582,
        free_cash_flow: 65.432,
        revenue: 198.270,
        net_income: 72.738,
        fcf_margin: 0.330,
        fcf_yield: 0.038
    },
    {
        symbole: "GOOGL",
        nom: "Alphabet Inc.",
        secteur: "Technologie",
        operating_cash_flow: 91.495,
        free_cash_flow: 69.128,
        revenue: 307.390,
        net_income: 76.033,
        fcf_margin: 0.225,
        fcf_yield: 0.042
    },
    {
        symbole: "JNJ",
        nom: "Johnson & Johnson",
        secteur: "Santé",
        operating_cash_flow: 23.456,
        free_cash_flow: 18.765,
        revenue: 94.943,
        net_income: 17.941,
        fcf_margin: 0.198,
        fcf_yield: 0.035
    },
    {
        symbole: "V",
        nom: "Visa Inc.",
        secteur: "Services Financiers",
        operating_cash_flow: 18.432,
        free_cash_flow: 15.678,
        revenue: 29.310,
        net_income: 15.301,
        fcf_margin: 0.535,
        fcf_yield: 0.052
    },
    {
        symbole: "NVDA",
        nom: "NVIDIA Corporation",
        secteur: "Technologie",
        operating_cash_flow: 15.432,
        free_cash_flow: 12.345,
        revenue: 26.974,
        net_income: 9.752,
        fcf_margin: 0.458,
        fcf_yield: 0.048
    }
];

// Composant principal
const InvestmentApp = () => {
    const [activeTab, setActiveTab] = React.useState('buffett');
    const [buffettData, setBuffettData] = React.useState([]);
    const [cashFlowData, setCashFlowData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filter, setFilter] = React.useState('ALL');

    React.useEffect(() => {
        // Simuler le chargement des données
        const timer = setTimeout(() => {
            setBuffettData(mockBuffettData);
            setCashFlowData(mockCashFlowData);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Filtrage pour Buffett
    const filteredBuffettData = filter === 'ALL' 
        ? buffettData 
        : buffettData.filter(item => item.buffett_rating.includes(filter));

    // Filtrage pour Cash Flow (par défaut tous)
    const filteredCashFlowData = cashFlowData;

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

    const formatMillions = (value) => {
        return `$${(value / 1000).toFixed(0)}B`;
    };

    const formatPercent = (value) => {
        return `${(value * 100).toFixed(1)}%`;
    };

    if (loading) {
        return React.createElement('div', { 
            className: 'min-h-screen bg-gray-900 flex items-center justify-center' 
        },
            React.createElement('div', { className: 'text-center' },
                [
                    React.createElement('div', { 
                        className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4',
                        key: 'spinner'
                    }),
                    React.createElement('p', { key: 'text' }, 'Chargement des données...')
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
                        }, '📊 Analyse Investissement Avancée'),
                        React.createElement('p', { 
                            className: 'text-gray-400 mb-6',
                            key: 'subtitle' 
                        }, 'Scores Buffett & Momentum Cash Flow - Pour traders amateurs'),
                        React.createElement('div', { 
                            className: 'bg-yellow-500 text-white p-3 rounded-lg mb-4',
                            key: 'demo-warning'
                        }, '⚠️ Mode Démo - Données simulées')
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
                            }, '📈 Score Buffett'),
                            React.createElement('button', {
                                key: 'cashflow',
                                onClick: () => setActiveTab('cashflow'),
                                className: `tab ${activeTab === 'cashflow' ? 'active' : ''}`
                            }, '💰 Momentum Cash Flow')
                        ]
                    )
                ),

                // Contenu des onglets
                activeTab === 'buffett' 
                    ? React.createElement(BuffettTab, {
                        key: 'buffett-tab',
                        data: filteredBuffettData,
                        filter: filter,
                        onFilterChange: setFilter,
                        getRatingColor: getBuffettRatingColor,
                        getValueColor: getValueColor
                    })
                    : React.createElement(CashFlowTab, {
                        key: 'cashflow-tab',
                        data: filteredCashFlowData,
                        getCashFlowColor: getCashFlowColor,
                        formatMillions: formatMillions,
                        formatPercent: formatPercent
                    })
            ]
        )
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
                                        }, `${item.roe}%`),
                                        React.createElement('div', { 
                                            className: getValueColor(item.roic, 12, 8),
                                            key: 'roic'
                                        }, `${item.roic}%`),
                                        React.createElement('div', { 
                                            className: item.debt_to_equity < 2 ? 'text-green-400 font-bold' : 
                                                      item.debt_to_equity < 3 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                            key: 'debt'
                                        }, `${item.debt_to_equity}x`),
                                        React.createElement('div', { 
                                            className: getValueColor(item.net_margin, 8, 5),
                                            key: 'margin'
                                        }, `${item.net_margin}%`),
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

// Composant Onglet Cash Flow
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

            // Compteur Cash Flow
            React.createElement('div', { 
                className: 'mt-4 text-gray-400 text-sm',
                key: 'counter'
            }, 
                `💰 ${data.length} entreprise(s) avec un cash flow positif trouvée(s)`
            ),

            // Légende Cash Flow
            React.createElement('div', { 
                className: 'mt-4 p-4 bg-gray-800 rounded-lg text-sm',
                key: 'legend'
            },
                [
                    React.createElement('h3', { 
                        className: 'font-bold mb-2',
                        key: 'legend-title'
                    }, '📋 Légende Cash Flow:'),
                    React.createElement('div', { 
                        className: 'grid grid-cols-2 gap-4 text-xs',
                        key: 'legend-content'
                    },
                        [
                            React.createElement('div', { key: 'margin' }, 
                                '• Marge FCF > 30%: 💚 Excellente'),
                            React.createElement('div', { key: 'yield' }, 
                                '• Yield FCF > 6%: 💜 Excellent'),
                            React.createElement('div', { key: 'margin-mid' }, 
                                '• Marge FCF 15-30%: 💛 Bonne'),
                            React.createElement('div', { key: 'yield-mid' }, 
                                '• Yield FCF 3-6%: 💙 Bon')
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
