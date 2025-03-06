// Global state
let selectedCommodity = null;
let selectedTimeframe = 7;
let isAuthenticated = false;
let userData = null;
let selectedTimeRange = 'all';

console.log('Main.js loaded');

// Initialize the application
function init() {
    console.log('Initializing application...');
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize category tabs
    initCategoryTabs();
    
    // Initialize commodity selector with default category
    initCommoditySelector('all');
    
    // Initialize event listeners
    initEventListeners();
    
    // Check authentication status
    checkAuthStatus();
    
    console.log('Application initialized');
}

// Initialize category tabs
function initCategoryTabs() {
    console.log('Initializing category tabs...');
    const tabs = document.querySelectorAll('.category-tab');
    if (tabs.length === 0) {
        console.warn('No category tabs found');
        return;
    }

    // Set first tab as active by default
    tabs[0].classList.add('active', 'bg-blue-600', 'text-white');
    tabs[0].classList.remove('text-gray-600', 'hover:bg-gray-50');
}

// Initialize commodity selector
function initCommoditySelector(category = 'all') {
    console.log('Initializing commodity selector with category:', category);
    const container = document.getElementById('commodity-selector');
    if (!container) {
        console.warn('Commodity selector container not found');
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Get all commodities
    const allCommodities = [
        ...commodities.vegetables,
        ...commodities.oilseeds
    ];
    
    console.log('Available commodities:', allCommodities);
    
    // Set default selected commodity if none selected
    if (!selectedCommodity && allCommodities.length > 0) {
        selectedCommodity = allCommodities[0].id;
    }
    
    // Filter commodities by category
    const commoditiesToShow = category === 'all' 
        ? allCommodities 
        : allCommodities.filter(c => c.category === category);
    
    console.log('Filtered commodities:', commoditiesToShow);
    
    // Create commodity cards
    if (commoditiesToShow.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-8 text-gray-500">
                ${getTranslation('commodities.noCommodities')}
            </div>
        `;
        return;
    }
    
    // Create commodity cards with grid layout
    const gridClass = window.location.pathname.includes('prediction.html')
        ? 'grid-cols-1 gap-2'
        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
    
    container.className = `grid ${gridClass}`;
    
    commoditiesToShow.forEach(commodity => {
        const card = document.createElement('div');
        card.className = `p-4 rounded-lg border cursor-pointer transition-all ${
            commodity.id === selectedCommodity 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
        }`;
        
        card.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">${commodity.icon}</span>
                <div class="flex-1">
                    <h3 class="font-medium">${commodity.name}</h3>
                    <p class="text-sm text-gray-600">${getTranslation(`commodities.categories.${commodity.category}`)}</p>
                    <p class="text-sm font-medium text-blue-600 mt-1">${commodity.price}</p>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => selectCommodity(commodity.id));
        container.appendChild(card);
    });
    
    console.log('Commodity cards created');
    
    // Update charts based on page
    if (window.location.pathname.includes('prediction.html')) {
        updatePredictionCharts(selectedCommodity);
    } else {
        updateHistoricalChart(selectedCommodity);
    }
}

// Initialize event listeners
function initEventListeners() {
    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Update tab styles
            document.querySelectorAll('.category-tab').forEach(t => {
                t.classList.remove('active', 'bg-blue-600', 'text-white');
                t.classList.add('text-gray-600', 'hover:bg-gray-50');
            });
            tab.classList.add('active', 'bg-blue-600', 'text-white');
            tab.classList.remove('text-gray-600', 'hover:bg-gray-50');
            
            // Update commodity display
            initCommoditySelector(tab.dataset.category);
        });
    });
    
    // Timeframe buttons
    document.querySelectorAll('.timeframe-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.timeframe-btn').forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white');
                b.classList.add('border', 'border-gray-300', 'hover:bg-gray-50');
            });
            btn.classList.add('bg-blue-600', 'text-white');
            btn.classList.remove('border', 'border-gray-300', 'hover:bg-gray-50');
            selectedTimeframe = parseInt(btn.dataset.days);
            
            if (selectedCommodity) {
                generatePrediction();
            }
        });
    });
    
    // Time range buttons
    document.querySelectorAll('.timerange-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update button styles
            document.querySelectorAll('.timerange-btn').forEach(b => {
                b.classList.remove('bg-blue-100', 'text-blue-800');
            });
            btn.classList.add('bg-blue-100', 'text-blue-800');
            
            // Update chart
            selectedTimeRange = btn.dataset.range;
            if (selectedCommodity) {
                updateHistoricalChart(selectedCommodity);
            }
        });
    });
    
    // Sign in button
    const signInBtn = document.getElementById('sign-in-btn');
    if (signInBtn) {
        signInBtn.addEventListener('click', handleSignIn);
    }
}

// Select commodity
function selectCommodity(commodityId) {
    selectedCommodity = commodityId;
    initCommoditySelector();
}

// Update historical chart
function updateHistoricalChart(commodityId) {
    const canvas = document.getElementById('historical-chart');
    if (!canvas) return;
    
    // Get historical data for the commodity
    const data = getHistoricalData(commodityId);
    if (!data) return;
    
    // Update chart title
    const chartTitle = document.getElementById('chart-title');
    if (chartTitle) {
        chartTitle.textContent = `${data.commodity.name} Price History`;
    }
    
    // Destroy existing chart if it exists
    if (window.historicalChart) {
        window.historicalChart.destroy();
    }
    
    // Calculate y-axis min and max with padding
    const yMin = Math.floor(data.minPrice * 0.95);
    const yMax = Math.ceil(data.maxPrice * 1.05);
    
    // Create gradient fill
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    
    // Create chart
    window.historicalChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: data.dates,
            datasets: [{
                label: `Price`,
                data: data.prices,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: gradient,
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: 'rgb(59, 130, 246)',
                pointHoverBorderColor: 'white',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'white',
                    titleColor: 'black',
                    bodyColor: 'black',
                    borderColor: 'rgb(229, 231, 235)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(tooltipItems) {
                            return data.dates[tooltipItems[0].dataIndex];
                        },
                        label: function(context) {
                            return `₹${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        color: 'rgb(243, 244, 246)'
                    },
                    ticks: {
                        maxRotation: 0,
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    min: yMin,
                    max: yMax,
                    grid: {
                        display: true,
                        color: 'rgb(243, 244, 246)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹' + value;
                        },
                        font: {
                            size: 11
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Update prediction charts
function updatePredictionCharts(commodityId) {
    const canvas = document.getElementById('prediction-chart');
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    if (window.predictionChart) {
        window.predictionChart.destroy();
        window.predictionChart = null;
    }
    
    // Get prediction data
    const data = getPredictionData(commodityId, selectedTimeframe);
    
    // Create chart
    window.predictionChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: data.dates,
            datasets: [
                {
                    label: getTranslation('prediction.historical'),
                    data: data.historical,
                    borderColor: 'rgb(59, 130, 246)',
                    tension: 0.1
                },
                {
                    label: getTranslation('prediction.predicted'),
                    data: data.predicted,
                    borderColor: 'rgb(234, 88, 12)',
                    borderDash: [5, 5],
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `${getCommodityName(commodityId)} - ${getTranslation('prediction.title')}`
                }
            }
        }
    });
    
    // Update insights
    updateInsights(data);
}

// Generate prediction
async function generatePrediction() {
    if (!selectedCommodity) {
        showNotification('Please select a commodity first', 'error');
        return;
    }

    try {
        // Show loading state
        showLoadingState();
        
        // Clear existing chart before making the API call
        clearPredictionChart();
        
        // Calculate dates for prediction
        const dates = [];
        const currentDate = new Date();
        
        for (let i = 0; i < selectedTimeframe; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);
        }
        
        // Call Flask API for prediction
        const response = await fetch(`${API_CONFIG.BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                commodity_id: selectedCommodity,
                date: dates[dates.length - 1] // Send the last date as target
            })
        });
        
        if (!response.ok) {
            if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Unknown error occurred');
        }
        
        // Update prediction chart
        const predictionCanvas = document.getElementById('prediction-chart');
        if (!predictionCanvas) return;
        
        // Format dates for display
        const displayDates = dates.map(date => {
            const d = new Date(date);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        // Create gradient fill
        const ctx = predictionCanvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, predictionCanvas.height);
        gradient.addColorStop(0, CHART_CONFIG.COLORS.gradient.start);
        gradient.addColorStop(1, CHART_CONFIG.COLORS.gradient.end);
        
        // Create chart
        window.predictionChart = new Chart(predictionCanvas, {
            type: 'line',
            data: {
                labels: displayDates,
                datasets: [{
                    label: 'Predicted Price',
                    data: data.predictions.map(p => p.price),
                    borderColor: CHART_CONFIG.COLORS.primary,
                    backgroundColor: gradient,
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: CHART_CONFIG.COLORS.primary,
                    pointBorderColor: 'white',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'white',
                        titleColor: 'black',
                        bodyColor: 'black',
                        borderColor: 'rgb(229, 231, 235)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `₹${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: true,
                            color: 'rgb(243, 244, 246)'
                        },
                        ticks: {
                            maxRotation: 45,
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: true,
                            color: 'rgb(243, 244, 246)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '₹' + value;
                            },
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
        
        // Update insights
        document.getElementById('prediction-insight').innerHTML = `
            <div class="space-y-2">
                <p class="font-medium">${data.statistics.price_trend}</p>
                <p class="text-sm text-gray-500">
                    Prediction Range: ${displayDates[0]} - ${displayDates[displayDates.length - 1]}
                </p>
            </div>
        `;
        
        // Update metrics
        document.getElementById('trend-confidence').textContent = '85%';
        document.getElementById('min-price-prediction').textContent = `₹${data.statistics.min_price.toFixed(2)}`;
        document.getElementById('max-price-prediction').textContent = `₹${data.statistics.max_price.toFixed(2)}`;
        
        // Update market analysis
        updateMarketAnalysis(data.statistics);
        
    } catch (error) {
        console.error('Error generating prediction:', error);
        document.getElementById('prediction-insight').innerHTML = `
            <div class="text-red-600">
                ${error.message}
            </div>
        `;
        clearPredictionChart();
    } finally {
        hideLoadingState();
    }
}

// Helper functions
function showLoadingState() {
    document.getElementById('prediction-insight').innerHTML = `
        <div class="flex items-center justify-center space-x-2">
            <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>${getTranslation('prediction.loading')}</span>
        </div>
    `;
    document.getElementById('trend-confidence').textContent = '-';
    document.getElementById('min-price-prediction').textContent = '-';
    document.getElementById('max-price-prediction').textContent = '-';
}

function hideLoadingState() {
    // Loading state is automatically cleared when content is updated
}

function clearPredictionChart() {
    if (window.predictionChart) {
        window.predictionChart.destroy();
        window.predictionChart = null;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Update insights
function updateInsights(data) {
    // Update confidence
    const confidenceEl = document.getElementById('trend-confidence');
    if (confidenceEl) {
        confidenceEl.textContent = `${data.confidence}%`;
    }
    
    // Update price range
    const minPriceEl = document.getElementById('min-price-prediction');
    const maxPriceEl = document.getElementById('max-price-prediction');
    if (minPriceEl && maxPriceEl) {
        minPriceEl.textContent = formatCurrency(data.minPrice);
        maxPriceEl.textContent = formatCurrency(data.maxPrice);
    }
    
    // Update market indicators
    const supplyPressure = document.getElementById('supply-pressure');
    const demandGrowth = document.getElementById('demand-growth');
    const marketVolatility = document.getElementById('market-volatility');
    
    if (supplyPressure) supplyPressure.style.width = `${data.supplyPressure}%`;
    if (demandGrowth) demandGrowth.style.width = `${data.demandGrowth}%`;
    if (marketVolatility) marketVolatility.style.width = `${data.marketVolatility}%`;
    
    // Update key factors
    const factorsEl = document.getElementById('key-factors');
    if (factorsEl) {
        factorsEl.innerHTML = data.factors.map(factor => `
            <li>${factor}</li>
        `).join('');
    }
}

// Handle sign in
function handleSignIn() {
    // Mock authentication
    isAuthenticated = true;
    userData = {
        name: 'John Doe',
        email: 'john@example.com'
    };
    
    updateAuthUI();
}

// Check authentication status
function checkAuthStatus() {
    // Mock check - in real app, verify token with backend
    const token = localStorage.getItem('auth_token');
    if (token) {
        isAuthenticated = true;
        userData = JSON.parse(localStorage.getItem('user_data'));
        updateAuthUI();
    }
}

// Update authentication UI
function updateAuthUI() {
    const signInBtn = document.getElementById('sign-in-btn');
    const userGreeting = document.getElementById('user-greeting');
    const username = document.getElementById('username');
    
    if (isAuthenticated && userData) {
        if (signInBtn) signInBtn.classList.add('hidden');
        if (userGreeting) userGreeting.classList.remove('hidden');
        if (username) username.textContent = userData.name;
    } else {
        if (signInBtn) signInBtn.classList.remove('hidden');
        if (userGreeting) userGreeting.classList.add('hidden');
        if (username) username.textContent = '';
    }
}

// Helper functions
function getCommodityName(id) {
    const allCommodities = [...commodities.vegetables, ...commodities.oilseeds];
    const commodity = allCommodities.find(c => c.id === id);
    return commodity ? commodity.name : id;
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(value);
}

// Mock data functions
function getHistoricalData(commodityId) {
    // Get the commodity details
    const allCommodities = Object.values(commodities).reduce((acc, curr) => [...acc, ...curr], []);
    const commodity = allCommodities.find(c => c.id === commodityId);
    
    if (!commodity) return null;
    
    // Get base price from commodity
    const basePrice = parseInt(commodity.price.replace(/[^0-9]/g, ''));
    
    // Generate dates and prices based on selected time range
    const { dates, prices } = generateTimeSeriesData(basePrice, selectedTimeRange);
    
    return {
        dates,
        prices,
        commodity,
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices)
    };
}

function getPredictionData(commodityId, timeframe) {
    // Mock implementation - replace with actual API call
    return {
        dates: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        historical: [125, 128, 130, null, null],
        predicted: [null, 135, 140, 138, 142],
        confidence: 85,
        minPrice: 130,
        maxPrice: 145,
        supplyPressure: 60,
        demandGrowth: 75,
        marketVolatility: 40,
        factors: [
            'Seasonal demand increase expected',
            'Normal monsoon forecast',
            'Stable transportation costs'
        ]
    };
}

// Generate time series data
function generateTimeSeriesData(basePrice, timeRange) {
    const today = new Date();
    const dates = [];
    const prices = [];
    let days;
    
    switch(timeRange) {
        case '1m':
            days = 30;
            break;
        case '3m':
            days = 90;
            break;
        case '6m':
            days = 180;
            break;
        case '1y':
            days = 365;
            break;
        default: // 'all'
            days = 365;
            break;
    }
    
    // Generate smooth price variations
    let currentPrice = basePrice;
    let trend = 0;
    
    for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        // Add some randomness to the trend
        if (i % 5 === 0) {
            trend = (Math.random() - 0.5) * 2; // Change trend direction occasionally
        }
        
        // Calculate new price with trend and random noise
        const noise = (Math.random() - 0.5) * (basePrice * 0.02); // 2% random noise
        currentPrice = Math.max(basePrice * 0.7, Math.min(basePrice * 1.3, currentPrice + trend + noise));
        prices.push(Math.round(currentPrice * 100) / 100);
    }
    
    return { dates, prices };
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export functions
window.selectCommodity = selectCommodity;
window.generatePrediction = generatePrediction;

function updateMarketAnalysis(statistics) {
    // Calculate market indicators
    const trendStrength = Math.abs((statistics.max_price - statistics.min_price) / statistics.avg_price);
    const supplyPressure = Math.min(100, Math.round(trendStrength * 100));
    const demandGrowth = Math.min(100, Math.round((statistics.avg_price / statistics.min_price - 1) * 100));
    const volatility = Math.min(100, Math.round(trendStrength * 150));
    
    // Update market trend text
    const marketTrend = document.getElementById('market-trend');
    if (marketTrend) {
        marketTrend.textContent = statistics.price_trend;
    }
    
    // Update progress bars
    const supplyPressureBar = document.getElementById('supply-pressure');
    const demandGrowthBar = document.getElementById('demand-growth');
    const marketVolatilityBar = document.getElementById('market-volatility');
    
    if (supplyPressureBar) {
        supplyPressureBar.style.width = `${supplyPressure}%`;
    }
    if (demandGrowthBar) {
        demandGrowthBar.style.width = `${demandGrowth}%`;
    }
    if (marketVolatilityBar) {
        marketVolatilityBar.style.width = `${volatility}%`;
    }
    
    // Update key factors
    const keyFactors = document.getElementById('key-factors');
    if (keyFactors) {
        keyFactors.innerHTML = `
            <li>Price trend is ${statistics.price_trend.toLowerCase()}</li>
            <li>Average price: ₹${statistics.avg_price.toFixed(2)}</li>
            <li>Market volatility is ${volatility < 30 ? 'low' : volatility < 70 ? 'moderate' : 'high'}</li>
        `;
    }
} 