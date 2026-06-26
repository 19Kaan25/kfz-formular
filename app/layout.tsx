import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KFZ-Anfrage – Thiele Finanz GmbH",
  description: "Füllen Sie das Formular aus, damit wir Ihnen ein passendes KFZ-Versicherungsangebot erstellen können.",
  metadataBase: new URL("https://koeten-tfgmbh.vercel.app"),
  openGraph: {
    title: "KFZ-Anfrage – Thiele Finanz GmbH",
    description: "Füllen Sie das Formular aus, damit wir Ihnen ein passendes KFZ-Versicherungsangebot erstellen können.",
    siteName: "Thiele Finanz GmbH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
