// Fake Store API integration with caching
let cachedProducts = null
let cacheTimestamp = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getProducts() {
  const now = Date.now()

  // Return cached data if still valid
  if (cachedProducts && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
    return cachedProducts
  }

  try {
    const response = await fetch("https://fakestoreapi.com/products")
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    const products = await response.json()

    // Update cache
    cachedProducts = products
    cacheTimestamp = now

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    // Return empty array on error
    return []
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!response.ok) {
      throw new Error("Product not found")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function getCategories() {
  try {
    const response = await fetch("https://fakestoreapi.com/products/categories")
    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
