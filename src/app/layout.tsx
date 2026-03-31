import type { Metadata } from "next";
import { Noto_Serif_SC, Noto_Sans_SC, Unbounded } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import ImageProtection from "@/components/ImageProtection";
import "./globals.css";

const logoSC = localFont({
  src: "../../public/LogoSCUnboundedSans-Regular-2.ttf",
  variable: "--font-logo-sc",
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  preload: false,
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-body",
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Yannice | UX/UI Product Designer",
  description: "Portfolio of Yannice, a UX/UI Product Designer specializing in hardware and system UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans">
      <body className={`${notoSerifSC.variable} ${notoSansSC.variable} ${unbounded.variable} ${logoSC.variable}`}>
        <ImageProtection />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
