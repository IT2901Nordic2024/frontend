import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { NavBar } from './navBar'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

// Mocking necessary modules and their methods to isolate the component functionality.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use actual implementations from react-router-dom
  useNavigate: jest.fn(), // but mock the useNavigate hook.
}))
jest.mock('js-cookie', () => ({
  get: jest.fn(), // Mock get method to simulate cookie retrieval.
  remove: jest.fn(), // Mock remove method (not used in current tests but might be useful).
}))

// Group tests for NavBar component.
describe('NavBar Component', () => {
  const mockNavigate = jest.fn() // Mock function to replace the navigation function.

  beforeEach(() => {
    // Before each test, set up necessary mocks.
    ;(useNavigate as jest.Mock).mockImplementation(() => mockNavigate) // Replace useNavigate with a mock function.
    jest.spyOn(Cookies, 'get').mockReturnValue({ 'user-id': 'user-id' }) // Simulate a logged-in user via cookies.
  })

  afterEach(() => {
    jest.clearAllMocks() // Clear all mocks after each test to prevent leakage between tests.
  })

  it('renders NavBar with all elements when user is logged in', () => {
    render(
      <Router>
        <NavBar />
      </Router>,
    ) // Render NavBar within a Router for proper link handling.
    // Check if all expected elements are present in the document.
    expect(screen.getByText('Device')).toBeInTheDocument()
    expect(screen.getByText('Habits')).toBeInTheDocument()
    expect(screen.getByText('Log out')).toBeInTheDocument()
  })

  it('navigates to the device page when the Device link is clicked', () => {
    render(
      <Router>
        <NavBar />
      </Router>,
    ) // Render the component again for isolation.
    fireEvent.click(screen.getByText('Device')) // Simulate a click event on 'Device' link.
    expect(mockNavigate).toHaveBeenCalledWith('/my-device') // Assert that navigation was called with correct path.
  })

  it('navigates to the habits page when the Habits link is clicked', () => {
    render(
      <Router>
        <NavBar />
      </Router>,
    ) // Repeat rendering for this test.
    fireEvent.click(screen.getByText('Habits')) // Simulate click on 'Habits' link.
    expect(mockNavigate).toHaveBeenCalledWith('/my-habits') // Check for correct navigation path.
  })
})
