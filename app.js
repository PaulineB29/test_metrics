const { useState, useEffect } = React;

const BuffettApp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Essayer plusieurs endpoints possibles
      const endpoints = [
        'http://localhost:3001/api/buffett-scores',
        '/api/buffett-scores',
        'http://localhost:3001/buffett-scores'
      ];
      
      let response;
      for (const endpoint of endpoints) {
        try {
          console.log(`Tentative de connexion à: ${endpoint}`);
          response = await fetch(endpoint);
          if (response.ok) break;
        } catch (e) {
          console.log(`Échec pour ${endpoint}:`, e.message);
        }
      }
      
      if (!response || !response.ok) {
        // Si aucune API ne répond, utiliser des données mockées
        console.log('Utilisation des données mockées');
        setData(getMockData());
        return;
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Erreur complète:', err);
      // En cas d'erreur, utiliser des données mockées
      setData(getMockData());
      setError("Mode démo - Données simulées (l'API n'est pas accessible)");
    } finally {
      setLoading(false);
    }
  };

  // Données mockées pour le développement
  const getMockData = () => [
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
    }
  ];

  const filteredData = filter === 'ALL' 
    ? data 
    : data.filter(item => item.buffett_rating.includes(filter));

  const getRatingColor = (rating) => {
    if (rating.includes('ELITE')) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    if (rating.includes('STRONG')) return 'bg-gradient-to-r from-green-400 to-emerald-600';
    if (rating.includes('DECENT')) return 'bg-gradient-to-r from-blue-400 to-cyan-600';
    return 'bg-gradient-to-r from-red-400 to-pink-600';
  };

  const getValueColor = (value, excellent, good) => {
    if (value >= excellent) return 'text-green-400 font-bold';
    if (value >= good) return 'text-yellow-400 font-bold';
    return 'text-red-400 font-bold';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📊 Score Buffett Ultra-Strict</h1>
          <p className="text-gray-400 mb-2">
            Analyse des entreprises selon les critères Buffett - Pour traders amateurs
          </p>
          {error && (
            <div className="bg-yellow-500 text-white p-3 rounded-lg mb-4">
              ⚠️ {error}
            </div>
          )}
        </div>
        
        {/* Filtres */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['ALL', 'ELITE', 'STRONG', 'DECENT', 'WEAK'].map(filt => (
            <button
              key={filt}
              onClick={() => setFilter(filt)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === filt 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filt === 'ALL' ? '📋 Toutes' : 
               filt === 'ELITE' ? '⭐ ELITE' :
               filt === 'STRONG' ? '✅ STRONG' :
               filt === 'DECENT' ? '🟡 DECENT' : '🔴 WEAK'}
            </button>
          ))}
        </div>

        {/* Contenu principal */}
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Chargement des données Buffett...</p>
            </div>
          </div>
        ) : (
          <div>
            {/* Tableau */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
              {/* En-tête du tableau */}
              <div className="grid grid-cols-8 gap-4 p-4 bg-gray-700 font-semibold text-sm">
                {['Symbole', 'Entreprise', 'Secteur', 'ROE', 'ROIC', 'D/E', 'Marge', 'Score'].map(header => (
                  <div key={header}>{header}</div>
                ))}
              </div>
              
              {/* Corps du tableau */}
              {filteredData.map((item, index) => (
                <div 
                  key={item.symbole + index}
                  className="grid grid-cols-8 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors text-sm"
                >
                  <div className="font-bold text-lg">{item.symbole}</div>
                  <div className="col-span-2 font-semibold">{item.nom}</div>
                  <div className="text-gray-300">{item.secteur}</div>
                  <div className={getValueColor(item.roe, 15, 10)}>
                    {item.roe}%
                  </div>
                  <div className={getValueColor(item.roic, 12, 8)}>
                    {item.roic}%
                  </div>
                  <div className={
                    item.debt_to_equity < 2 ? 'text-green-400 font-bold' : 
                    item.debt_to_equity < 3 ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold'
                  }>
                    {item.debt_to_equity}x
                  </div>
                  <div className={getValueColor(item.net_margin, 8, 5)}>
                    {item.net_margin}%
                  </div>
                  <div className={`px-3 py-2 rounded-full text-xs font-bold text-center text-white ${getRatingColor(item.buffett_rating)}`}>
                    {item.buffett_rating}
                  </div>
                </div>
              ))}
            </div>

            {/* Compteur */}
            <div className="mt-4 text-gray-400 text-sm">
              📊 {filteredData.length} entreprise(s) trouvée(s) {
                filter !== 'ALL' ? `(Filtre: ${filter})` : ''
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BuffettApp />);
