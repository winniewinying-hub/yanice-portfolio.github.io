import type { Metadata } from "next";
import { Noto_Serif_SC, Noto_Sans_SC, Unbounded } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
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
      <body className={`${notoSerifSC.variable} ${notoSansSC.variable} ${unbounded.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
