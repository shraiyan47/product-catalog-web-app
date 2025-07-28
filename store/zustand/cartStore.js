import { create } from "zustand"
import { devtools, subscribeWithSelector } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

const useCartStore = create()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        // State
        items: [],
        isLoading: false,
        error: null,
        currentUserId: null,

        // Actions
        setCurrentUser: (userId) =>
          set((state) => {
            state.currentUserId = userId
            if (!userId) {
              state.items = []
            }
          }),

        clearError: () =>
          set((state) => {
            state.error = null
          }),

        // Async actions
        loadUserCart: async () => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const token = localStorage.getItem("token")
            if (!token) throw new Error("No token")

            const response = await fetch("/api/user-data", {
              headers: { Authorization: `Bearer ${token}` },
            })

            if (!response.ok) throw new Error("Failed to load cart")

            const data = await response.json()

            set((state) => {
              state.isLoading = false
              state.items = data.data.cart || []
            })
          } catch (error) {
            set((state) => {
              state.isLoading = false
              state.error = error.message
            })
          }
        },

        addToCart: async (product) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

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

            set((state) => {
              state.isLoading = false
              state.items = data.cart
            })

            return true
          } catch (error) {
            set((state) => {
              state.isLoading = false
              state.error = error.message
            })
            return false
          }
        },

        removeFromCart: async (productId) => {
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

            set((state) => {
              state.items = data.cart
            })

            return true
          } catch (error) {
            set((state) => {
              state.error = error.message
            })
            return false
          }
        },

        updateQuantity: async (productId, quantity) => {
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

            set((state) => {
              state.items = data.cart
            })

            return true
          } catch (error) {
            set((state) => {
              state.error = error.message
            })
            return false
          }
        },

        clearCart: async () => {
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

            set((state) => {
              state.items = data.cart
            })

            return true
          } catch (error) {
            set((state) => {
              state.error = error.message
            })
            return false
          }
        },

        // Computed values (selectors)
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
    ),
    { name: "cart-store" },
  ),
)

export default useCartStore
