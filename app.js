// Données mockées complètes
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
    },
    {
        symbole: "WMT",
        nom: "Walmart Inc.",
        secteur: "Distribution",
        roe: 15.8,
        roic: 12.4,
        debt_to_equity: 2.2,
        net_margin: 2.1,
        buffett_rating: "✅ STRONG"
    },
    {
        symbole: "JPM",
        nom: "JPMorgan Chase & Co.",
        secteur: "Banque",
        roe: 16.2,
        roic: 8.7,
        debt_to_equity: 3.1,
        net_margin: 32.8,
        buffett_rating: "🟡 DECENT"
    }
];

// Composant React
const BuffettApp = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [filter, setFilter] = React.useState('ALL');

    React.useEffect(() => {
        // Simuler un chargement asynchrone
        const timer = setTimeout(() => {
            setData(mockBuffettData);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const filteredData = filter === 'ALL' 
        ? data 
        : data.filter(item => item.buffett_rating.includes(filter));

    const getRatingColor = (rating) => {
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
                    React.createElement('p', { key: 'text' }, 'Chargement des données Buffett...')
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
                        }, '📊 Score Buffett Ultra-Strict'),
                        React.createElement('p', { 
                            className: 'text-gray-400 mb-6',
                            key: 'subtitle' 
                        }, 'Analyse des entreprises selon les critères Buffett - Pour traders amateurs'),
                        React.createElement('div', { 
                            className: 'bg-yellow-500 text-white p-3 rounded-lg mb-4',
                            key: 'demo-warning'
                        }, '⚠️ Mode Démo - Données simulées')
                    ]
                ),
                
                // Filtres
                React.createElement('div', { 
                    className: 'flex gap-2 mb-6 flex-wrap',
                    key: 'filters' 
                },
                    ['ALL', 'ELITE', 'STRONG', 'DECENT', 'WEAK'].map(filt =>
                        React.createElement('button', {
                            key: filt,
                            onClick: () => setFilter(filt),
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

                // Tableau
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
                                ...filteredData.map((item, index) =>
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
                            `📊 ${filteredData.length} entreprise(s) trouvée(s) ${
                                filter !== 'ALL' ? `(Filtre: ${filter})` : ''
                            }`
                        )
                    ]
                )
            ]
        )
    );
};

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(BuffettApp));
