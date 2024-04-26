import { useLocation, useNavigate } from 'react-router-dom'
import { TbLogout2 } from 'react-icons/tb'
import { FiHome } from 'react-icons/fi'
import Cookies from 'js-cookie'
import { useToast } from '@/Components/shadcnComponents/use-toast'
import { ToastAction } from '@radix-ui/react-toast'

export function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  // Toast for user confirmation
  const { toast } = useToast()

  // Log out function
  function logout() {
    Cookies.remove('userId') // Remove the userId cookie
    // Navigate to user login if successfully removing userId
    if (!Cookies.get('userId')) {
      navigate('/')
    }
  }

  // Navigation function to the habit/home page
  function goToHabitsPage() {
    navigate('/my-habits')
  }

  // Navigation function to the device page
  function goToDevicePage() {
    navigate('/my-device')
  }

  return (
    <>
      {/* Footer container */}
      <div className="w-screen h-14 bg-[#334155] flex fixed bottom-0 border-t border-[#E4E4E7] z-50">
        {/* Profile icon */}
        <div
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
          className="cursor-pointer flex items-center justify-center w-1/3"
        >
          <TbLogout2 size={35} color="white" />
        </div>
        {/* Habits/Home icon */}
        <div
          onClick={goToHabitsPage}
          className="cursor-pointer flex items-center justify-center w-1/3"
          style={{ backgroundColor: location.pathname === '/my-habits' ? '#1E293B' : 'transparent' }}
        >
          <FiHome size={35} color="white" />
        </div>
        {/* Device icon */}
        <div
          onClick={goToDevicePage}
          className="cursor-pointer flex items-center justify-center w-1/3"
          style={{ backgroundColor: location.pathname === '/my-device' ? '#1E293B' : 'transparent' }}
        >
          {/* Custom SVG */}
          <svg
            height="65%"
            viewBox="0 0 1600 1600"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            style={{
              fill: 'none',
              stroke: 'white',
              strokeWidth: '25',
              strokeLinejoin: 'round',
            }}
          >
            <g transform="matrix(3.125,0,0,3.125,0,0)">
              <g id="dodSVG">
                <path d="M127.873,303.358L259.023,399.271L390.163,303.751L341.721,149.327L178.636,149.527L127.873,303.358Z" />
                <path d="M130.689,67.511L177.174,132.319L343.425,131.919L385.542,68.564L258.443,24.225L130.689,67.511Z" />
                <path d="M357.711,142.317L399.257,79.23L476.778,186.438L476.651,316.755L407.787,299.501L357.711,142.317Z" />
                <path d="M471.861,333.452L392.67,444.584L262.568,484.719L267.313,414.309L402.657,316.629L471.861,333.452Z" />
                <path d="M244.779,484.422L249.807,413.643L116.722,316.394L42.833,336.586L120.604,443.64L244.779,484.422Z" />
                <path d="M110.865,299.683L163.363,142.571L116.669,77.444L35.38,185.653L37.483,319.688L110.865,299.683Z" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </>
  )
}
