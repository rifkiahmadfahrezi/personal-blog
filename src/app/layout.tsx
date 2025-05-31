// import "./globals.css"
import type { Metadata } from "next"
import { Geist } from "next/font/google"

import { RootProvider } from "fumadocs-ui/provider"
import { ProgressbarProvider } from "@/components/progressbar-provider"
import { siteConfig } from "@/config/site"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s / ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <RootProvider
          theme={{
            defaultTheme: "light",
            enableSystem: false,
            enabled: false,
          }}
        >
          <ProgressbarProvider>{children}</ProgressbarProvider>
        </RootProvider>
      </body>
    </html>
  )
}
