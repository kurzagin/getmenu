import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const displayFont = DM_Sans({ variable: "--font-display", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://menu.getstore.my.id"),
  title: { default: "GetMenu — Menu digital untuk restoran", template: "%s | GetMenu" },
  description: "Menu digital untuk restoran, kafe, dan kedai. Mulai dari Rp150.000.",
  alternates: { canonical: "/" },
  openGraph: { title: "GetMenu by GetStore", description: "Menu digital yang membantu pelanggan memilih lebih cepat.", url: "https://menu.getstore.my.id", siteName: "GetMenu" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" className={`${displayFont.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full">{children}</body></html>;
}
