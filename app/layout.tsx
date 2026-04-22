import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
    title: "Nocturnal Architect",
    description: "Design, plan and analyze",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html
                lang="en"
                className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${inter.className} h-full dark antialiased`}
            >
                <body className="min-h-full flex flex-col">{children}</body>
            </html>
        </ViewTransitions>
    );
}
