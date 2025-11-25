import React, { useState, useEffect } from 'https://esm.sh/react@18'
import ReactDOM from 'https://esm.sh/react-dom@18/client'

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
      
      // Appel à votre API backend
      const response = await fetch('http://localhost:3001/api/buffett-scores');
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

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

  if (error) {
    return React.createElement('div', { 
      className: 'min-h-screen bg-gray-900 flex items-center justify-center text-white' 
    },
      React.createElement('div', { className: 'text-center' },
        [
          React.createElement('h2', { 
            className: 'text-2xl mb-4 text-red-400',
            key: 'error-title'
          }, '❌ Erreur'),
          React.createElement('p', { 
            className: 'mb-4',
            key: 'error-message' 
          }, error),
          React.createElement('button', {
            key: 'retry-btn',
            onClick: fetchData,
            className: 'px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors'
          }, '🔄 Réessayer')
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
            }, 'Analyse des entreprises selon les critères Buffett - Pour traders amateurs')
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

        // Contenu principal
        loading ? 
          React.createElement('div', { 
            className: 'flex justify-center items-center p-12',
            key: 'loading'
          },
            React.createElement('div', { className: 'text-center' },
              [
                React.createElement('div', { 
                  className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4',
                  key: 'spinner'
                }),
                React.createElement('p', { key: 'text' }, 'Chargement des données Buffett...')
              ]
            )
          )
        : 
        React.createElement('div', { key: 'content' },
          [
            // Tableau
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
