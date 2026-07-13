import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist_Mono({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "CodeBroker | The agent that lives in your codebase";
const description =
  "CodeBroker is an MCP server that indexes your repository and hands AI coding tools like Claude Code, Cursor and Antigravity the exact files and context they need.";

export const metadata: Metadata = {
  metadataBase: new URL("https://codebroker.space"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "CodeBroker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-grid">{children}</body>
    </html>
  );
}
