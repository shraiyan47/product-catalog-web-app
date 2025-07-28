import { create } from "zustand"
import { devtools, subscribeWithSelector } from "zustand/middleware"

const useCartStore = create()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // State
      items: [],
      isLoading: false,
      error: null,
      currentUserId: null,

      // Actions
      setCurrentUser: (userId) => {
        set({ currentUserId: userId })
        if (!userId) {
          set({ items: [] })
        }
      },

      clearError: () => set({ error: null }),

      // Load user cart data
      loadUserCart: async () => {
        const { currentUserId } = get()
        if (!currentUserId) return

        set({ isLoading: true, error: null })

        try {
          const token = localStorage.getItem("token")
          if (!token) throw new Error("No token")

          const response = await fetch("/api/user-data", {
            headers: { Authorization: `Bearer ${token}` },
          })

          if (!response.ok) throw new Error("Failed to load cart")

          const data = await response.json()
          set({ isLoading: false, items: data.data.cart || [] })
        } catch (error) {
          set({ isLoading: false, error: error.message })
        }
      },

      // Add product to cart
      addToCart: async (product) => {
        const { currentUserId } = get()
        if (!currentUserId) return false

        set({ error: null })

        try {
          const token = localStorage.getItem("token")
          if (!token) throw new Error("No token")

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

          if (!response.ok) throw new Error("Failed to add to cart")

          const data = await response.json()
          set({ items: data.cart })

          return true
        } catch (error) {
          set({ error: error.message })
          return false
        }
      },

      // Remove product from cart
      removeFromCart: async (productId) => {
        const { currentUserId } = get()
        if (!currentUserId) return false

        try {
          const token = localStorage.getItem("token")
          if (!token) throw new Error("No token")

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

          if (!response.ok) throw new Error("Failed to remove from cart")

          const data = await response.json()
          set({ items: data.cart })

          return true
        } catch (error) {
          set({ error: error.message })
          return false
        }
      },

      // Update product quantity
      updateQuantity: async (productId, quantity) => {
        const { currentUserId } = get()
        if (!currentUserId) return false

        try {
          const token = localStorage.getItem("token")
          if (!token) throw new Error("No token")

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

          if (!response.ok) throw new Error("Failed to update quantity")

          const data = await response.json()
          set({ items: data.cart })

          return true
        } catch (error) {
          set({ error: error.message })
          return false
        }
      },

      // Clear entire cart
      clearCart: async () => {
        const { currentUserId } = get()
        if (!currentUserId) return false

        try {
          const token = localStorage.getItem("token")
          if (!token) throw new Error("No token")

          const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ action: "clear" }),
          })

          if (!response.ok) throw new Error("Failed to clear cart")

          const data = await response.json()
          set({ items: data.cart })

          return true
        } catch (error) {
          set({ error: error.message })
          return false
        }
      },

      // Computed values (getters)
      getCartItemCount: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getCartTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => {
          const price = item.product?.price || 0
          return total + price * item.quantity
        }, 0)
      },

      getCartSubtotal: () => {
        return get().getCartTotal()
      },

      getTax: () => {
        return get().getCartSubtotal() * 0.08 // 8% tax
      },

      getShipping: () => {
        return get().getCartSubtotal() > 50 ? 0 : 9.99 // Free shipping over $50
      },

      getFinalTotal: () => {
        const { getCartSubtotal, getTax, getShipping } = get()
        return getCartSubtotal() + getTax() + getShipping()
      },
    })),
    { name: "cart-store" },
  ),
)

export default useCartStore
