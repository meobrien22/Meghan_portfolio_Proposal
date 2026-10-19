import type { Metadata } from "next";
import "./globals.css";
import "./portfolio.css";
import "./launch/launch.css";
import "./launch/fluent.css";
import "./launch/analytics.css";
import "./pinboard.css";
import "./about/executive.css";
import "./bold-theme.css";
import "./peerless-theme.css";
import "./card-artwork.css";
import "./compact-layout.css";

export const metadata: Metadata = {
  title: "Meghan Fasano | Visual Design & Communications",
  description: "Executive storytelling, UX/UI leadership, presentation design and AI workshops. A visual portfolio by Meghan Fasano.",
  icons: {
    icon: "/Meghan_portfolio_Proposal/favicon.svg",
    shortcut: "/Meghan_portfolio_Proposal/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
