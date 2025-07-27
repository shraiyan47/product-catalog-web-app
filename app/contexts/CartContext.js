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
