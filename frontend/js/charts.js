// Chart instances
let historicalChart = null;
let predictionChart = null;
let historicalChart2 = null;

// Chart options
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            mode: 'index',
            intersect: false,
        }
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day'
            },
            title: {
                display: true,
                text: 'Date'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Price ($)'
            }
        }
    }
};

// Create historical price chart
function createHistoricalChart(canvasId, data, commodityName) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    if (historicalChart) {
        historicalChart.destroy();
    }
    
    historicalChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => item.date),
            datasets: [{
                label: `${commodityName} Price`,
                data: data.map(item => item.price),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: chartOptions
    });
}

// Create prediction chart
function createPredictionChart(canvasId, data, commodityName) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    if (predictionChart) {
        predictionChart.destroy();
    }
    
    predictionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => item.date),
            datasets: [
                {
                    label: 'Predicted Price',
                    data: data.map(item => item.predicted),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Upper Bound',
                    data: data.map(item => item.upperBound),
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Lower Bound',
                    data: data.map(item => item.lowerBound),
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: chartOptions
    });
}

// Update charts with new data
function updateCharts(commodityId) {
    const commodity = commodities.find(c => c.id === commodityId);
    if (!commodity) return;
    
    // Update historical chart
    createHistoricalChart('historical-chart', historicalPriceData[commodityId], commodity.name);
    
    // Update prediction chart
    createPredictionChart('prediction-chart', predictionData[commodityId], commodity.name);
    
    // Update second historical chart in prediction section
    createHistoricalChart('historical-chart-2', historicalPriceData[commodityId], commodity.name);
}

// Export functions
window.createHistoricalChart = createHistoricalChart;
window.createPredictionChart = createPredictionChart;
window.updateCharts = updateCharts; 