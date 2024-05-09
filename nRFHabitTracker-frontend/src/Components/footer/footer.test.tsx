import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Footer } from './footer'
import Cookies from 'js-cookie'
import * as toastHook from '@/Components/shadcnComponents/use-toast'
import { useNavigate } from 'react-router-dom'

// Mock necessary libraries to control their behavior and isolate the component test
jest.mock('js-cookie', () => ({
  get: jest.fn(),
  remove: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Retain the original functionalities except for those overridden
  useNavigate: jest.fn(), // Mock navigate function to prevent actual navigation and observe calls
}))

jest.mock('@/Components/shadcnComponents/use-toast', () => ({
  useToast: jest.fn(), // Mock toast to avoid actual rendering and functionality
}))

describe('Footer Component', () => {
  const mockNavigate = jest.fn() // Mock for navigation function

  beforeEach(() => {
    // Reset and redefine mocks in beforeEach to ensure clean state for each test
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
    jest.spyOn(toastHook, 'useToast').mockReturnValue({
      toast: jest.fn(), // Mock toast function to check if it gets called
      dismiss: () => undefined, // Stub dismiss function
      toasts: [], // Default empty array for toasts
    })
  })

  afterEach(() => {
    jest.clearAllMocks() // Clear all mocks after each test to prevent leakage between tests
  })

  it('should not render if user is not logged in', () => {
    // Set cookie getter to return undefined simulating a logged-out user
    ;(Cookies.get as jest.Mock).mockReturnValue(undefined)
    const { container } = render(
      <Router>
        <Footer />
      </Router>,
    )
    // Expect that the component does not render anything when the user is not logged in
    expect(container.firstChild).toBeNull()
  })

  it('should render if user is logged in', () => {
    // Simulate a user being logged in by setting a mock return value for the cookie
    ;(Cookies.get as jest.Mock).mockReturnValue('some-user-id')
    const { getByTestId } = render(
      <Router>
        <Footer />
      </Router>,
    )
    // Check for the presence of various parts of the Footer component
    expect(getByTestId('footer-logout')).toBeInTheDocument()
    expect(getByTestId('footer-home')).toBeInTheDocument()
    expect(getByTestId('footer-device')).toBeInTheDocument()
  })

  it('should navigate to /my-habits when habits icon is clicked', () => {
    // Assume the user is logged in
    ;(Cookies.get as jest.Mock).mockReturnValue('some-user-id')
    render(
      <Router>
        <Footer />
      </Router>,
    )
    // Simulate clicking the habits/home icon
    fireEvent.click(screen.getByTestId('footer-home'))
    // Verify navigation to the "/my-habits" path
    expect(mockNavigate).toHaveBeenCalledWith('/my-habits')
  })

  it('should navigate to /my-device when device icon is clicked', () => {
    // Simulate a logged-in state
    ;(Cookies.get as jest.Mock).mockReturnValue('some-user-id')
    render(
      <Router>
        <Footer />
      </Router>,
    )
    // Simulate clicking the device icon
    fireEvent.click(screen.getByTestId('footer-device'))
    // Verify navigation to the "/my-device" path
    expect(mockNavigate).toHaveBeenCalledWith('/my-device')
  })
})
