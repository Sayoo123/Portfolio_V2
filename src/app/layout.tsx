import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { AssistantWidget } from "@/components/ai/AssistantWidget";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sayooj Sunil — Backend Engineer & Full-Stack Developer",
    template: "%s | Sayooj Sunil",
  },
  description:
    "Backend Engineer with 2+ years building scalable systems, REST APIs, and AI-powered automation tools. Available for remote roles and freelance projects.",
  keywords: [
    "backend developer",
    "Laravel developer",
    "full-stack developer",
    "PHP developer",
    "remote developer",
    "API development",
    "AI automation",
    "Sayooj Sunil",
  ],
  authors: [{ name: "Sayooj Sunil" }],
  creator: "Sayooj Sunil",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sayooj Sunil — Portfolio",
    title: "Sayooj Sunil — Backend Engineer & Full-Stack Developer",
    description:
      "Building scalable systems, REST APIs, and AI-powered tools. Available for remote roles.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayooj Sunil — Backend Engineer",
    description: "Building scalable systems & AI-powered tools. Open to remote opportunities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body suppressHydrationWarning={true}>
        {children}
        <AssistantWidget />
      </body>
    </html>
  );
}
