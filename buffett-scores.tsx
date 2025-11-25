// pages/buffett-scores.tsx
import { useState, useEffect } from 'react';

interface BuffettData {
  symbole: string;
  nom: string;
  secteur: string;
  roe: number;
  roic: number;
  debt_to_equity: number;
  net_margin: number;
  buffett_rating: string;
}

export default function BuffettScores() {
  const [data, setData] = useState<BuffettData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchBuffettData();
  }, []);

  const fetchBuffettData = async () => {
    try {
      const response = await fetch('/api/buffett-scores');
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

  const getRatingColor = (rating: string) => {
    if (rating.includes('ELITE')) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    if (rating.includes('STRONG')) return 'bg-gradient-to-r from-green-400 to-emerald-600';
    if (rating.includes('DECENT')) return 'bg-gradient-to-r from-blue-400 to-cyan-600';
    return 'bg-gradient-to-r from-red-400 to-pink-600';
  };

  if (loading) return <div className="flex justify-center p-8">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">📊 Score Buffett Ultra-Strict</h1>
        <p className="text-gray-400 mb-6">Analyse des entreprises selon les critères Buffett</p>
        
        {/* Filtres */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['ALL', 'ELITE', 'STRONG', 'DECENT', 'WEAK'].map((filt) => (
            <button
              key={filt}
              onClick={() => setFilter(filt)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === filt ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {filt === 'ALL' ? 'Toutes' : filt}
            </button>
          ))}
        </div>

        {/* Tableau */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-8 gap-4 p-4 bg-gray-700 font-semibold">
            <div>Symbole</div>
            <div className="col-span-2">Entreprise</div>
            <div>Secteur</div>
            <div>ROE</div>
            <div>ROIC</div>
            <div>Dette/Equity</div>
            <div>Score</div>
          </div>
          
          {filteredData.map((item, index) => (
            <div key={index} className="grid grid-cols-8 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors">
              <div className="font-bold text-lg">{item.symbole}</div>
              <div className="col-span-2">
                <div className="font-semibold">{item.nom}</div>
              </div>
              <div className="text-gray-300">{item.secteur}</div>
              <div className={`font-bold ${item.roe > 15 ? 'text-green-400' : item.roe > 10 ? 'text-yellow-400' : 'text-red-400'}`}>
                {item.roe}%
              </div>
              <div className={`font-bold ${item.roic > 12 ? 'text-green-400' : item.roic > 8 ? 'text-yellow-400' : 'text-red-400'}`}>
                {item.roic}%
              </div>
              <div className={`font-bold ${item.debt_to_equity < 2 ? 'text-green-400' : item.debt_to_equity < 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                {item.debt_to_equity}x
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold text-center ${getRatingColor(item.buffett_rating)}`}>
                {item.buffett_rating}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-gray-400 text-sm">
          {filteredData.length} entreprises trouvées
        </div>
      </div>
    </div>
  );
}
