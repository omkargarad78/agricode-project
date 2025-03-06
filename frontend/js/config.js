// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:5000',
    ENDPOINTS: {
        PREDICT: '/predict',
        HISTORICAL: '/historical',
        TRANSLATE: '/translate'
    }
};

// Chart Configuration
const CHART_CONFIG = {
    COLORS: {
        primary: 'rgb(59, 130, 246)',
        secondary: 'rgb(234, 88, 12)',
        gradient: {
            start: 'rgba(59, 130, 246, 0.2)',
            end: 'rgba(59, 130, 246, 0)'
        }
    },
    OPTIONS: {
        responsive: true,
        maintainAspectRatio: false
    }
};

// Timeframes
const TIMEFRAMES = {
    '7d': 7,
    '14d': 14,
    '30d': 30,
    '60d': 60
};

// Export configurations
window.API_CONFIG = API_CONFIG;
window.CHART_CONFIG = CHART_CONFIG;
window.TIMEFRAMES = TIMEFRAMES; 