"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { LangProvider } from "@/lib/i18n";
import CookieBanner from "./CookieBanner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="system"
        enableSystem
        enableColorScheme={false}
      >
        <LangProvider>
          {children}
          <CookieBanner />
        </LangProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}