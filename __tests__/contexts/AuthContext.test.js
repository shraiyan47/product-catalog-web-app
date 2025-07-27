"use client"

import { render, screen, act, waitFor } from "@testing-library/react"
import { AuthProvider, useAuth } from "../../app/contexts/AuthContext"

// Test component to access auth context
const TestComponent = () => {
  const { user, login, logout, isLoading } = useAuth()

  return (
    <div>
      <div data-testid="loading">{isLoading ? "loading" : "not-loading"}</div>
      <div data-testid="user">{user ? user.name : "no-user"}</div>
      <button onClick={() => login("test1@example.com", "123456")}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear()
    fetch.mockClear()
  })

  it("provides initial loading state", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    expect(screen.getByTestId("loading")).toHaveTextContent("loading")
    expect(screen.getByTestId("user")).toHaveTextContent("no-user")
  })

  it("handles successful login", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        token: "fake-jwt-token",
        user: { id: "user_1", email: "test1@example.com", name: "John Doe" },
      }),
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    await act(async () => {
      screen.getByText("Login").click()
    })

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("token", "fake-jwt-token")
    })
  })

  it("handles login failure", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        success: false,
        error: "Invalid credentials",
      }),
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    await act(async () => {
      screen.getByText("Login").click()
    })

    await waitFor(() => {
      expect(localStorage.setItem).not.toHaveBeenCalled()
    })
  })

  it("handles logout", async () => {
    // Setup initial user state
    localStorage.getItem.mockReturnValue("fake-token")
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        user: { id: "user_1", email: "test1@example.com", name: "John Doe" },
      }),
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    await act(async () => {
      screen.getByText("Logout").click()
    })

    expect(localStorage.removeItem).toHaveBeenCalledWith("token")
    expect(global.dispatchEvent).toHaveBeenCalledWith(expect.objectContaining({ type: "auth-logout" }))
  })

  it("verifies existing token on mount", async () => {
    localStorage.getItem.mockReturnValue("existing-token")
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        user: { id: "user_1", email: "test1@example.com", name: "John Doe" },
      }),
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/me", {
        headers: { Authorization: "Bearer existing-token" },
      })
    })
  })
})
