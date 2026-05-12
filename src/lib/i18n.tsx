"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "tr" | "en";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (tr: string, en: string) => string;
} | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");
  const t = (tr: string, en: string) => (lang === "tr" ? tr : en);
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}