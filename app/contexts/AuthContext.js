"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [redirectUrl, setRedirectUrl] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem("token")
    const storedRedirectUrl = localStorage.getItem("redirectUrl")

    if (token) {
      // Verify token with server
      verifyToken(token)
    } else {
      setIsLoading(false)
    }

    if (storedRedirectUrl) {
      setRedirectUrl(storedRedirectUrl)
    }
  }, [])

  const verifyToken = async (token) => {
    try {
      const response = await fetch("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        // Dispatch login event for CartContext
        window.dispatchEvent(new CustomEvent("auth-login", { detail: { userId: data.user.id } }))
      } else {
        // Token is invalid, remove it
        localStorage.removeItem("token")
      }
    } catch (error) {
      console.error("Token verification failed:", error)
      localStorage.removeItem("token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Store token and user data
        localStorage.setItem("token", data.token)
        setUser(data.user)

        // Dispatch login event
        window.dispatchEvent(new CustomEvent("auth-login", { detail: { userId: data.user.id } }))

        // Handle redirect after login
        const storedRedirectUrl = localStorage.getItem("redirectUrl")
        if (storedRedirectUrl) {
          localStorage.removeItem("redirectUrl")
          setRedirectUrl(null)
          router.push(storedRedirectUrl)
        }

        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Network error occurred" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("redirectUrl")
    setRedirectUrl(null)

    // Dispatch logout event
    window.dispatchEvent(new CustomEvent("auth-logout"))

    // Redirect to home page after logout
    router.push("/")
  }

  const setLoginRedirect = (url) => {
    setRedirectUrl(url)
    localStorage.setItem("redirectUrl", url)
  }

  const getAuthToken = () => {
    return localStorage.getItem("token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        redirectUrl,
        setLoginRedirect,
        getAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
