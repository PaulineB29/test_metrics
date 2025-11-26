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

// Données mockées VALUE TRAP DETECTOR
const mockValueTrapData = [
    {
        symbole: "INTC",
        nom: "Intel Corporation",
        secteur: "Semi-conducteurs",
        pe_ratio: 7.2,
        pb_ratio: 0.9,
        price_to_fcf: 8.5,
        evToEbitda: 5.8,
        roe: 6.8,
        roic: 5.2,
        graham_multiple: 12.1,
        value_grade: "⚠️ VALUE_TRAP",
        value_score: 8.9
    },
    {
        symbole: "T",
        nom: "AT&T Inc.",
        secteur: "Télécommunications",
        pe_ratio: 5.8,
        pb_ratio: 0.7,
        price_to_fcf: 6.2,
        evToEbitda: 6.1,
        roe: 12.5,
        roic: 8.9,
        graham_multiple: 9.6,
        value_grade: "✅ SOLID_VALUE",
        value_score: 24.1
    },
    {
        symbole: "F",
        nom: "Ford Motor Company",
        secteur: "Automobile",
        pe_ratio: 6.5,
        pb_ratio: 0.8,
        price_to_fcf: 7.8,
        evToEbitda: 7.2,
        roe: 18.2,
        roic: 14.5,
        graham_multiple: 10.8,
        value_grade: "⭐ ELITE_VALUE",
        value_score: 35.2
    },
    {
        symbole: "IBM",
        nom: "International Business Machines",
        secteur: "Technologie",
        pe_ratio: 11.8,
        pb_ratio: 4.2,
        price_to_fcf: 14.5,
        evToEbitda: 12.3,
        roe: 7.2,
        roic: 6.1,
        graham_multiple: 22.4,
        value_grade: "🚫 SPECULATIVE",
        value_score: 1.5
    },
    {
        symbole: "KO",
        nom: "Coca-Cola Company",
        secteur: "Boissons",
        pe_ratio: 22.5,
        pb_ratio: 9.8,
        price_to_fcf: 25.2,
        evToEbitda: 18.7,
        roe: 42.1,
        roic: 15.8,
        graham_multiple: 44.2,
        value_grade: "🚫 SPECULATIVE",
        value_score: 19.2
    },
    {
        symbole: "XOM",
        nom: "Exxon Mobil Corporation",
        secteur: "Énergie",
        pe_ratio: 9.2,
        pb_ratio: 1.8,
        price_to_fcf: 8.9,
        evToEbitda: 5.2,
        roe: 22.8,
        roic: 18.5,
        graham_multiple: 19.3,
        value_grade: "📊 POTENTIAL_VALUE",
        value_score: 14.1
    },
    {
        symbole: "M",
        nom: "Macy's Inc.",
        secteur: "Distribution",
        pe_ratio: 4.8,
        pb_ratio: 0.6,
        price_to_fcf: 5.2,
        evToEbitda: 3.8,
        roe: 28.5,
        roic: 12.8,
        graham_multiple: 8.1,
        value_grade: "🎯 DEEP_VALUE",
        value_score: 47.8
    }
];
// NOUVELLES données mockées SHORT RISK DETECTOR
const mockShortRiskData = [
    {
        symbole: "BBBY",
        nom: "Bed Bath & Beyond Inc.",
        secteur: "Distribution",
        debt_to_equity: 5.8,
        interest_coverage: 0.3,
        current_ratio: 0.6,
        net_income: -1250,
        operating_cash_flow: -890,
        revenue: 7450,
        short_signal: "🚨 DANGEROUS_DEBT",
        risk_score: 12
    },
    {
        symbole: "AMC",
        nom: "AMC Entertainment Holdings",
        secteur: "Divertissement",
        debt_to_equity: 6.2,
        interest_coverage: 0.8,
        current_ratio: 0.9,
        net_income: -975,
        operating_cash_flow: -450,
        revenue: 3850,
        short_signal: "🔥 INTEREST_CRISIS",
        risk_score: 10
    },
    {
        symbole: "WISH",
        nom: "ContextLogic Inc.",
        secteur: "E-commerce",
        debt_to_equity: 1.2,
        interest_coverage: 2.1,
        current_ratio: 0.7,
        net_income: -360,
        operating_cash_flow: -280,
        revenue: 890,
        short_signal: "💧 LIQUIDITY_PROBLEM",
        risk_score: 7
    },
    {
        symbole: "F",
        nom: "Ford Motor Company",
        secteur: "Automobile",
        debt_to_equity: 3.8,
        interest_coverage: 1.2,
        current_ratio: 1.1,
        net_income: -125,
        operating_cash_flow: 850,
        revenue: 158000,
        short_signal: "⚡ DOUBLE_TROUBLE",
        risk_score: 6
    },
    {
        symbole: "NOK",
        nom: "Nokia Corporation",
        secteur: "Technologie",
        debt_to_equity: 0.8,
        interest_coverage: 3.2,
        current_ratio: 1.4,
        net_income: -45,
        operating_cash_flow: -120,
        revenue: 26500,
        short_signal: "💰 BURNING_CASH",
        risk_score: 4
    },
    {
        symbole: "SNDL",
        nom: "Sundial Growers Inc.",
        secteur: "Cannabis",
        debt_to_equity: 0.3,
        interest_coverage: 4.1,
        current_ratio: 1.8,
        net_income: -15,
        operating_cash_flow: 8,
        revenue: 65,
        short_signal: "📉 MICRO_CAP_DISTRESS",
        risk_score: 2
    },
    {
        symbole: "JPM",
        nom: "JPMorgan Chase & Co.",
        secteur: "Financial Services",
        debt_to_equity: 9.2,
        interest_coverage: 1.8,
        current_ratio: 0.9,
        net_income: 38500,
        operating_cash_flow: 125000,
        revenue: 128000,
        short_signal: "👀 WATCH",
        risk_score: 1
    }
];

