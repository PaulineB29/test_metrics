import React, { useState, useEffect } from 'https://esm.sh/react@18'
import ReactDOM from 'https://esm.sh/react-dom@18/client'

const BuffettApp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Remplacez par l'URL de votre API réelle
      const response = await fetch('http://localhost:3001/api/buffett-scores');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = filter === 'ALL' 
    ? data 
    : data.filter(item => item.buffett_rating.includes(filter));

  const getRatingColor = (rating) => {
    if (rating.includes('ELITE')) return 'bg-yellow-500';
    if (rating.includes('STRONG')) return 'bg-green-500';
    if (rating.includes('DECENT')) return 'bg-blue-500';
    return 'bg-red-500';
  };

  if (loading) {
    return React.createElement('div', { className: 'flex justify-center p-8' }, 'Chargement...');
  }

  return React.createElement('div', { className: 'min-h-screen bg-gray-900 text-white p-4' },
    React.createElement('div', { className: 'max-w-7xl mx-auto' },
      [
        React.createElement('h1', { className: 'text-3xl font-bold mb-2', key: 'title' }, '📊 Score Buffett Ultra-Strict'),
        React.createElement('p', { className: 'text-gray-400 mb-6', key: 'subtitle' }, 'Analyse des entreprises selon les critères Buffett'),
        
        // Filtres
        React.createElement('div', { className: 'flex gap-2 mb-6 flex-wrap', key: 'filters' },
          ['ALL', 'ELITE', 'STRONG', 'DECENT', 'WEAK'].map(filt =>
            React.createElement('button', {
              key: filt,
              onClick: () => setFilter(filt),
              className: `px-4 py-2 rounded-lg transition-all ${
                filter === filt ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`
            }, filt === 'ALL' ? 'Toutes' : filt)
          )
        ),

        // Tableau
        React.createElement('div', { className: 'bg-gray-800 rounded-lg overflow-hidden', key: 'table' },
          [
            React.createElement('div', { className: 'grid grid-cols-8 gap-4 p-4 bg-gray-700 font-semibold', key: 'header' },
              ['Symbole', 'Entreprise', 'Secteur', 'ROE', 'ROIC', 'Dette/Equity', 'Marge Nette', 'Score'].map(header =>
                React.createElement('div', { key: header }, header)
              )
            ),
            
            ...filteredData.map((item, index) =>
              React.createElement('div', {
                key: index,
                className: 'grid grid-cols-8 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors'
              },
                [
                  React.createElement('div', { className: 'font-bold', key: 'symbole' }, item.symbole),
                  React.createElement('div', { className: 'col-span-2', key: 'nom' }, item.nom),
                  React.createElement('div', { key: 'secteur' }, item.secteur),
                  React.createElement('div', { 
                    className: `font-bold ${item.roe > 15 ? 'text-green-400' : item.roe > 10 ? 'text-yellow-400' : 'text-red-400'}`,
                    key: 'roe'
                  }, `${item.roe}%`),
                  React.createElement('div', { 
                    className: `font-bold ${item.roic > 12 ? 'text-green-400' : item.roic > 8 ? 'text-yellow-400' : 'text-red-400'}`,
                    key: 'roic'
                  }, `${item.roic}%`),
                  React.createElement('div', { 
                    className: `font-bold ${item.debt_to_equity < 2 ? 'text-green-400' : item.debt_to_equity < 3 ? 'text-yellow-400' : 'text-red-400'}`,
                    key: 'debt'
                  }, `${item.debt_to_equity}x`),
                  React.createElement('div', { key: 'margin' }, `${item.net_margin}%`),
                  React.createElement('div', { 
                    className: `px-3 py-1 rounded-full text-sm font-bold text-center text-white ${getRatingColor(item.buffett_rating)}`,
                    key: 'rating'
                  }, item.buffett_rating)
                ]
              )
            )
          ]
        ),

        React.createElement('div', { className: 'mt-4 text-gray-400 text-sm', key: 'count' },
          `${filteredData.length} entreprises trouvées`
        )
      ]
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(BuffettApp));
