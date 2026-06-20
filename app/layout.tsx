import type { Metadata } from "next";
import { Asta_Sans } from "next/font/google";
import "./globals.css";

const astaSans = Asta_Sans({
    variable: "--font-asta-sans",
    subsets: ["latin"],
    display: "swap",
    fallback: ["Arial", "sans-serif"],
    adjustFontFallback: false,
});

export const metadata: Metadata = {
    metadataBase: new URL("https://littlemusicworlds.net"),
    title: "Little Music Worlds",
    description: "Step into little music worlds.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${astaSans.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col" suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
