import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Seyyah",
  description: "Türkiye'nin kültürel mirasını keşfedin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="m-0 font-sans">
        <Providers>
          <TopBar />
          <main className="min-h-[calc(100vh-56px)]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}