import { NextResponse } from "next/server"
import { getTokenFromRequest, verifyToken } from "../../../lib/jwt"
import { readMockCart, writeMockCart } from "../../../lib/mockData"

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

    const { action, productId, quantity, product } = await request.json()

    if (!action) {
      return NextResponse.json({ success: false, error: "Action is required" }, { status: 400 })
    }

    const userId = decoded.userId
    const allCarts = readMockCart()

    if (!allCarts[userId]) {
      allCarts[userId] = []
    }

    let userCart = allCarts[userId]

    switch (action) {
      case "add":
        if (!product) {
          return NextResponse.json(
            { success: false, error: "Product data is required for add action" },
            { status: 400 },
          )
        }

        const existingItem = userCart.find((item) => item.productId === productId)
        if (existingItem) {
          existingItem.quantity += 1
        } else {
          userCart.push({
            productId,
            quantity: 1,
            product,
          })
        }
        break

      case "update":
        if (quantity === undefined) {
          return NextResponse.json({ success: false, error: "Quantity is required for update action" }, { status: 400 })
        }

        if (quantity <= 0) {
          userCart = userCart.filter((item) => item.productId !== productId)
        } else {
          const item = userCart.find((item) => item.productId === productId)
          if (item) {
            item.quantity = quantity
          }
        }
        break

      case "remove":
        userCart = userCart.filter((item) => item.productId !== productId)
        break

      case "clear":
        userCart = []
        break

      default:
        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }

    allCarts[userId] = userCart
    const success = writeMockCart(allCarts)

    if (!success) {
      return NextResponse.json({ success: false, error: "Failed to update cart" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      cart: userCart,
    })
  } catch (error) {
    console.error("Cart endpoint error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
