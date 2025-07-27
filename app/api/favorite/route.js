import { NextResponse } from "next/server"
import { getTokenFromRequest, verifyToken } from "../../../lib/jwt"
import { readMockFavorites, writeMockFavorites } from "../../../lib/mockData"

export async function POST(request) {
  try {
    const token = getTokenFromRequest(request)

    if (!token) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const { productId, action } = await request.json()

    if (!productId || !action) {
      return NextResponse.json({ success: false, error: "Product ID and action are required" }, { status: 400 })
    }

    const userId = decoded.userId
    const allFavorites = readMockFavorites()

    if (!allFavorites[userId]) {
      allFavorites[userId] = []
    }

    if (action === "add") {
      if (!allFavorites[userId].includes(productId)) {
        allFavorites[userId].push(productId)
      }
    } else if (action === "remove") {
      allFavorites[userId] = allFavorites[userId].filter((id) => id !== productId)
    }

    const success = writeMockFavorites(allFavorites)

    if (!success) {
      return NextResponse.json({ success: false, error: "Failed to update favorites" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      favorites: allFavorites[userId],
    })
  } catch (error) {
    console.error("Favorite endpoint error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
