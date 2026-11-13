import type { Metadata } from "next"
import "./globals.scss"

const basePath = process.env.GITHUB_PAGES === "true" ? "/AlgoLens" : ""

export const metadata: Metadata = {
  title: "AlgoLens – Interactive CS Visualizations",
  description:
    "AlgoLens — 100+ interactive visualizers for algorithms, data structures, physics, mathematics, machine learning, games, and computer science.",
  applicationName: "AlgoLens",
  metadataBase: new URL("https://mnarulabuilds.github.io/AlgoLens/"),
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: `${basePath}/favicon.ico`,
    apple: `${basePath}/apple-touch-icon.png`,
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
