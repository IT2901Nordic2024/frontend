import { render, screen, fireEvent } from '@testing-library/react'
import HabitCard from './habitCard'
import '@testing-library/jest-dom'

describe('HabitCard', () => {
  const mockOnClick = jest.fn() // Create a mock function for the onClick handler.

  // render the HabitCard component with predefined props before each test.
  beforeEach(() => {
    render(<HabitCard id="312" name="Coffie" bgColor="bg-blue-500" onClick={mockOnClick} />)
  })

  // Test to verify that the HabitCard component renders the habit name correctly.
  test('renders habit name correctly', () => {
    expect(screen.getByText('Coffie')).toBeInTheDocument()
  })

  // Test to check if the onClick prop is called when the card is clicked.
  test('calls onClick prop when clicked', () => {
    // Find the parent node of the text 'Coffie', which is the clickable element in the component.
    const card = screen.getByText('Coffie').parentNode
    // If the card exists, simulate click event
    if (card) {
      fireEvent.click(card)
    }
    // Assert that the mock function for onClick was called exactly once.
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
