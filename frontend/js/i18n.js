// Language translations
const translations = {
    en: {
        nav: {
            home: 'Home',
            prediction: 'Prediction',
            greeting: 'Hello,',
            signIn: 'Sign In'
        },
        hero: {
            badge: 'Future of Agricultural Pricing',
            title: 'Predict Agricultural Commodity Prices with Precision',
            subtitle: 'Leverage advanced AI to forecast market trends and make data-driven decisions for your agricultural business.'
        },
        commodities: {
            title: 'Select a Commodity',
            subtitle: 'Choose from a variety of agricultural commodities to view historical prices.',
            categories: {
                all: 'All',
                vegetables: 'Vegetables',
                oilseeds: 'Oil Seeds'
            }
        },
        historical: {
            title: 'Historical Price Data',
            subtitle: 'Analyze past price trends to inform your future decisions.'
        },
        prediction: {
            title: 'Commodity Price Prediction',
            subtitle: 'Select a commodity and customize parameters to get accurate price forecasts',
            selectCommodity: 'Select Commodity',
            parameters: 'Prediction Parameters',
            timeframe: 'Prediction Timeframe',
            generate: 'Generate Prediction',
            marketAnalysis: 'Market Analysis',
            supplyPressure: 'Supply Pressure',
            demandGrowth: 'Demand Growth',
            marketVolatility: 'Market Volatility',
            tabs: {
                prediction: 'Price Prediction',
                historical: 'Historical Data'
            },
            insights: {
                title: 'Prediction Insights',
                confidence: 'Trend Confidence',
                minPrice: 'Min Price',
                maxPrice: 'Max Price',
                factors: 'Key Factors Affecting Price'
            }
        },
        footer: {
            privacy: 'Privacy',
            terms: 'Terms',
            contact: 'Contact',
            rights: 'All rights reserved.'
        }
    },
    hi: {
        nav: {
            home: 'होम',
            prediction: 'पूर्वानुमान',
            greeting: 'नमस्ते,',
            signIn: 'साइन इन करें'
        },
        hero: {
            badge: 'कृषि मूल्य निर्धारण का भविष्य',
            title: 'कृषि वस्तुओं की कीमतों का सटीक पूर्वानुमान',
            subtitle: 'अपने कृषि व्यवसाय के लिए बाजार के रुझानों का पूर्वानुमान लगाएं और डेटा-आधारित निर्णय लें।'
        },
        commodities: {
            title: 'वस्तु चुनें',
            subtitle: 'ऐतिहासिक कीमतों को देखने के लिए विभिन्न कृषि वस्तुओं में से चुनें।',
            categories: {
                all: 'सभी',
                vegetables: 'सब्जियां',
                oilseeds: 'तिलहन'
            }
        },
        historical: {
            title: 'ऐतिहासिक मूल्य डेटा',
            subtitle: 'भविष्य के निर्णयों को सूचित करने के लिए पिछले मूल्य रुझानों का विश्लेषण करें।'
        },
        prediction: {
            title: 'वस्तु मूल्य पूर्वानुमान',
            subtitle: 'सटीक मूल्य पूर्वानुमान प्राप्त करने के लिए वस्तु और पैरामीटर चुनें',
            selectCommodity: 'वस्तु चुनें',
            parameters: 'पूर्वानुमान पैरामीटर',
            timeframe: 'पूर्वानुमान समयसीमा',
            generate: 'पूर्वानुमान जनरेट करें',
            marketAnalysis: 'बाजार विश्लेषण',
            supplyPressure: 'आपूर्ति दबाव',
            demandGrowth: 'मांग वृद्धि',
            marketVolatility: 'बाजार अस्थिरता',
            tabs: {
                prediction: 'मूल्य पूर्वानुमान',
                historical: 'ऐतिहासिक डेटा'
            },
            insights: {
                title: 'पूर्वानुमान अंतर्दृष्टि',
                confidence: 'रुझान विश्वास',
                minPrice: 'न्यूनतम मूल्य',
                maxPrice: 'अधिकतम मूल्य',
                factors: 'मूल्य को प्रभावित करने वाले प्रमुख कारक'
            }
        },
        footer: {
            privacy: 'गोपनीयता',
            terms: 'नियम और शर्तें',
            contact: 'संपर्क करें',
            rights: 'सर्वाधिकार सुरक्षित।'
        }
    },
    mr: {
        nav: {
            home: 'मुख्यपृष्ठ',
            prediction: 'अंदाज',
            greeting: 'नमस्कार,',
            signIn: 'साइन इन करा'
        },
        hero: {
            badge: 'कृषी किंमत निर्धारणाचे भविष्य',
            title: 'कृषी वस्तूंच्या किमतींचा अचूक अंदाज',
            subtitle: 'तुमच्या कृषी व्यवसायासाठी बाजार कलांचा अंदाज लावा आणि डेटा-आधारित निर्णय घ्या।'
        },
        commodities: {
            title: 'वस्तू निवडा',
            subtitle: 'ऐतिहासिक किमती पाहण्यासाठी विविध कृषी वस्तूंमधून निवडा.',
            categories: {
                all: 'सर्व',
                vegetables: 'भाज्या',
                oilseeds: 'तेलबिया'
            }
        },
        historical: {
            title: 'ऐतिहासिक किंमत डेटा',
            subtitle: 'भविष्यातील निर्णयांसाठी मागील किंमत कलांचे विश्लेषण करा.'
        },
        prediction: {
            title: 'वस्तू किंमत अंदाज',
            subtitle: 'अचूक किंमत अंदाज मिळवण्यासाठी वस्तू आणि पॅरामीटर्स निवडा',
            selectCommodity: 'वस्तू निवडा',
            parameters: 'अंदाज पॅरामीटर्स',
            timeframe: 'अंदाज कालावधी',
            generate: 'अंदाज तयार करा',
            marketAnalysis: 'बाजार विश्लेषण',
            supplyPressure: 'पुरवठा दबाव',
            demandGrowth: 'मागणी वाढ',
            marketVolatility: 'बाजार अस्थिरता',
            tabs: {
                prediction: 'किंमत अंदाज',
                historical: 'ऐतिहासिक डेटा'
            },
            insights: {
                title: 'अंदाज अंतर्ज्ञान',
                confidence: 'कल विश्वास',
                minPrice: 'किमान किंमत',
                maxPrice: 'कमाल किंमत',
                factors: 'किंमतीवर परिणाम करणारे प्रमुख घटक'
            }
        },
        footer: {
            privacy: 'गोपनीयता',
            terms: 'नियम व अटी',
            contact: 'संपर्क',
            rights: 'सर्व हक्क राखीव.'
        }
    }
};

// Current language
let currentLanguage = 'en';

// Initialize language
function initLanguage() {
    // Get language from localStorage or use browser language
    const savedLanguage = localStorage.getItem('language');
    const browserLanguage = navigator.language.split('-')[0];
    currentLanguage = savedLanguage || (translations[browserLanguage] ? browserLanguage : 'en');
    
    // Set initial language
    setLanguage(currentLanguage);
    
    // Set up language selector
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        languageSelector.addEventListener('change', (e) => setLanguage(e.target.value));
    }
}

// Set language
function setLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let translation = translations[lang];
        
        for (const key of keys) {
            translation = translation[key];
            if (!translation) break;
        }
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

// Get translation
function getTranslation(key) {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (const k of keys) {
        translation = translation[k];
        if (!translation) return key;
    }
    
    return translation;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initLanguage);

// Export functions
window.setLanguage = setLanguage;
window.getTranslation = getTranslation; 