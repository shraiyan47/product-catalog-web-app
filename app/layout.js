import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "./components/Navigation"
import StoreInitializer from "./components/StoreInitializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Modern Product Catalog",
  description: "A clean, modern product catalog with JWT authentication and Zustand state management",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <StoreInitializer />
          <Navigation />
          <main className="pt-16">{children}</main>
        </div>
      </body>
    </html>
  )
}
