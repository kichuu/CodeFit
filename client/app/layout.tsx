import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthLayout } from "@/components/auth-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeFit",
  description: "AI-powered GitHub recruiting and matching platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthLayout>{children}</AuthLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}

