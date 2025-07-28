import { create } from "zustand"
import { devtools, subscribeWithSelector } from "zustand/middleware"

const useFavoritesStore = create()(
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

      // Load user favorites
      loadUserFavorites: async () => {
        const { currentUserId } = get()
        if (!currentUserId) return

        set({ isLoading: true, error: null })

        try {
          const token = localStorage.getItem("token")
          if (!token) throw new Error("No token")

          const response = await fetch("/api/user-data", {
            headers: { Authorization: `Bearer ${token}` },
          })

          if (!response.ok) throw new Error("Failed to load favorites")

          const data = await response.json()
          set({ isLoading: false, items: data.data.favorites || [] })
        } catch (error) {
          set({ isLoading: false, error: error.message })
        }
      },

      // Add to favorites
      addToFavorites: async (product) => {
        const { currentUserId } = get()
        if (!currentUserId) return false

        set({ error: null })

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
          set({ items: data.favorites })

          return true
        } catch (error) {
          set({ error: error.message })
          return false
        }
      },

      // Remove from favorites
      removeFromFavorites: async (productId) => {
        const { currentUserId } = get()
        if (!currentUserId) return false

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
          set({ items: data.favorites })

          return true
        } catch (error) {
          set({ error: error.message })
          return false
        }
      },

      // Check if product is favorite
      isFavorite: (productId) => {
        const { items } = get()
        return items.includes(productId.toString())
      },
    })),
    { name: "favorites-store" },
  ),
)

export default useFavoritesStore
