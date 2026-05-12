"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export default function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLang();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="w-24 h-9" />;

  const isDark = resolvedTheme === "dark";
  const label = isDark ? t("Aydınlık Mod", "Light Mode") : t("Karanlık Mod", "Dark Mode");

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
        isDark
          ? "border-white/30 text-white hover:bg-white/10"
          : "border-white/30 text-white hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}