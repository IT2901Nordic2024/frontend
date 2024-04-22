import { useNavigate } from 'react-router-dom'

export function NavBar() {
  const navigate = useNavigate()

  // Navigate to the login page
  function goToLoginPage() {
    navigate('/')
  }

  // Navigate to other pages
  function navigateTo(page: string) {
    navigate(page)
  }

  // Function to determine if the text should have a different color based on whether it is clicked
  function isActive(path: string) {
    return location.pathname === path ? '#94A3B8' : 'white'
  }

  return (
    <div className="sticky w-full h-14 bg-[#334155] flex items-center justify-between top-0 left-0 border-b border-[#E4E4E7] z-50">
      <div className="flex items-center">
        <img onClick={goToLoginPage} className="cursor-pointer h-12 ml-2 mr-4" src="/dodIcon.svg" alt="dodIcon" />
        <p className="text-white text-lg font-medium">NRF - Habit Tracker</p>
      </div>
      <div className="flex items-center pr-4">
        <button
          className="text-white text-lg font-medium mr-10"
          style={{ color: isActive('/profile') }}
          onClick={() => navigateTo('/profile')}
        >
          Account
        </button>
        <button
          className="text-white text-lg font-medium mr-10"
          style={{ color: isActive('/my-habits') }}
          onClick={() => navigateTo('/my-habits')}
        >
          Habits
        </button>
        <button
          className="text-white text-lg font-medium mr-2"
          style={{ color: isActive('/my-device') }}
          onClick={() => navigateTo('/my-device')}
        >
          Device
        </button>
      </div>
    </div>
  )
}
