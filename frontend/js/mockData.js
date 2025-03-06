// Commodity data
const commodities = {
    vegetables: [
        { id: 'onion', name: 'Onion', icon: '🧅', category: 'vegetables', price: '₹25/kg' },
        { id: 'tomato', name: 'Tomato', icon: '🍅', category: 'vegetables', price: '₹40/kg' },
        { id: 'potato', name: 'Potato', icon: '🥔', category: 'vegetables', price: '₹30/kg' }
    ],
    oilseeds: [
        { id: 'soybean', name: 'Soybean', icon: '🫘', category: 'oilseeds', price: '₹80/kg' }
    ],
    grains: [
        { id: "wheat", name: "Wheat", icon: "🌾", category: "grains", price: '₹35/kg' },
        { id: "corn", name: "Corn", icon: "🌽", category: "grains", price: '₹25/kg' },
        { id: "rice", name: "Rice", icon: "🍚", category: "grains", price: '₹45/kg' }
    ]
};

// Export commodities for use in other files
window.commodities = commodities;

// Helper function to generate historical price data
function generatePriceData(days, minPrice, maxPrice) {
    const data = [];
    const today = new Date();
    
    // Function to generate a random price with a slight trend
    let lastPrice = minPrice + Math.random() * (maxPrice - minPrice);
    let trend = Math.random() * 0.1 - 0.05; // Generate a small random trend
    
    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (days - i));
        
        // Add some randomness to the price but maintain a slight trend
        const randomFactor = Math.random() * 0.06 - 0.03;
        lastPrice = lastPrice * (1 + trend + randomFactor);
        
        // Ensure price stays within bounds
        if (lastPrice > maxPrice) {
            lastPrice = maxPrice;
            trend = -Math.abs(trend); // Reverse trend if hitting upper bound
        } else if (lastPrice < minPrice) {
            lastPrice = minPrice;
            trend = Math.abs(trend); // Reverse trend if hitting lower bound
        }
        
        // Occasionally change the trend
        if (Math.random() < 0.05) {
            trend = Math.random() * 0.1 - 0.05;
        }
        
        data.push({
            date: date.toISOString().split('T')[0],
            price: Math.round(lastPrice * 100) / 100
        });
    }
    
    return data;
}

// Helper function to generate prediction data based on historical data
function generatePredictionData(days, historicalData) {
    const data = [];
    const lastDate = new Date(historicalData[historicalData.length - 1].date);
    const lastPrice = historicalData[historicalData.length - 1].price;
    
    // Calculate a trend based on last 30 days
    const recentPrices = historicalData.slice(-30);
    let trend = 0;
    
    if (recentPrices.length >= 2) {
        const firstPrice = recentPrices[0].price;
        const lastPrice = recentPrices[recentPrices.length - 1].price;
        trend = (lastPrice - firstPrice) / (recentPrices.length * firstPrice);
    }
    
    let predictedPrice = lastPrice;
    
    for (let i = 1; i <= days; i++) {
        const date = new Date(lastDate);
        date.setDate(lastDate.getDate() + i);
        
        // Add some randomness to the prediction and incorporate the trend
        const randomFactor = Math.random() * 0.04 - 0.02;
        predictedPrice = predictedPrice * (1 + trend + randomFactor);
        
        // Calculate confidence intervals (wider as we go further into the future)
        const confidence = 0.02 + (i / days) * 0.08; // Starts at 2%, increases to 10%
        const lowerBound = predictedPrice * (1 - confidence);
        const upperBound = predictedPrice * (1 + confidence);
        
        data.push({
            date: date.toISOString().split('T')[0],
            predicted: Math.round(predictedPrice * 100) / 100,
            lowerBound: Math.round(lowerBound * 100) / 100,
            upperBound: Math.round(upperBound * 100) / 100
        });
    }
    
    return data;
}

// Generate historical price data for each commodity
const historicalPriceData = {
    "wheat": generatePriceData(200, 680, 850),
    "corn": generatePriceData(200, 380, 500),
    "rice": generatePriceData(200, 580, 750),
    "coffee": generatePriceData(200, 180, 220),
    "cotton": generatePriceData(200, 80, 120),
    "sugar": generatePriceData(200, 14, 25),
    "cocoa": generatePriceData(200, 2400, 3200),
    "soybeans": generatePriceData(200, 900, 1400),
    "cattle": generatePriceData(200, 130, 170),
    "hogs": generatePriceData(200, 80, 110)
};

// Generate prediction data for each commodity
const predictionData = {
    "wheat": generatePredictionData(30, historicalPriceData["wheat"]),
    "corn": generatePredictionData(30, historicalPriceData["corn"]),
    "rice": generatePredictionData(30, historicalPriceData["rice"]),
    "coffee": generatePredictionData(30, historicalPriceData["coffee"]),
    "cotton": generatePredictionData(30, historicalPriceData["cotton"]),
    "sugar": generatePredictionData(30, historicalPriceData["sugar"]),
    "cocoa": generatePredictionData(30, historicalPriceData["cocoa"]),
    "soybeans": generatePredictionData(30, historicalPriceData["soybeans"]),
    "cattle": generatePredictionData(30, historicalPriceData["cattle"]),
    "hogs": generatePredictionData(30, historicalPriceData["hogs"])
};

// Mock data for development
const mockData = {
    // Historical price data
    historicalPrices: {
        onion: [
            { date: '2024-01', price: 25 },
            { date: '2024-02', price: 28 },
            { date: '2024-03', price: 23 },
            { date: '2024-04', price: 25 },
            { date: '2024-05', price: 27 }
        ],
        tomato: [
            { date: '2024-01', price: 40 },
            { date: '2024-02', price: 45 },
            { date: '2024-03', price: 38 },
            { date: '2024-04', price: 42 },
            { date: '2024-05', price: 40 }
        ],
        potato: [
            { date: '2024-01', price: 30 },
            { date: '2024-02', price: 32 },
            { date: '2024-03', price: 28 },
            { date: '2024-04', price: 30 },
            { date: '2024-05', price: 31 }
        ],
        soybean: [
            { date: '2024-01', price: 80 },
            { date: '2024-02', price: 85 },
            { date: '2024-03', price: 82 },
            { date: '2024-04', price: 88 },
            { date: '2024-05', price: 86 }
        ]
    }
};

console.log('Mock data loaded'); 