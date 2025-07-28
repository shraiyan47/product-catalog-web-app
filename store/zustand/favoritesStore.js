import { create } from "zustand"
import { devtools, subscribeWithSelector } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

const useFavoritesStore = create()(
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
        loadUserFavorites: async () => {
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

            if (!response.ok) throw new Error("Failed to load favorites")

            const data = await response.json()

            set((state) => {
              state.isLoading = false
              state.items = data.data.favorites || []
            })
          } catch (error) {
            set((state) => {
              state.isLoading = false
              state.error = error.message
            })
          }
        },

        addToFavorites: async (product) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const token = localStorage.getItem("token")
            if (!token) throw new Error("No token")

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

            if (!response.ok) throw new Error("Failed to add to favorites")

            const data = await response.json()

            set((state) => {
              state.isLoading = false
              state.items = data.favorites
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

        removeFromFavorites: async (productId) => {
          try {
            const token = localStorage.getItem("token")
            if (!token) throw new Error("No token")

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

            if (!response.ok) throw new Error("Failed to remove from favorites")

            const data = await response.json()

            set((state) => {
              state.items = data.favorites
            })

            return true
          } catch (error) {
            set((state) => {
              state.error = error.message
            })
            return false
          }
        },

        // Computed values
        isFavorite: (productId) => {
          const { items } = get()
          return items.includes(productId.toString())
        },
      })),
    ),
    { name: "favorites-store" },
  ),
)

export default useFavoritesStore
