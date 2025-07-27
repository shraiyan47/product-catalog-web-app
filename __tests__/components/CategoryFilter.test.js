import { render, screen, fireEvent } from "@testing-library/react"
import CategoryFilter from "../../app/components/CategoryFilter"
import jest from "jest" // Import jest to fix the undeclared variable error

describe("CategoryFilter", () => {
  const mockCategories = ["electronics", "clothing", "books"]
  const mockOnCategoryChange = jest.fn()

  beforeEach(() => {
    mockOnCategoryChange.mockClear()
  })

  it("renders all categories button", () => {
    render(<CategoryFilter categories={mockCategories} selectedCategory="" onCategoryChange={mockOnCategoryChange} />)

    expect(screen.getByText("All Categories")).toBeInTheDocument()
  })

  it("renders all category buttons", () => {
    render(<CategoryFilter categories={mockCategories} selectedCategory="" onCategoryChange={mockOnCategoryChange} />)

    mockCategories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  it("highlights selected category", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="electronics"
        onCategoryChange={mockOnCategoryChange}
      />,
    )

    const electronicsButton = screen.getByText("electronics")
    expect(electronicsButton).toHaveClass("bg-blue-600", "text-white")
  })

  it("calls onCategoryChange when category is clicked", () => {
    render(<CategoryFilter categories={mockCategories} selectedCategory="" onCategoryChange={mockOnCategoryChange} />)

    fireEvent.click(screen.getByText("electronics"))
    expect(mockOnCategoryChange).toHaveBeenCalledWith("electronics")
  })

  it("calls onCategoryChange with empty string for All Categories", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="electronics"
        onCategoryChange={mockOnCategoryChange}
      />,
    )

    fireEvent.click(screen.getByText("All Categories"))
    expect(mockOnCategoryChange).toHaveBeenCalledWith("")
  })
})
