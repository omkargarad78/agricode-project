// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Get price trend
function getPriceTrend(commodityId) {
    const data = historicalPriceData[commodityId];
    if (!data || data.length < 2) return 'remain stable';
    
    const lastPrice = data[data.length - 1].price;
    const previousPrice = data[data.length - 2].price;
    const change = ((lastPrice - previousPrice) / previousPrice) * 100;
    
    if (change > 1) return 'increase significantly';
    if (change > 0.5) return 'increase moderately';
    if (change > -0.5) return 'remain stable';
    if (change > -1) return 'decrease moderately';
    return 'decrease significantly';
}

// Generate market analysis
function generateMarketAnalysis(commodityId) {
    const commodity = commodities.find(c => c.id === commodityId);
    if (!commodity) return null;
    
    const isBullish = Math.random() > 0.5;
    const supplyPressure = 30 + Math.random() * 40;
    const demandGrowth = 40 + Math.random() * 50;
    const marketVolatility = 20 + Math.random() * 30;
    
    return {
        trend: isBullish ? 'bullish' : 'bearish',
        supplyPressure,
        demandGrowth,
        marketVolatility,
        message: `Current market indicators suggest a ${isBullish ? 'bullish' : 'bearish'} trend for ${commodity.name} in the coming weeks.`
    };
}

// Generate key factors
function generateKeyFactors() {
    const factors = [
        'Global supply chain disruptions affecting distribution.',
        `Seasonal demand patterns showing ${Math.random() > 0.5 ? 'increase' : 'decrease'} in coming months.`,
        'Weather conditions in major growing regions remain favorable.',
        'International trade policies impacting import/export volumes.',
        'Currency exchange rates affecting international trade.',
        'Government subsidies and support programs.',
        'Technological advancements in farming practices.',
        'Environmental regulations and sustainability initiatives.'
    ];
    
    // Randomly select 4 factors
    return factors.sort(() => Math.random() - 0.5).slice(0, 4);
}

// Update UI elements
function updateUI(commodityId) {
    const commodity = commodities.find(c => c.id === commodityId);
    if (!commodity) return;
    
    // Update selected commodity info
    const selectedCommodityInfo = document.getElementById('selected-commodity-info');
    selectedCommodityInfo.innerHTML = `
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-2xl">${commodity.icon}</span>
        </div>
        <div>
            <h3 class="font-medium">${commodity.name}</h3>
            <p class="text-sm text-gray-600">${commodity.category}</p>
        </div>
    `;
    
    // Update market analysis
    const marketAnalysis = generateMarketAnalysis(commodityId);
    if (marketAnalysis) {
        document.getElementById('market-trend').textContent = marketAnalysis.message;
        document.getElementById('supply-pressure').style.width = `${marketAnalysis.supplyPressure}%`;
        document.getElementById('demand-growth').style.width = `${marketAnalysis.demandGrowth}%`;
        document.getElementById('market-volatility').style.width = `${marketAnalysis.marketVolatility}%`;
    }
    
    // Update prediction insight
    const trend = getPriceTrend(commodityId);
    document.getElementById('prediction-insight').textContent = 
        `Based on our analysis of historical data, market trends, and seasonal patterns, 
         we predict that ${commodity.name} prices will ${trend} in the coming month.`;
    
    // Update key factors
    const keyFactors = generateKeyFactors();
    const keyFactorsList = document.getElementById('key-factors');
    keyFactorsList.innerHTML = keyFactors.map(factor => `<li>${factor}</li>`).join('');
    
    // Update price range
    const prices = historicalPriceData[commodityId].map(item => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    document.getElementById('min-price').textContent = formatCurrency(minPrice);
    document.getElementById('max-price').textContent = formatCurrency(maxPrice);
    document.getElementById('min-price-30d').textContent = formatCurrency(minPrice);
    document.getElementById('max-price-30d').textContent = formatCurrency(maxPrice);
    
    // Update trend confidence
    document.getElementById('trend-confidence').textContent = `${Math.floor(65 + Math.random() * 20)}%`;
}

// Export functions
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
window.getPriceTrend = getPriceTrend;
window.generateMarketAnalysis = generateMarketAnalysis;
window.generateKeyFactors = generateKeyFactors;
window.updateUI = updateUI; 