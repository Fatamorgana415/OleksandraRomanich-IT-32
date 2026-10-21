import type { Metadata } from "next";
import { Unbounded, Onest } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Unbounded({
  subsets: ["cyrillic", "latin"],
  variable: "--font-display",
});

const body = Onest({
  subsets: ["cyrillic", "latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Шлях — туристичний портал",
    template: "%s · Шлях",
  },
  description: "Маршрути по Україні та Європі: напрямки, сезони, тривалість поїздок.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
