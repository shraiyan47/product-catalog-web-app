"use client"

import Link from "next/link"
import { useState } from "react"
import { Heart, ShoppingCart, User, LogOut } from "lucide-react"
import useAuthStore from "../../store/authStore"
import useCartStore from "../../store/cartStore"
import useFavoritesStore from "../../store/favoritesStore"
import LogoutConfirmModal from "./LogoutConfirmModal"

export default function Navigation() {
  const { user, logout } = useAuthStore()
  const favorites = useFavoritesStore((state) => state.items)
  const getCartItemCount = useCartStore((state) => state.getCartItemCount)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true)

    // Add a small delay to show the loading state
    await new Promise((resolve) => setTimeout(resolve, 500))

    logout()
    setIsLoggingOut(false)
    setShowLogoutModal(false)
  }

  const handleLogoutCancel = () => {
    setShowLogoutModal(false)
  }

  return (
    <>
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
                    onClick={handleLogoutClick}
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

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
      />
    </>
  )
}
