import React, { useEffect, useState } from "react";

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  const cancelCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>

      {/* Consent Box */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-2xl shadow-2xl animate-slide-in-up z-50">
        <h2 className="text-lg font-semibold mb-2">🍪 We value your privacy</h2>
        <p className="text-sm mb-4">
          We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts.
          By clicking "Accept", you agree to our use of cookies.
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={cancelCookies}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
