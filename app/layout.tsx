import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import BackgroundEffects from "@/components/BackgroundEffects";
import TikTokPixel from "@/components/TikTokPixel";

export const metadata: Metadata = {
  title: "Web3Nova",
  description: "Web3 development and design agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-blue-500 selection:text-white relative">
        <Suspense fallback={null}>
          <TikTokPixel />
        </Suspense>
        <BackgroundEffects />
        {children}
      </body>
    </html>
  );
}
