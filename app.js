const itemsConfig = [
    {
        id: 'esponja_africana',
        name: 'Esponja Africana',
        icon: 'ph-sparkle',
        limits: { yellow: 11, orange: 15, red: 30 }
    },
    {
        id: 'toalla_mano',
        name: 'Toalla de Mano',
        icon: 'ph-hand-palm',
        limits: { yellow: 2, orange: 3, red: 4 }
    },
    {
        id: 'toalla_cuerpo',
        name: 'Toalla de Cuerpo',
        icon: 'ph-drop',
        limits: { yellow: 5, orange: 7, red: 8 }
    },
    {
        id: 'sabanas',
        name: 'Sábanas (Completas)',
        icon: 'ph-bed',
        limits: { yellow: 5, orange: 7, red: 8 }
    },
    {
        id: 'funda_almohada',
        name: 'Funda de Almohada',
        icon: 'ph-moon',
        limits: { yellow: 2, orange: 3, red: 4 }
    }
];

const STORAGE_KEY = 'hygiene_tracker_data';

class HygieneTracker {
    constructor() {
        this.data = this.loadData();
        this.container = document.getElementById('tracker-container');
        this.template = document.getElementById('card-template');
        this.init();
    }

    loadData() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        // Initialize with null dates
        const initialData = {};
        itemsConfig.forEach(item => {
            initialData[item.id] = null; // null means never washed / just started
        });
        return initialData;
    }

    saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    }

    getDaysElapsed(dateString) {
        if (!dateString) return null;
        const lastWashed = new Date(dateString);
        lastWashed.setHours(0, 0, 0, 0);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = Math.abs(today - lastWashed);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    }

    getStatusClass(daysElapsed, limits) {
        if (daysElapsed === null) return 'status-green'; // New item
        
        if (daysElapsed >= limits.red) return 'status-red';
        if (daysElapsed >= limits.orange) return 'status-orange';
        if (daysElapsed >= limits.yellow) return 'status-yellow';
        
        return 'status-green';
    }

    getStatusText(statusClass) {
        switch (statusClass) {
            case 'status-green': return 'OK';
            case 'status-yellow': return 'Atención';
            case 'status-orange': return 'Lavar Pronto';
            case 'status-red': return 'Lavado Urgente';
            default: return 'OK';
        }
    }

    formatDate(dateString) {
        if (!dateString) return 'Nunca (Nuevo)';
        
        const date = new Date(dateString);
        const today = new Date();
        
        if (date.toDateString() === today.toDateString()) {
            return 'Hoy';
        }
        
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Ayer';
        }

        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    getProgressWidth(daysElapsed, maxLimit) {
        if (daysElapsed === null) return '0%';
        if (daysElapsed >= maxLimit) return '100%';
        const percentage = (daysElapsed / maxLimit) * 100;
        return `${percentage}%`;
    }

    washItem(id) {
        this.data[id] = new Date().toISOString();
        this.saveData();
        this.render(); // Re-render to update UI
    }

    render() {
        this.container.innerHTML = ''; // Clear container

        itemsConfig.forEach(item => {
            const lastWashedDate = this.data[item.id];
            const daysElapsed = this.getDaysElapsed(lastWashedDate);
            const statusClass = this.getStatusClass(daysElapsed, item.limits);
            const statusText = this.getStatusText(statusClass);

            const clone = this.template.content.cloneNode(true);
            const cardEl = clone.querySelector('.card');
            
            // Set basic info
            cardEl.className = `card ${statusClass}`;
            clone.querySelector('.card-icon').className = `ph ${item.icon}`;
            clone.querySelector('.card-title').textContent = item.name;
            clone.querySelector('.status-text').textContent = statusText;
            
            // Set time info
            clone.querySelector('.days-count').textContent = daysElapsed === null ? '0' : daysElapsed;
            clone.querySelector('.last-washed-date').textContent = this.formatDate(lastWashedDate);
            
            // Progress bar
            const progressBar = clone.querySelector('.progress-bar');
            progressBar.style.width = this.getProgressWidth(daysElapsed, item.limits.red);

            // Button Action
            const washBtn = clone.querySelector('.btn-wash');
            washBtn.addEventListener('click', () => {
                this.washItem(item.id);
            });

            this.container.appendChild(clone);
        });
    }

    init() {
        this.render();
        // Check for midnight updates
        setInterval(() => this.render(), 1000 * 60 * 60); // Check every hour
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HygieneTracker();
});
