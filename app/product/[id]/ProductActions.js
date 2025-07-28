"use client"

import { useState } from "react"
import { Heart, ShoppingCart } from "lucide-react"
import useAuthStore from "../../../store/authStore"
import useCartStore from "../../../store/cartStore"
import useFavoritesStore from "../../../store/favoritesStore"

export default function ProductActions({ product }) {
  const { user } = useAuthStore()
  const { addToCart } = useCartStore()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleFavoriteClick = async () => {
    if (!user) return

    if (isFavorite(product.id)) {
      await removeFromFavorites(product.id)
    } else {
      await addToFavorites(product)
    }
  }

  const handleAddToCart = async () => {
    if (!user) return

    setIsAddingToCart(true)
    await addToCart(product)

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
