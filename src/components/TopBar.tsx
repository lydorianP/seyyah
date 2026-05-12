"use client";

import { useLang } from "@/lib/i18n";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import DarkModeToggle from "./DarkModeToggle";

export default function TopBar() {
  const { lang, setLang, t } = useLang();
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-topbar)] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + nav */}
          <div className="flex items-center gap-8">
            <Link
              href="/harita"
              className="text-white hover:opacity-80 transition-opacity flex items-center"
              aria-label="Home"
            >
              <span className="text-3xl leading-none">🗺️</span>
            </Link>

            <div className="flex items-center gap-8 text-sm font-medium">
              {session ? (
                <span className="text-white/90 italic">
                  {t("Back Again", "Back Again")},{" "}
                  {session.user?.name || session.user?.email}
                </span>
              ) : (
                <>
                  <Link href="/register" className="text-white/80 hover:text-white transition no-underline">
                    {t("Kayıt", "Register")}
                  </Link>
                  <Link href="/login" className="text-white/80 hover:text-white transition no-underline">
                    {t("Giriş", "Login")}
                  </Link>
                </>
              )}
              <Link href="/contribute" className="text-[var(--color-accent)] font-semibold hover:opacity-80 transition no-underline">
                {t("Katkıda Bulun", "Contribute")}
              </Link>
            </div>
          </div>

          {/* Right: language + dark mode toggle */}
          <div className="flex items-center gap-3">
            <DarkModeToggle />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang("tr")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
                  lang === "tr"
                    ? "bg-white text-[var(--color-primary)] border-white"
                    : "bg-transparent text-white border-white/30 hover:bg-white/10"
                }`}
              >
                TR
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
                  lang === "en"
                    ? "bg-white text-[var(--color-primary)] border-white"
                    : "bg-transparent text-white border-white/30 hover:bg-white/10"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}