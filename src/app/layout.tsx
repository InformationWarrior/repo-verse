import type { Metadata } from "next";
import { geistSans, geistMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repo Verse",
  description: "Repo Verse",
  icons: {
    icon: "/favicon.ico",
  },
  authors: [
    {
      name: "Information Warrior",
      url: "https://github.com/InformationWarrior",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
