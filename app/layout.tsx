import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "LeetCode Pattern Tracker - Master DSA by Patterns",
    template: "%s | LeetCode Pattern Tracker"
  },

  description:
    "Track, filter, and master LeetCode problems by patterns and topics. Mark solved and revision questions, explore interview memory tricks, and learn with structured solutions designed for coding interview success.",

  keywords: [
    "LeetCode tracker",
    "DSA patterns",
    "coding interview preparation",
    "data structures and algorithms",
    "FAANG interview prep",
    "blind 75",
    "neetcode",
    "leetcode solutions",
    "pattern based problem solving",
    "software engineer interview"
  ],

  authors: [
    { name: "Ankit Raj", url: "https://ankitraj.pages.dev/" }
  ],

  creator: "Ankit Raj",
  publisher: "LeetCode Pattern Tracker",

  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },

  metadataBase: new URL("https://leetcode-pattern-tracker.vercel.app"),

  alternates: {
    canonical: "/"
  },

  openGraph: {
    title: "LeetCode Pattern Tracker - Master DSA by Patterns",
    description:
      "A modern DSA learning platform to track LeetCode questions by patterns, difficulty, and interview relevance. Built for serious coding interview preparation.",
    url: "https://leetcode-pattern-tracker.vercel.app",
    siteName: "LeetCode Pattern Tracker",
    images: [
      {
        url: "https://i.ibb.co/4Zcf8XmN/leetcode-pattern-tracker.png",
        width: 1200,
        height: 630,
        alt: "LeetCode Pattern Tracker - Pattern Based DSA Learning"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "LeetCode Pattern Tracker - Master DSA by Patterns",
    description:
      "Track solved, revision, and pattern-based LeetCode problems in a modern, interview-focused learning platform.",
    creator: "@ankitraj",
    images: ["https://i.ibb.co/4Zcf8XmN/leetcode-pattern-tracker.png"]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },

  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" }
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },

  manifest: "/manifest.json",
};


import { AuthProvider } from "@/context/AuthContext";
import FirebaseSync from "@/components/FirebaseSync";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <FirebaseSync />
          <FirebaseAnalytics />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
