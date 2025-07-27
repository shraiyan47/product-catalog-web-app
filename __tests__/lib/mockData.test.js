import fs from "fs"
import { readMockUsers, readMockFavorites, writeMockFavorites } from "../../lib/mockData"
import jest from "jest" // Declare the jest variable

// Mock fs module
jest.mock("fs")

describe("Mock Data utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("readMockUsers", () => {
    it("reads and parses user data correctly", () => {
      const mockUsers = [{ id: "user_1", email: "test1@example.com", password: "123456" }]
      fs.readFileSync.mockReturnValue(JSON.stringify(mockUsers))

      const result = readMockUsers()

      expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining("mock-users.json"), "utf8")
      expect(result).toEqual(mockUsers)
    })

    it("returns empty array on error", () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("File not found")
      })

      const result = readMockUsers()

      expect(result).toEqual([])
    })
  })

  describe("readMockFavorites", () => {
    it("reads and parses favorites data correctly", () => {
      const mockFavorites = { user_1: ["1", "2"], user_2: ["3"] }
      fs.readFileSync.mockReturnValue(JSON.stringify(mockFavorites))

      const result = readMockFavorites()

      expect(result).toEqual(mockFavorites)
    })

    it("returns empty object on error", () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("File not found")
      })

      const result = readMockFavorites()

      expect(result).toEqual({})
    })
  })

  describe("writeMockFavorites", () => {
    it("writes favorites data correctly", () => {
      const mockFavorites = { user_1: ["1", "2"] }
      fs.writeFileSync.mockReturnValue(undefined)

      const result = writeMockFavorites(mockFavorites)

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("mock-favorites.json"),
        JSON.stringify(mockFavorites, null, 2),
      )
      expect(result).toBe(true)
    })

    it("returns false on error", () => {
      fs.writeFileSync.mockImplementation(() => {
        throw new Error("Write failed")
      })

      const result = writeMockFavorites({})

      expect(result).toBe(false)
    })
  })
})
