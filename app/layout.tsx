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
  description: "KFZ-Versicherungsanfrage – Thiele Finanz GmbH",
  metadataBase: new URL("https://koeten-tfgmbh.vercel.app"),
  openGraph: {
    title: "KFZ-Anfrage – Thiele Finanz GmbH",
    description: "Füllen Sie das Formular aus, damit wir Ihnen ein passendes KFZ-Versicherungsangebot erstellen können.",
    images: [{ url: "/tfgmbh.jpeg", width: 400, height: 400 }],
    siteName: "Thiele Finanz GmbH",
  },
  icons: {
    icon: "/tfgmbh.jpeg",
    apple: "/tfgmbh.jpeg",
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
