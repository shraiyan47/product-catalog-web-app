import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import Navigation from "./components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Product Catalog App", // Title of the application
  icons: { // Icons for the application
    icon: "/favicon.ico",
  },
  description: "A product catalog app with favorites and cart functionality",
  author: "Shahadat Hossain (https://github.com/shraiyan47)",
  keywords: "product catalog, e-commerce, favorites, cart, next.js, react, context api, tailwind css, shraiyan47",
  openGraph: { // Open Graph metadata for social media sharing
    title: "Product Catalog App",
    description: "A product catalog app with favorites and cart functionality",
    url: "https://e-product-catalog.vercel.app/",
    siteName: "Product Catalog App",
  }

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="pt-16">{children}</main>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
