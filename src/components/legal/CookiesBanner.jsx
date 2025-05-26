import { useState, useEffect } from "react";

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    
    const dismissBanner = () => {
      setIsVisible(false);
      // Store a flag in localStorage to prevent showing again
      localStorage.setItem('cookieNoticeSeen', 'true');
    };
    
    // Check if user has already seen the banner
    useEffect(() => {
      const hasSeenNotice = localStorage.getItem('cookieNoticeSeen');
      if (hasSeenNotice) {
        setIsVisible(false);
      }
    }, []);
    
    if (!isVisible) return null;
    
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-indigo-50 border-t border-indigo-100 p-4 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-700 mb-3 sm:mb-0">
            This site uses cookies for authentication and to enhance your browsing experience. 
            By continuing to use this site, you acknowledge our use of cookies.
          </p>
          <div className="flex space-x-3">
            <button 
              onClick={() => window.open('/cookies-policy', '_blank')}
              className="text-xs text-indigo-600 underline px-3 py-1 cursor-pointer"
            >
              Cookie Policy
            </button>
            <button 
              onClick={dismissBanner}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-2 rounded cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default CookieBanner