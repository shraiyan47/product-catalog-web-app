import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunks for favorites API calls
export const loadUserFavorites = createAsyncThunk("favorites/loadUserFavorites", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No token")

    const response = await fetch("/api/user-data", {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) throw new Error("Failed to load favorites")

    const data = await response.json()
    return data.data.favorites || []
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const addToFavoritesAsync = createAsyncThunk(
  "favorites/addToFavoritesAsync",
  async (product, { rejectWithValue }) => {
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
      return data.favorites
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const removeFromFavoritesAsync = createAsyncThunk(
  "favorites/removeFromFavoritesAsync",
  async (productId, { rejectWithValue }) => {
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
      return data.favorites
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    currentUserId: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload
      if (!action.payload) {
        state.items = []
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Load user favorites
      .addCase(loadUserFavorites.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loadUserFavorites.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(loadUserFavorites.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Add to favorites
      .addCase(addToFavoritesAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addToFavoritesAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(addToFavoritesAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Remove from favorites
      .addCase(removeFromFavoritesAsync.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(removeFromFavoritesAsync.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { setCurrentUser, clearError } = favoritesSlice.actions

// Selectors
export const selectFavoriteItems = (state) => state.favorites.items
export const selectFavoritesLoading = (state) => state.favorites.isLoading
export const selectFavoritesError = (state) => state.favorites.error
export const selectIsFavorite = (productId) => (state) => state.favorites.items.includes(productId.toString())

export default favoritesSlice.reducer
