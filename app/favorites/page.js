"use client"

import { useState, useEffect } from "react"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { getProductById } from "../lib/products"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react"

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, addToCart, isLoading } = useCart()
  const { user } = useAuth()
  const [favoriteProducts, setFavoriteProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)

  useEffect(() => {
    if (favorites.length > 0) {
      loadFavoriteProducts()
    } else {
      setFavoriteProducts([])
    }
  }, [favorites])

  const loadFavoriteProducts = async () => {
    setLoadingProducts(true)
    try {
      const products = await Promise.all(
        favorites.map(async (productId) => {
          const product = await getProductById(productId)
          return product
        }),
      )
      setFavoriteProducts(products.filter(Boolean)) // Filter out null products
    } catch (error) {
      console.error("Failed to load favorite products:", error)
    } finally {
      setLoadingProducts(false)
    }
  }

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

  if (isLoading || loadingProducts) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    )
  }

  if (favoriteProducts.length === 0) {
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
          {favoriteProducts.length} {favoriteProducts.length === 1 ? "item" : "items"} in your favorites
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteProducts.map((product) => (
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
