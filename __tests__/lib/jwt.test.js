import { signToken, verifyToken } from "../../lib/jwt"
import jest from "jest"

// Mock jsonwebtoken
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}))

const jwt = require("jsonwebtoken")

describe("JWT utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("signToken", () => {
    it("signs token with correct payload and options", () => {
      const payload = { userId: "user_1", email: "test@example.com" }
      jwt.sign.mockReturnValue("signed-token")

      const result = signToken(payload)

      expect(jwt.sign).toHaveBeenCalledWith(payload, expect.any(String), { expiresIn: "24h" })
      expect(result).toBe("signed-token")
    })
  })

  describe("verifyToken", () => {
    it("verifies valid token", () => {
      const mockPayload = { userId: "user_1", email: "test@example.com" }
      jwt.verify.mockReturnValue(mockPayload)

      const result = verifyToken("valid-token")

      expect(jwt.verify).toHaveBeenCalledWith("valid-token", expect.any(String))
      expect(result).toBe(mockPayload)
    })

    it("returns null for invalid token", () => {
      jwt.verify.mockImplementation(() => {
        throw new Error("Invalid token")
      })

      const result = verifyToken("invalid-token")

      expect(result).toBeNull()
    })
  })
})
