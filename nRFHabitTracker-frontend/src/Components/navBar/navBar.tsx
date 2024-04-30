import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'
import { useToast } from '@/Components/shadcnComponents/use-toast'
import { ToastAction } from '@radix-ui/react-toast'

export function NavBar() {
  const navigate = useNavigate()

  // Toast for user confirmation
  const { toast } = useToast()

  // Variables to see whether each button is hovered over
  const habitsRef = useRef(null)
  const deviceRef = useRef(null)
  const logoutRef = useRef(null)

  // Hover state for each button
  const isHabitsHovered = useHover(habitsRef)
  const isDeviceHovered = useHover(deviceRef)
  const islogoutHovered = useHover(logoutRef)

  // Navigate to the login page
  function goToMainPage() {
    navigate('/my-habits')
  }

  // Navigate to other pages
  function navigateTo(page: string) {
    navigate(page)
  }

  // Function to determine if the text should have a different color based on whether it is clicked or hovered
  function isActive(path?: string) {
    if (path === '/my-habits') return location.pathname === path || isHabitsHovered ? '#a2b3ca' : 'white'
    if (path === '/my-device') return location.pathname === path || isDeviceHovered ? '#a2b3ca' : 'white'
    return islogoutHovered ? '#a2b3ca' : 'white' // Color changes if the logout button is hovered over
  }

  // Function for checking if the user is logged in or not
  function userId() {
    if (Cookies.get('userId')) {
      return true
    }
    return false
  }

  // Log out function
  function logout() {
    Cookies.remove('userId') // Remove the userId cookie
    // Navigate to user login if successfully removing userId
    if (!userId()) {
      navigate('/')
    }
  }

  // Render the navBar only if the user is logged in
  if (!userId()) return null

  return (
    <div className="sticky w-full h-14 bg-[#334155] flex items-center justify-between top-0 left-0 border-b border-[#E4E4E7] z-50">
      <div className="flex items-center">
        <img onClick={goToMainPage} className="cursor-pointer h-12 ml-2 mr-4" src="/dodIcon.svg" alt="dodIcon" />
        <p className="text-white text-lg font-medium">NRF - Habit Tracker</p>
      </div>
      <div className="flex items-center pr-4">
        <button
          className="text-white text-lg font-medium mr-10"
          style={{ color: isActive('/my-device') }}
          onClick={() => navigateTo('/my-device')}
          ref={deviceRef}
        >
          Device
        </button>
        <button
          className="text-white text-lg font-medium mr-10"
          style={{ color: isActive('/my-habits') }}
          onClick={() => navigateTo('/my-habits')}
          ref={habitsRef}
        >
          Habits
        </button>
        <button
          className="text-white text-lg font-medium mr-2"
          style={{ color: isActive() }}
          onClick={() => {
            toast({
              variant: 'destructive',
              title: 'Confirm your action',
              description: 'Are you sure you want to log out?',
              action: (
                <ToastAction altText="Yes" onClick={logout}>
                  Yes
                </ToastAction>
              ),
            })
          }}
          ref={logoutRef}
        >
          Log out
        </button>
      </div>
    </div>
  )
}
