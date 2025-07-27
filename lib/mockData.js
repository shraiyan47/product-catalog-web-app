import fs from "fs"
import path from "path"

const MOCK_DATA_DIR = path.join(process.cwd(), "mock-data")

export function readMockUsers() {
  try {
    const filePath = path.join(MOCK_DATA_DIR, "mock-users.json")
    const data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading mock users:", error)
    return []
  }
}

export function readMockFavorites() {
  try {
    const filePath = path.join(MOCK_DATA_DIR, "mock-favorites.json")
    const data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading mock favorites:", error)
    return {}
  }
}

export function writeMockFavorites(favorites) {
  try {
    const filePath = path.join(MOCK_DATA_DIR, "mock-favorites.json")
    fs.writeFileSync(filePath, JSON.stringify(favorites, null, 2))
    return true
  } catch (error) {
    console.error("Error writing mock favorites:", error)
    return false
  }
}

export function readMockCart() {
  try {
    const filePath = path.join(MOCK_DATA_DIR, "mock-cart.json")
    const data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading mock cart:", error)
    return {}
  }
}

export function writeMockCart(cart) {
  try {
    const filePath = path.join(MOCK_DATA_DIR, "mock-cart.json")
    fs.writeFileSync(filePath, JSON.stringify(cart, null, 2))
    return true
  } catch (error) {
    console.error("Error writing mock cart:", error)
    return false
  }
}
