import { create } from "zustand"
import { devtools } from "zustand/middleware"

const useAuthStore = create()(
  devtools(
    (set, get) => ({
      // State
      user: null,
      isLoading: true,
      redirectUrl: null,

      // Actions
      setUser: (user) => set({ user }),

      setLoading: (loading) => set({ isLoading: loading }),

      setRedirectUrl: (url) => {
        set({ redirectUrl: url })
        if (url) {
          localStorage.setItem("redirectUrl", url)
        }
      },

      // Initialize auth state
      initialize: async () => {
        const token = localStorage.getItem("token")
        const storedRedirectUrl = localStorage.getItem("redirectUrl")

        if (storedRedirectUrl) {
          set({ redirectUrl: storedRedirectUrl })
        }

        if (token) {
          await get().verifyToken(token)
        } else {
          set({ isLoading: false })
        }
      },

      // Verify token with server
      verifyToken: async (token) => {
        try {
          const response = await fetch("/api/me", {
            headers: { Authorization: `Bearer ${token}` },
          })

          if (response.ok) {
            const data = await response.json()
            set({ user: data.user, isLoading: false })

            // Load user data into cart and favorites stores
            const { loadUserData } = get()
            loadUserData(data.user.id)
          } else {
            localStorage.removeItem("token")
            set({ isLoading: false })
          }
        } catch (error) {
          console.error("Token verification failed:", error)
          localStorage.removeItem("token")
          set({ isLoading: false })
        }
      },

      // Login function
      login: async (email, password) => {
        try {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          })

          const data = await response.json()

          if (data.success) {
            localStorage.setItem("token", data.token)
            set({ user: data.user })

            // Load user data
            const { loadUserData } = get()
            loadUserData(data.user.id)

            return { success: true }
          } else {
            return { success: false, error: data.error }
          }
        } catch (error) {
          console.error("Login error:", error)
          return { success: false, error: "Network error occurred" }
        }
      },

      // Logout function
      logout: () => {
        set({ user: null, redirectUrl: null })
        localStorage.removeItem("token")
        localStorage.removeItem("redirectUrl")

        // Clear cart and favorites stores
        const { clearUserData } = get()
        clearUserData()
      },

      // Helper functions for cart and favorites integration
      loadUserData: (userId) => {
        // Import stores dynamically to avoid circular dependencies
        import("./cartStore").then(({ default: useCartStore }) => {
          const { setCurrentUser, loadUserCart } = useCartStore.getState()
          setCurrentUser(userId)
          loadUserCart()
        })

        import("./favoritesStore").then(({ default: useFavoritesStore }) => {
          const { setCurrentUser, loadUserFavorites } = useFavoritesStore.getState()
          setCurrentUser(userId)
          loadUserFavorites()
        })
      },

      clearUserData: () => {
        import("./cartStore").then(({ default: useCartStore }) => {
          const { setCurrentUser } = useCartStore.getState()
          setCurrentUser(null)
        })

        import("./favoritesStore").then(({ default: useFavoritesStore }) => {
          const { setCurrentUser } = useFavoritesStore.getState()
          setCurrentUser(null)
        })
      },

      // Get auth token
      getAuthToken: () => localStorage.getItem("token"),
    }),
    { name: "auth-store" },
  ),
)

export default useAuthStore
