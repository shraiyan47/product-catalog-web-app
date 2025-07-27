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
  const [loginAction, setLoginAction] = useState(null) // 'details' or 'favorite'
  const router = useRouter()

  const handleFavoriteClick = (e) => {
    e.preventDefault()

    if (!user) {
      setLoginAction("favorite")
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
      setLoginAction("details")
      setShowLoginModal(true)
      return
    }

    router.push(`/product/${product.id}`)
  }

  const handleLoginRedirect = () => {
    if (loginAction === "details") {
      setLoginRedirect(`/product/${product.id}`)
    } else if (loginAction === "favorite") {
      // For favorites, we'll handle the action after login via the auth event
      setLoginRedirect(window.location.pathname)
    }

    setShowLoginModal(false)
    router.push("/login")
  }

  const getModalMessage = () => {
    if (loginAction === "favorite") {
      return "You need to be logged in to add products to favorites."
    }
    return "You need to be logged in to view product details."
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
        message={getModalMessage()}
      />
    </>
  )
}