// Composant principal
const InvestmentApp = () => {
    const [activeTab, setActiveTab] = React.useState('buffett');
    const [buffettData, setBuffettData] = React.useState([]);
    const [cashFlowData, setCashFlowData] = React.useState([]);
    const [valueTrapData, setValueTrapData] = React.useState([]);
    const [shortRiskData, setShortRiskData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filter, setFilter] = React.useState('ALL');

    React.useEffect(() => {
        // Simuler le chargement des données
        const timer = setTimeout(() => {
            setBuffettData(mockBuffettData);
            setCashFlowData(mockCashFlowData);
            setValueTrapData(mockValueTrapData);
            setShortRiskData(mockShortRiskData);
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

    // Filtrage pour Value Trap (par défaut tous)
    const filteredValueTrapData = valueTrapData;

    // Filtrage pour Short Risk (par défaut tous)
    const filteredShortRiskData = shortRiskData;

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
        if (value < 0) {
            return `-$${Math.abs(value / 1000).toFixed(0)}B`;
        }
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
                        }, 'Scores Buffett, Cash Flow, Value Trap & Risk Detector - Pour traders amateurs'),
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
                            }, '💰 Momentum Cash Flow'),
                            React.createElement('button', {
                                key: 'valuetrap',
                                onClick: () => setActiveTab('valuetrap'),
                                className: `tab ${activeTab === 'valuetrap' ? 'active' : ''}`
                            }, '🎯 Value Trap Detector'),
                            React.createElement('button', {
                                key: 'shortrisk',
                                onClick: () => setActiveTab('shortrisk'),
                                className: `tab ${activeTab === 'shortrisk' ? 'active' : ''}`
                            }, '🚨 Short Risk Detector')
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


// Composant Onglet Buffett (inchangé)
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
            )
        ]
    );
};

// NOUVEAU Composant Onglet Value Trap Detector
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
                                }, item.pe_ratio),
                                React.createElement('div', { 
                                    className: item.pb_ratio < 1 ? 'text-green-400 font-bold' : 
                                              item.pb_ratio < 2 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                    key: 'pb'
                                }, item.pb_ratio),
                                React.createElement('div', { 
                                    className: item.price_to_fcf < 10 ? 'text-green-400 font-bold' : 
                                              item.price_to_fcf < 20 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                    key: 'p-fcf'
                                }, item.price_to_fcf),
                                React.createElement('div', { 
                                    className: item.evToEbitda < 8 ? 'text-green-400 font-bold' : 
                                              item.evToEbitda < 15 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                    key: 'ev-ebitda'
                                }, item.evToEbitda),
                                React.createElement('div', { 
                                    className: item.roe > 15 ? 'text-green-400 font-bold' : 
                                              item.roe > 8 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                    key: 'roe'
                                }, `${item.roe}%`),
                                React.createElement('div', { 
                                    className: item.roic > 12 ? 'text-green-400 font-bold' : 
                                              item.roic > 8 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                    key: 'roic'
                                }, `${item.roic}%`),
                                React.createElement('div', { 
                                    className: item.graham_multiple < 15 ? 'text-green-400 font-bold' : 
                                              item.graham_multiple < 22.5 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold',
                                    key: 'graham'
                                }, item.graham_multiple),
                                React.createElement('div', { 
                                    className: getValueScoreColor(item.value_score),
                                    key: 'score'
                                }, item.value_score),
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
// NOUVEAU Composant Onglet Short Risk Detector
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
                                    className: getMetricColor(item.debt_to_equity, 'debt_to_equity'),
                                    key: 'debt'
                                }, item.debt_to_equity),
                                React.createElement('div', { 
                                    className: getMetricColor(item.interest_coverage, 'interest_coverage'),
                                    key: 'interest'
                                }, item.interest_coverage),
                                React.createElement('div', { 
                                    className: getMetricColor(item.current_ratio, 'current_ratio'),
                                    key: 'current'
                                }, item.current_ratio),
                                React.createElement('div', { 
                                    className: getMetricColor(item.net_income, 'net_income'),
                                    key: 'net-income'
                                }, formatMillions(item.net_income)),
                                React.createElement('div', { 
                                    className: getMetricColor(item.operating_cash_flow, 'operating_cash_flow'),
                                    key: 'cash-flow'
                                }, formatMillions(item.operating_cash_flow)),
                                React.createElement('div', { 
                                    key: 'revenue'
                                }, formatMillions(item.revenue)),
                                React.createElement('div', { 
                                    className: getRiskScoreColor(item.risk_score),
                                    key: 'risk-score'
                                }, item.risk_score),
                                React.createElement('div', { 
                                    className: `px-2 py-1 rounded-full text-xs font-bold text-center text-white ${getShortSignalColor(item.short_signal)}`,
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

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(InvestmentApp));
