"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import LoginModal from "../../app/components/LoginModal"
import jest from "jest" // Import jest to fix the undeclared variable error

describe("LoginModal", () => {
  const mockOnClose = jest.fn()
  const mockOnLogin = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
    mockOnLogin.mockClear()
  })

  it("does not render when isOpen is false", () => {
    render(
      <LoginModal
        isOpen={false}
        onClose={mockOnClose}
        onLogin={mockOnLogin}
        productTitle="Test Product"
        message="Test message"
      />,
    )

    expect(screen.queryByText("Login Required")).not.toBeInTheDocument()
  })

  it("renders when isOpen is true", () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={mockOnClose}
        onLogin={mockOnLogin}
        productTitle="Test Product"
        message="Test message"
      />,
    )

    expect(screen.getByText("Login Required")).toBeInTheDocument()
  })

  it("displays custom message", () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={mockOnClose}
        onLogin={mockOnLogin}
        productTitle="Test Product"
        message="Custom test message"
      />,
    )

    expect(screen.getByText("Custom test message")).toBeInTheDocument()
  })

  it("displays product title", () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={mockOnClose}
        onLogin={mockOnLogin}
        productTitle="Amazing Product"
        message="Test message"
      />,
    )

    expect(screen.getByText("Amazing Product")).toBeInTheDocument()
  })

  it("calls onClose when cancel button is clicked", () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={mockOnClose}
        onLogin={mockOnLogin}
        productTitle="Test Product"
        message="Test message"
      />,
    )

    fireEvent.click(screen.getByText("Cancel"))
    expect(mockOnClose).toHaveBeenCalled()
  })

  it("calls onLogin when login button is clicked", () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={mockOnClose}
        onLogin={mockOnLogin}
        productTitle="Test Product"
        message="Test message"
      />,
    )

    fireEvent.click(screen.getByText("Login"))
    expect(mockOnLogin).toHaveBeenCalled()
  })

  it("calls onClose when X button is clicked", () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={mockOnClose}
        onLogin={mockOnLogin}
        productTitle="Test Product"
        message="Test message"
      />,
    )

    const closeButton = screen.getByRole("button", { name: "" }) // X button has no text
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalled()
  })
})
