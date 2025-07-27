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
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("user")
    const storedRedirectUrl = localStorage.getItem("redirectUrl")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    if (storedRedirectUrl) {
      setRedirectUrl(storedRedirectUrl)
    }
    setIsLoading(false)
  }, [])

  const login = async (username, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (username === "demo" && password === "password") {
      const userData = { id: 1, username, name: "Demo User" }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      // Handle redirect after login
      const storedRedirectUrl = localStorage.getItem("redirectUrl")
      if (storedRedirectUrl) {
        localStorage.removeItem("redirectUrl")
        setRedirectUrl(null)
        router.push(storedRedirectUrl)
      }

      return { success: true }
    }

    return { success: false, error: "Invalid credentials" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("redirectUrl")
    setRedirectUrl(null)
  }

  const setLoginRedirect = (url) => {
    setRedirectUrl(url)
    localStorage.setItem("redirectUrl", url)
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
