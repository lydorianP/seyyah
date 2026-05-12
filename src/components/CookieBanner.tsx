"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "false");
    setVisible(false);
    // optional: block any non-essential cookies if you had them
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-[9999] px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p className="text-gray-700 dark:text-gray-300 flex-1">
          {t(
            "Bu site yalnızca oturum açma gibi temel işlevler için zorunlu çerezleri kullanır. İzleme veya reklam çerezi kullanmıyoruz.",
            "This site uses only essential cookies for basic features like login. No tracking or advertising cookies are used."
          )}
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-1.5 rounded-full text-xs font-semibold border border-gray-300 dark:border-gray-500 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {t("Reddet", "Decline")}
          </button>
          <button
            onClick={accept}
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#1E4A8C] text-white hover:bg-[#163A6B] transition"
          >
            {t("Kabul Et", "Accept")}
          </button>
        </div>
      </div>
    </div>
  );
}