javascript:file="app/layout.js" isMerged="true"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import Navigation from "./components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Modern Product Catalog",
  description: "A clean, modern product catalog with favorites and cart functionality",
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
javascript:file="app/components/SearchBar.js" isMerged="true"
"use client"

import { Search } from "lucide-react"

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  )
}
javascript:file="app/loading.js" isFixed="true" isMerged="true"
export default function Loading() {
  return null
}
css:file="app/globals.css" isFixed="true" isQuickEdit="true" isMerged="true"
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
typescriptreact:file="app/lib/products.js" isEdit="true" isQuickEdit="true" isMerged="true"
// Fake Store API integration with caching
let cachedProducts = null
let cacheTimestamp = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getProducts() {
  const now = Date.now()

  // Return cached data if still valid
  if (cachedProducts && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
    return cachedProducts
  }

  try {
    const response = await fetch("https://fakestoreapi.com/products")
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    const products = await response.json()

    // Update cache
    cachedProducts = products
    cacheTimestamp = now

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    // Return empty array on error
    return []
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!response.ok) {
      throw new Error("Product not found")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function getCategories() {
  try {
    const response = await fetch("https://fakestoreapi.com/products/categories")
    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
javascriptreact:file="app/components/CategoryFilter.js" isMerged="true"
"use client"

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      <button
        onClick={() => onCategoryChange("")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === "" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
            selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
typescriptreact:file="app/page.js" isEdit="true" isQuickEdit="true" isMerged="true"
"use client"

import { useState, useEffect, useMemo } from "react"
import ProductCard from "./components/ProductCard"
import SearchBar from "./components/SearchBar"
import CategoryFilter from "./components/CategoryFilter"
import { getProducts, getCategories } from "./lib/products"

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Amazing Products</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find the perfect tech accessories and gadgets for your lifestyle
        </p>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? "No products found matching your search." : "No products available."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
javascriptreact:file="app/components/LoginModal.js" isMerged="true"
"use client"

import { X } from "lucide-react"

export default function LoginModal({ isOpen, onClose, onLogin, productTitle }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Login Required</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">You need to be logged in to view product details.</p>
          {productTitle && (
            <p className="text-sm text-gray-500">
              Product: <span className="font-medium">{productTitle}</span>
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onLogin}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
typescriptreact:file="app/login/page.js" isEdit="true" isQuickEdit="true" isMerged="true"
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import Link from "next/link"
import { ArrowLeft, User, Lock, Info } from "lucide-react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, redirectUrl } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(username, password)
      if (result.success) {
        // AuthContext handles the redirect automatically
        if (!redirectUrl) {
          router.push("/")
        }
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

          {redirectUrl && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center">
                <Info className="h-4 w-4 text-blue-600 mr-2" />
                <p className="text-sm text-blue-700">You'll be redirected to the product page after login</p>
              </div>
            </div>
          )}

          <p className="mt-2 text-center text-sm text-gray-600">
            Demo credentials: username "demo", password "password"
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">{error}</div>}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
javascriptreact:file="app/cart/page.js" isMerged="true"
"use client"

import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartSubtotal, getTax, getShipping, getFinalTotal } =
    useCart()
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your cart.</p>
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>

        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some products to your cart to get started.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Continue Shopping
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <button onClick={clearCart} className="text-red-600 hover:text-red-800 text-sm font-medium">
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm capitalize mb-2">{item.category}</p>
                    <p className="text-xl font-bold text-blue-600">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="w-12 text-center font-medium">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${getCartSubtotal().toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-medium">${getTax().toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{getShipping() === 0 ? "FREE" : `$${getShipping().toFixed(2)}`}</span>
              </div>

              {getShipping() === 0 && <p className="text-sm text-green-600">🎉 You qualify for free shipping!</p>}

              <hr className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${getFinalTotal().toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
              Proceed to Checkout
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">Free shipping on orders over $50</p>
          </div>
        </div>
      </div>
    </div>
  )
}
typescriptreact:file="app/product/[id]/page.js" isEdit="true" isQuickEdit="true" isMerged="true"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import { getProductById } from "../../lib/products"
import ProductActions from "./ProductActions"

export default async function ProductDetail({ params }) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={600}
            height={600}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full capitalize">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-2 text-lg text-gray-600">
                    {product.rating.rate} out of 5 ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
            )}

            <p className="text-4xl font-bold text-blue-600 mb-6">${product.price.toFixed(2)}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <ProductActions product={product} />
        </div>
      </div>
    </div>
  )
}
typescriptreact:file="app/components/ProductCard.js" isEdit="true" isQuickEdit="true" isMerged="true"
"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart, Star } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import LoginModal from "./LoginModal"

export default function ProductCard({ product }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useCart()
  const { user, setLoginRedirect } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const router = useRouter()

  const handleFavoriteClick = (e) => {
    e.preventDefault()

    if (!user) {
      setShowLoginModal(true)
      return
    }

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const handleViewDetails = (e) => {
    e.preventDefault()

    if (!user) {
      setShowLoginModal(true)
      return
    }

    router.push(`/product/${product.id}`)
  }

  const handleLoginRedirect = () => {
    setLoginRedirect(`/product/${product.id}`)
    setShowLoginModal(false)
    router.push("/login")
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              isFavorite(product.id) ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:text-red-500"
            }`}
          >
            <Heart className="h-5 w-5" fill={isFavorite(product.id) ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>
          )}

          <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
          <button
            onClick={handleViewDetails}
            className="block w-full bg-gray-900 text-white text-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginRedirect}
        productTitle={product.title}
      />
    </>
  )
}
typescriptreact:file="app/contexts/AuthContext.js" isEdit="true" isQuickEdit="true" isMerged="true"
"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [redirectUrl, setRedirectUrl] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("user")
    const storedRedirectUrl = localStorage.getItem("redirectUrl")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    if (storedRedirectUrl) {
      setRedirectUrl(storedRedirectUrl)
    }
    setIsLoading(false)
  }, [])

  const login = async (username, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (username === "demo" && password === "password") {
      const userData = { id: 1, username, name: "Demo User" }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      // Handle redirect after login
      const storedRedirectUrl = localStorage.getItem("redirectUrl")
      if (storedRedirectUrl) {
        localStorage.removeItem("redirectUrl")
        setRedirectUrl(null)
        router.push(storedRedirectUrl)
      }

      return { success: true }
    }

    return { success: false, error: "Invalid credentials" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("redirectUrl")
    localStorage.removeItem("cart")
    localStorage.removeItem("favorites")
    setRedirectUrl(null)

    // Clear cart and favorites from context
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth-logout"))
    }
  }

  const setLoginRedirect = (url) => {
    setRedirectUrl(url)
    localStorage.setItem("redirectUrl", url)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        redirectUrl,
        setLoginRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
typescriptreact:file="app/contexts/CartContext.js" isEdit="true" isQuickEdit="true" isMerged="true"
"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    // Load from localStorage on mount
    const storedFavorites = localStorage.getItem("favorites")
    const storedCart = localStorage.getItem("cart")

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }

    // Listen for logout event to clear data
    const handleLogout = () => {
      setFavorites([])
      setCart([])
    }

    window.addEventListener("auth-logout", handleLogout)
    return () => window.removeEventListener("auth-logout", handleLogout)
  }, [])

  const addToFavorites = (product) => {
    const newFavorites = [...favorites, product]
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const removeFromFavorites = (productId) => {
    const newFavorites = favorites.filter((item) => item.id !== productId)
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    let newCart

    if (existingItem) {
      newCart = cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      newCart = [...cart, { ...product, quantity: 1 }]
    }

    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId)
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const newCart = cart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("cart")
  }

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartSubtotal = () => {
    return getCartTotal()
  }

  const getTax = () => {
    return getCartSubtotal() * 0.08 // 8% tax
  }

  const getShipping = () => {
    return getCartSubtotal() > 50 ? 0 : 9.99 // Free shipping over $50
  }

  const getFinalTotal = () => {
    return getCartSubtotal() + getTax() + getShipping()
  }

  return (
    <CartContext.Provider
      value={{
        favorites,
        cart,
        addToFavorites,
        removeFromFavorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isFavorite,
        getCartItemCount,
        getCartTotal,
        getCartSubtotal,
        getTax,
        getShipping,
        getFinalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
typescriptreact:file="app/product/[id]/ProductActions.js" isEdit="true" isQuickEdit="true" isMerged="true"
"use client"

import { useState } from "react"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "../../contexts/CartContext"
import { useAuth } from "../../contexts/AuthContext"

export default function ProductActions({ product }) {
  const { addToFavorites, removeFromFavorites, addToCart, isFavorite } = useCart()
  const { user } = useAuth()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleFavoriteClick = () => {
    if (!user) return // This shouldn't happen since page is protected

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const handleAddToCart = async () => {
    if (!user) return // This shouldn't happen since page is protected

    setIsAddingToCart(true)
    addToCart(product)

    // Show feedback
    setTimeout(() => setIsAddingToCart(false), 1000)
  }

  if (!user) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Please log in to add items to cart or favorites</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>{isAddingToCart ? "Added!" : "Add to Cart"}</span>
        </button>

        <button
          onClick={handleFavoriteClick}
          className={`px-6 py-3 rounded-md transition-colors flex items-center justify-center space-x-2 ${
            isFavorite(product.id)
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Heart className="h-5 w-5" fill={isFavorite(product.id) ? "currentColor" : "none"} />
          <span>{isFavorite(product.id) ? "Remove from Favorites" : "Add to Favorites"}</span>
        </button>
      </div>
    </div>
  )
}
typescriptreact:file="app/components/Navigation.js" isEdit="true" isQuickEdit="true" isMerged="true"
"use client"

import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { Heart, ShoppingCart, User, LogOut } from "lucide-react"

export default function Navigation() {
  const { user, logout } = useAuth()
  const { favorites, getCartItemCount } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">ProductHub</h1>
          </Link>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Favorites */}
            <Link href="/favorites" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Heart className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 hidden sm:block">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
javascriptreact:file="app/favorites/page.js" isMerged="true"
"use client"

import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react"

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, addToCart, isFavorite } = useCart()
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your favorites.</p>
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>

        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Favorites Yet</h1>
          <p className="text-gray-600 mb-6">Start adding products to your favorites to see them here.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Continue Shopping
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
        <p className="text-gray-600">
          {favorites.length} {favorites.length === 1 ? "item" : "items"} in your favorites
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => removeFromFavorites(product.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>

              {/* Category */}
              <p className="text-sm text-gray-500 capitalize mb-2">{product.category}</p>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating.rate} ({product.rating.count} reviews)
                    </span>
                  </div>
                </div>
              )}

              <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>

              <div className="flex gap-2">
                <Link
                  href={`/product/${product.id}`}
                  className="flex-1 bg-gray-900 text-white text-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  title="Add to Cart"
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}