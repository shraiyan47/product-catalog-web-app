import { POST } from "../../app/api/login/route"
import { readMockUsers } from "../../lib/mockData"
import { signToken } from "../../lib/jwt"
import jest from "jest" // Declare the jest variable

// Mock dependencies
jest.mock("../../lib/mockData")
jest.mock("../../lib/jwt")

describe("/api/login", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns success for valid credentials", async () => {
    const mockUsers = [{ id: "user_1", email: "test@example.com", password: "123456", name: "Test User" }]
    readMockUsers.mockReturnValue(mockUsers)
    signToken.mockReturnValue("fake-jwt-token")

    const request = new Request("http://localhost/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", password: "123456" }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.token).toBe("fake-jwt-token")
    expect(data.user).toEqual({
      id: "user_1",
      email: "test@example.com",
      name: "Test User",
    })
  })

  it("returns error for invalid credentials", async () => {
    const mockUsers = [{ id: "user_1", email: "test@example.com", password: "123456", name: "Test User" }]
    readMockUsers.mockReturnValue(mockUsers)

    const request = new Request("http://localhost/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", password: "wrong" }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.error).toBe("Invalid credentials")
  })

  it("returns error for missing credentials", async () => {
    const request = new Request("http://localhost/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com" }), // missing password
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe("Email and password are required")
  })
})
