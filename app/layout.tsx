import type { Metadata } from "next"
import "./globals.scss"

export const metadata: Metadata = {
  title: "AlgoLens – Interactive CS Visualizations",
  description:
    "AlgoLens — 100+ interactive visualizers for algorithms, data structures, physics, mathematics, machine learning, games, and computer science.",
  applicationName: "AlgoLens",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "AlgoLens – Interactive CS Visualizations",
    description:
      "Explore 100+ interactive visualizers for algorithms, data structures, physics, math, games, and more.",
    type: "website",
    siteName: "AlgoLens",
    locale: "en_US",
    images: ["/logo512.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlgoLens – Interactive CS Visualizations",
    description:
      "Explore 100+ interactive visualizers for algorithms, data structures, physics, math, games, and more.",
    images: ["/logo512.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
