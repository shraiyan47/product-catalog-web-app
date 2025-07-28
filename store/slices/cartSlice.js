import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunks for API calls
export const loadUserCart = createAsyncThunk("cart/loadUserCart", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No token")

    const response = await fetch("/api/user-data", {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) throw new Error("Failed to load cart")

    const data = await response.json()
    return data.data.cart || []
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const addToCartAsync = createAsyncThunk("cart/addToCartAsync", async (product, { rejectWithValue }) => {
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
    return data.cart
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (productId, { rejectWithValue }) => {
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
      return data.cart
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantityAsync",
  async ({ productId, quantity }, { rejectWithValue }) => {
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
      return data.cart
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const clearCartAsync = createAsyncThunk("cart/clearCartAsync", async (_, { rejectWithValue }) => {
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
    return data.cart
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const cartSlice = createSlice({
  name: "cart",
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
      // Load user cart
      .addCase(loadUserCart.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loadUserCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(loadUserCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Add to cart
      .addCase(addToCartAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Remove from cart
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.error = action.payload
      })

      // Update quantity
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(updateQuantityAsync.rejected, (state, action) => {
        state.error = action.payload
      })

      // Clear cart
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { setCurrentUser, clearError } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartLoading = (state) => state.cart.isLoading
export const selectCartError = (state) => state.cart.error
export const selectCartItemCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => {
    const price = item.product?.price || 0
    return total + price * item.quantity
  }, 0)

export default cartSlice.reducer
