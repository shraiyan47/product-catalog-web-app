"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [currentUserId, setCurrentUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Listen for auth changes
    const handleAuthChange = (event) => {
      if (event.type === "auth-login") {
        const userId = event.detail.userId
        setCurrentUserId(userId)
        loadUserData(userId)
      } else if (event.type === "auth-logout") {
        setCurrentUserId(null)
        setFavorites([])
        setCart([])
      }
    }

    // Listen for auth events
    window.addEventListener("auth-login", handleAuthChange)
    window.addEventListener("auth-logout", handleAuthChange)

    return () => {
      window.removeEventListener("auth-login", handleAuthChange)
      window.removeEventListener("auth-logout", handleAuthChange)
    }
  }, [])

  const loadUserData = async (userId) => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token")

      if (!token) return

      const response = await fetch("/api/user-data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setFavorites(data.data.favorites || [])
        setCart(data.data.cart || [])
      }
    } catch (error) {
      console.error("Failed to load user data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addToFavorites = async (product) => {
    if (!currentUserId) return false

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id.toString(),
          action: "add",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setFavorites(data.favorites)
        return true
      }
    } catch (error) {
      console.error("Failed to add to favorites:", error)
    }
    return false
  }

  const removeFromFavorites = async (productId) => {
    if (!currentUserId) return false

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId.toString(),
          action: "remove",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setFavorites(data.favorites)
        return true
      }
    } catch (error) {
      console.error("Failed to remove from favorites:", error)
    }
    return false
  }

  const addToCart = async (product) => {
    if (!currentUserId) return false

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "add",
          productId: product.id.toString(),
          product: product,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setCart(data.cart)
        return true
      }
    } catch (error) {
      console.error("Failed to add to cart:", error)
    }
    return false
  }

  const removeFromCart = async (productId) => {
    if (!currentUserId) return false

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "remove",
          productId: productId.toString(),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setCart(data.cart)
        return true
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error)
    }
    return false
  }

  const updateQuantity = async (productId, quantity) => {
    if (!currentUserId) return false

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "update",
          productId: productId.toString(),
          quantity: quantity,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setCart(data.cart)
        return true
      }
    } catch (error) {
      console.error("Failed to update quantity:", error)
    }
    return false
  }

  const clearCart = async () => {
    if (!currentUserId) return false

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "clear",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setCart(data.cart)
        return true
      }
    } catch (error) {
      console.error("Failed to clear cart:", error)
    }
    return false
  }

  const isFavorite = (productId) => {
    return favorites.includes(productId.toString())
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || 0
      return total + price * item.quantity
    }, 0)
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
        currentUserId,
        isLoading,
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
