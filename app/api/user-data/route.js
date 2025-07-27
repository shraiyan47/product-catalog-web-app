import { NextResponse } from "next/server"
import { getTokenFromRequest, verifyToken } from "../../../lib/jwt"
import { readMockFavorites, readMockCart } from "../../../lib/mockData"

export async function GET(request) {
  try {
    const token = getTokenFromRequest(request)

    if (!token) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const userId = decoded.userId

    // Read user's favorites and cart
    const allFavorites = readMockFavorites()
    const allCarts = readMockCart()

    const userFavorites = allFavorites[userId] || []
    const userCart = allCarts[userId] || []

    return NextResponse.json({
      success: true,
      data: {
        favorites: userFavorites,
        cart: userCart,
      },
    })
  } catch (error) {
    console.error("User data endpoint error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
