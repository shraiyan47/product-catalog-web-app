"use client"

import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import useCartStore from "../store/zustand/cartStore"
import useFavoritesStore from "../store/zustand/favoritesStore"

export default function AuthListenerZustand() {
  const { user } = useAuth()
  const { setCurrentUser: setCartUser, loadUserCart } = useCartStore()
  const { setCurrentUser: setFavoritesUser, loadUserFavorites } = useFavoritesStore()

  useEffect(() => {
    if (user) {
      // Set current user in both stores
      setCartUser(user.id)
      setFavoritesUser(user.id)

      // Load user data
      loadUserCart()
      loadUserFavorites()
    } else {
      // Clear user data on logout
      setCartUser(null)
      setFavoritesUser(null)
    }
  }, [user, setCartUser, setFavoritesUser, loadUserCart, loadUserFavorites])

  return null // This component doesn't render anything
}
