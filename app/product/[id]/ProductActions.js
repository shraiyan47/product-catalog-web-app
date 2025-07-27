"use client"

import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "../../contexts/CartContext"
import { useAuth } from "../../contexts/AuthContext"

export default function ProductActions({ product }) {
  const { addToFavorites, removeFromFavorites, addToCart, isFavorite } = useCart()
  const { user } = useAuth()

  const handleFavoriteClick = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
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

      {!user && (
        <p className="text-sm text-gray-500 text-center">Please log in to add items to your cart or favorites</p>
      )}
    </div>
  )
}
