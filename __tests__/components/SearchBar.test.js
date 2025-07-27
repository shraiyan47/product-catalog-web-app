import { render, screen, fireEvent } from "@testing-library/react"
import SearchBar from "../../app/components/SearchBar"
import jest from "jest"

describe("SearchBar", () => {
  const mockOnSearchChange = jest.fn()

  beforeEach(() => {
    mockOnSearchChange.mockClear()
  })

  it("renders search input with placeholder", () => {
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />)

    const input = screen.getByPlaceholderText("Search products...")
    expect(input).toBeInTheDocument()
  })

  it("displays current search term", () => {
    render(<SearchBar searchTerm="laptop" onSearchChange={mockOnSearchChange} />)

    const input = screen.getByDisplayValue("laptop")
    expect(input).toBeInTheDocument()
  })

  it("calls onSearchChange when typing", () => {
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />)

    const input = screen.getByPlaceholderText("Search products...")
    fireEvent.change(input, { target: { value: "phone" } })

    expect(mockOnSearchChange).toHaveBeenCalledWith("phone")
  })

  it("renders search icon", () => {
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />)

    const searchIcon = screen.getByRole("textbox").parentElement.querySelector("svg")
    expect(searchIcon).toBeInTheDocument()
  })
})
