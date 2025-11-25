class BuffettApp {
    constructor() {
        this.data = [];
        this.filter = 'ALL';
        this.init();
    }

    async init() {
        this.createFilters();
        await this.loadData();
    }

    createFilters() {
        const filtersContainer = document.getElementById('filters');
        const filters = ['ALL', 'ELITE', 'STRONG', 'DECENT', 'WEAK'];
        
        filters.forEach(filter => {
            const button = document.createElement('button');
            button.className = 'px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all';
            button.textContent = filter === 'ALL' ? 'Toutes' : filter;
            button.onclick = () => this.setFilter(filter);
            filtersContainer.appendChild(button);
        });
    }

    async loadData() {
        try {
            const response = await fetch('/api/buffett-scores');
            this.data = await response.json();
            this.renderTable();
        } catch (error) {
            this.showError('Erreur lors du chargement des données');
        }
    }

    setFilter(filter) {
        this.filter = filter;
        this.renderTable();
    }

    renderTable() {
        const filteredData = this.filter === 'ALL' 
            ? this.data 
            : this.data.filter(item => item.buffett_rating.includes(this.filter));

        // Masquer le loading
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('table-container').classList.remove('hidden');

        // Remplir le tableau
        this.renderTableHeader();
        this.renderTableBody(filteredData);
        
        // Mettre à jour le compteur
        document.getElementById('count').textContent = 
            `${filteredData.length} entreprises trouvées`;
    }

    renderTableHeader() {
        const headers = ['Symbole', 'Entreprise', 'Secteur', 'ROE', 'ROIC', 'D/E', 'Marge', 'Score'];
        const headerContainer = document.getElementById('table-header');
        headerContainer.innerHTML = headers.map(header => 
            `<div>${header}</div>`
        ).join('');
    }

    renderTableBody(data) {
        const bodyContainer = document.getElementById('table-body');
        bodyContainer.innerHTML = data.map(item => `
            <div class="grid grid-cols-8 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors">
                <div class="font-bold">${item.symbole}</div>
                <div class="col-span-2 font-semibold">${item.nom}</div>
                <div class="text-gray-300">${item.secteur}</div>
                <div class="font-bold ${this.getROEColor(item.roe)}">${item.roe}%</div>
                <div class="font-bold ${this.getROICColor(item.roic)}">${item.roic}%</div>
                <div class="font-bold ${this.getDebtColor(item.debt_to_equity)}">${item.debt_to_equity}x</div>
                <div>${item.net_margin}%</div>
                <div class="px-3 py-1 rounded-full text-sm font-bold text-center text-white ${this.getRatingColor(item.buffett_rating)}">
                    ${item.buffett_rating}
                </div>
            </div>
        `).join('');
    }

    getROEColor(roe) {
        return roe > 15 ? 'text-green-400' : roe > 10 ? 'text-yellow-400' : 'text-red-400';
    }

    getROICColor(roic) {
        return roic > 12 ? 'text-green-400' : roic > 8 ? 'text-yellow-400' : 'text-red-400';
    }

    getDebtColor(debt) {
        return debt < 2 ? 'text-green-400' : debt < 3 ? 'text-yellow-400' : 'text-red-400';
    }

    getRatingColor(rating) {
        if (rating.includes('ELITE')) return 'bg-yellow-500';
        if (rating.includes('STRONG')) return 'bg-green-500';
        if (rating.includes('DECENT')) return 'bg-blue-500';
        return 'bg-red-500';
    }

    showError(message) {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('error').textContent = message;
    }
}

// Démarrer l'application
new BuffettApp();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(BuffettApp));
