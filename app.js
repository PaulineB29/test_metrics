import React, { useState, useEffect } from 'https://esm.sh/react@18'
import ReactDOM from 'https://esm.sh/react-dom@18/client'

// URL de base de l'API
const API_BASE_URL = 'https://buffett-api.onrender.com/api';

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
