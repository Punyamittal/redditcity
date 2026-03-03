import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RedditCity | Your Karma, Your City",
  description: "A gamified virtual city where every Reddit user gets a building based on their karma and activity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="font-sans antialiased bg-slate-950 text-slate-50"
      >
        {children}
      </body>
    </html>
  );
}
