"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAuth } from "../contexts/AuthContext"
import { setCurrentUser as setCartUser, loadUserCart } from "../store/slices/cartSlice"
import { setCurrentUser as setFavoritesUser, loadUserFavorites } from "../store/slices/favoritesSlice"

export default function AuthListener() {
  const dispatch = useDispatch()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // Set current user in both slices
      dispatch(setCartUser(user.id))
      dispatch(setFavoritesUser(user.id))

      // Load user data
      dispatch(loadUserCart())
      dispatch(loadUserFavorites())
    } else {
      // Clear user data on logout
      dispatch(setCartUser(null))
      dispatch(setFavoritesUser(null))
    }
  }, [user, dispatch])

  return null // This component doesn't render anything
}
