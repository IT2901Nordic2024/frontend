import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Footer } from './footer'
import { BrowserRouter, useNavigate } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mock useNavigate
}))

describe('Footer', () => {
  const mockNavigate = jest.fn()

  beforeEach(() => {
    jest.mocked(useNavigate).mockImplementation(() => mockNavigate) // Mock useNavigate
  })

  test('navigates to account page when profile icon is clicked', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )
    const profileIcon = screen.getByAltText('user')
    await userEvent.click(profileIcon)
    expect(mockNavigate).toHaveBeenCalledWith('/account')
  })

  test('navigates to habits page when home icon is clicked', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )
    const habitsIcon = screen.getByAltText('home')
    await userEvent.click(habitsIcon)
    expect(mockNavigate).toHaveBeenCalledWith('/my-habits')
  })

  test('navigates to add habit page when plus icon is clicked', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )
    const addHabitIcon = screen.getByAltText('plus')
    await userEvent.click(addHabitIcon)
    expect(mockNavigate).toHaveBeenCalledWith('/add-habit')
  })
})
