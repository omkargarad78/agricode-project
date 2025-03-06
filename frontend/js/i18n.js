// Language translations
const translations = {
    en: {
        common: {
            beta: 'Beta'
        },
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
            },
            noCommodities: 'No commodities found in this category'
        },
        historical: {
            title: 'Historical Price Data',
            subtitle: 'Analyze past price trends to inform your future decisions.'
        },
        prediction: {
            pageTitle: 'Price Prediction | AgriCode',
            title: 'Price Prediction',
            subtitle: 'Select a commodity and customize parameters to get accurate price forecasts',
            selectCommodity: 'Select Commodity',
            parameters: 'Prediction Parameters',
            timeframe: 'Prediction Timeframe',
            days: {
                '7': '7 Days',
                '14': '14 Days',
                '30': '30 Days',
                '60': '60 Days'
            },
            generate: 'Generate Prediction',
            marketAnalysis: {
                title: 'Market Analysis',
                trend: 'Market trend analysis will appear here',
                supplyPressure: 'Supply Pressure',
                demandGrowth: 'Demand Growth',
                volatility: 'Market Volatility'
            },
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
            },
            historical: 'Historical',
            predicted: 'Predicted',
            generating: 'Generating prediction...',
            timeRanges: {
                '1m': '1 Month',
                '3m': '3 Months',
                '6m': '6 Months',
                '1y': '1 Year',
                all: 'All Time'
            }
        },
        contact: {
            title: 'Contact Us',
            subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
            form: {
                name: 'Name',
                email: 'Email',
                subject: 'Subject',
                message: 'Message',
                submit: 'Send Message'
            }
        },
        error404: {
            title: 'Oops! Page Not Found',
            message: "The page you're looking for doesn't exist or has been moved.",
            backHome: 'Go Back Home'
        },
        footer: {
            privacy: 'Privacy',
            terms: 'Terms',
            contact: 'Contact',
            rights: 'All rights reserved.'
        },
        home: {
            pageTitle: 'AgriCode - Agricultural Commodity Price Prediction',
            getPrediction: 'Get Prediction',
            learnMore: 'Learn More',
            features: {
                title: 'Advanced Forecasting Features',
                subtitle: 'Our platform provides sophisticated tools for agricultural price forecasting.',
                ai: {
                    title: 'AI-Powered Predictions',
                    description: 'Leverage machine learning algorithms to forecast agricultural commodity prices with high accuracy.'
                },
                charts: {
                    title: 'Interactive Charts',
                    description: 'Visualize historical price trends and future predictions with customizable interactive charts.'
                },
                mobile: {
                    title: 'Mobile Responsive',
                    description: 'Access price forecasts on any device, from desktop to smartphone, with a seamless experience.'
                }
            }
        }
    },
    hi: {
        common: {
            beta: 'बीटा'
        },
        nav: {
            home: 'होम',
            prediction: 'भविष्यवाणी',
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
            },
            noCommodities: 'इस श्रेणी में कोई वस्तु नहीं मिली'
        },
        historical: {
            title: 'ऐतिहासिक मूल्य डेटा',
            subtitle: 'भविष्य के निर्णयों को सूचित करने के लिए पिछले मूल्य रुझानों का विश्लेषण करें।'
        },
        prediction: {
            pageTitle: 'मूल्य भविष्यवाणी | AgriCode',
            title: 'मूल्य भविष्यवाणी',
            subtitle: 'सटीक मूल्य पूर्वानुमान प्राप्त करने के लिए वस्तु और पैरामीटर चुनें',
            selectCommodity: 'वस्तु चुनें',
            parameters: 'भविष्यवाणी पैरामीटर',
            timeframe: 'भविष्यवाणी समयसीमा',
            days: {
                '7': '7 दिन',
                '14': '14 दिन',
                '30': '30 दिन',
                '60': '60 दिन'
            },
            generate: 'भविष्यवाणी जनरेट करें',
            marketAnalysis: {
                title: 'बाजार विश्लेषण',
                trend: 'बाजार प्रवृत्ति विश्लेषण यहां दिखाई देगा',
                supplyPressure: 'आपूर्ति दबाव',
                demandGrowth: 'मांग वृद्धि',
                volatility: 'बाजार अस्थिरता'
            },
            tabs: {
                prediction: 'मूल्य भविष्यवाणी',
                historical: 'ऐतिहासिक डेटा'
            },
            insights: {
                title: 'भविष्यवाणी अंतर्दृष्टि',
                confidence: 'प्रवृत्ति विश्वास',
                minPrice: 'न्यूनतम मूल्य',
                maxPrice: 'अधिकतम मूल्य',
                factors: 'मूल्य को प्रभावित करने वाले प्रमुख कारक'
            }
        },
        contact: {
            title: 'संपर्क करें',
            subtitle: 'हम आपसे सुनना पसंद करेंगे। हमें एक संदेश भेजें और हम जल्द से जल्द जवाब देंगे।',
            form: {
                name: 'नाम',
                email: 'ईमेल',
                subject: 'विषय',
                message: 'संदेश',
                submit: 'संदेश भेजें'
            }
        },
        error404: {
            title: 'उफ़! पेज नहीं मिला',
            message: 'जिस पेज को आप खोज रहे हैं वह मौजूद नहीं है या स्थानांतरित कर दिया गया है।',
            backHome: 'होम पर वापस जाएं'
        },
        footer: {
            privacy: 'गोपनीयता',
            terms: 'शर्तें',
            contact: 'संपर्क',
            rights: 'सर्वाधिकार सुरक्षित।'
        },
        home: {
            pageTitle: 'AgriCode - कृषि वस्तुओं की कीमत भविष्यवाणी',
            getPrediction: 'भविष्यवाणी प्राप्त करें',
            learnMore: 'और जानें',
            features: {
                title: 'उन्नत पूर्वानुमान सुविधाएं',
                subtitle: 'हमारा प्लेटफ़ॉर्म कृषि मूल्य पूर्वानुमान के लिए परिष्कृत उपकरण प्रदान करता है।',
                ai: {
                    title: 'एआई-संचालित भविष्यवाणियां',
                    description: 'कृषि वस्तुओं की कीमतों का उच्च सटीकता के साथ पूर्वानुमान लगाने के लिए मशीन लर्निंग एल्गोरिदम का उपयोग करें।'
                },
                charts: {
                    title: 'इंटरैक्टिव चार्ट',
                    description: 'अनुकूलन योग्य इंटरैक्टिव चार्ट के साथ ऐतिहासिक मूल्य रुझानों और भविष्य की भविष्यवाणियों को विज़ुअलाइज़ करें।'
                },
                mobile: {
                    title: 'मोबाइल रेस्पॉन्सिव',
                    description: 'डेस्कटॉप से स्मार्टफोन तक किसी भी डिवाइस पर निर्बाध अनुभव के साथ मूल्य पूर्वानुमान तक पहुंचें।'
                }
            }
        }
    },
    mr: {
        common: {
            beta: 'बीटा'
        },
        nav: {
            home: 'मुख्यपृष्ठ',
            prediction: 'भविष्यवाणी',
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
            },
            noCommodities: 'या श्रेणीत कोणतीही वस्तू सापडली नाही'
        },
        historical: {
            title: 'ऐतिहासिक किंमत डेटा',
            subtitle: 'भविष्यातील निर्णयांसाठी मागील किंमत कलांचे विश्लेषण करा.'
        },
        prediction: {
            pageTitle: 'किंमत भविष्यवाणी | AgriCode',
            title: 'किंमत भविष्यवाणी',
            subtitle: 'अचूक किंमत अंदाज मिळवण्यासाठी वस्तू आणि पॅरामीटर्स निवडा',
            selectCommodity: 'वस्तू निवडा',
            parameters: 'भविष्यवाणी पॅरामीटर्स',
            timeframe: 'भविष्यवाणी कालावधी',
            days: {
                '7': '7 दिवस',
                '14': '14 दिवस',
                '30': '30 दिवस',
                '60': '60 दिवस'
            },
            generate: 'भविष्यवाणी तयार करा',
            marketAnalysis: {
                title: 'बाजार विश्लेषण',
                trend: 'बाजार कल विश्लेषण येथे दिसेल',
                supplyPressure: 'पुरवठा दबाव',
                demandGrowth: 'मागणी वाढ',
                volatility: 'बाजार अस्थिरता'
            },
            tabs: {
                prediction: 'किंमत भविष्यवाणी',
                historical: 'ऐतिहासिक डेटा'
            },
            insights: {
                title: 'भविष्यवाणी अंतर्ज्ञान',
                confidence: 'कल विश्वास',
                minPrice: 'किमान किंमत',
                maxPrice: 'कमाल किंमत',
                factors: 'किंमतीवर परिणाम करणारे प्रमुख घटक'
            }
        },
        contact: {
            title: 'संपर्क करा',
            subtitle: 'आम्हाला तुमच्याकडून ऐकायला आवडेल. आम्हाला संदेश पाठवा आणि आम्ही लवकरात लवकर प्रतिसाद देऊ.',
            form: {
                name: 'नाव',
                email: 'ईमेल',
                subject: 'विषय',
                message: 'संदेश',
                submit: 'संदेश पाठवा'
            }
        },
        error404: {
            title: 'अरेरे! पृष्ठ सापडले नाही',
            message: 'तुम्ही शोधत असलेले पृष्ठ अस्तित्वात नाही किंवा हलवले गेले आहे.',
            backHome: 'होमवर परत जा'
        },
        footer: {
            privacy: 'गोपनीयता',
            terms: 'अटी',
            contact: 'संपर्क',
            rights: 'सर्व हक्क राखीव.'
        },
        home: {
            pageTitle: 'AgriCode - कृषी वस्तूंच्या किमतींचा अंदाज',
            getPrediction: 'अंदाज मिळवा',
            learnMore: 'अधिक जाणून घ्या',
            features: {
                title: 'प्रगत अंदाज वैशिष्ट्ये',
                subtitle: 'आमचा प्लॅटफॉर्म कृषी किंमत अंदाजासाठी परिष्कृत साधने प्रदान करतो.',
                ai: {
                    title: 'एआय-आधारित अंदाज',
                    description: 'कृषी वस्तूंच्या किमतींचा उच्च अचूकतेसह अंदाज लावण्यासाठी मशीन लर्निंग अल्गोरिदमचा वापर करा.'
                },
                charts: {
                    title: 'इंटरॅक्टिव्ह चार्ट्स',
                    description: 'सानुकूल इंटरॅक्टिव्ह चार्टसह ऐतिहासिक किंमत कल आणि भविष्यातील अंदाज विजुअलाइज करा.'
                },
                mobile: {
                    title: 'मोबाइल रेस्पॉन्सिव्ह',
                    description: 'डेस्कटॉप ते स्मार्टफोनपर्यंत कोणत्याही डिव्हाइसवर सुरळीत अनुभवासह किंमत अंदाज मिळवा.'
                }
            }
        }
    }
};

// Current language
let currentLanguage = localStorage.getItem('language') || 'en';

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
            } else if (element.tagName === 'TITLE') {
                document.title = translation;
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