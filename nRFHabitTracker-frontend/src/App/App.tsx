// Contains the main routing logic for the application
// utilizes the react-router-dom library to handle routing

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { LoginPage } from '@/Pages/LoginPage/LoginPage'
import { NavBar } from '@/Components/navBar/navBar'
import { ConnectDevicePage } from '@/Pages/ConnectDevicePage/ConnectDevicePage'
import { SignupPage } from '@/Pages/UserSignup/UserSignup'
import { Footer } from '@/Components/footer/footer'
import { AddHabitPage } from '@/Pages/AddHabitPage/AddHabitPage'
import MyHabitsPage from '@/Pages/MyHabitsPage/MyHabitsPage'
import { RemoveScroll } from 'react-remove-scroll'
import AnalyticsPage from '@/Pages/AnalyticsPage/AnalyticsPage'
import AddGoalPage from '@/Pages/AddGoalPage/AddGoalPage'
import EditHabitPage from '@/Pages/EditHabitPage/EditHabitPage'
import { Toaster } from '@/Components/shadcnComponents/toaster'
import { ProfilePage } from '@/Pages/ProfilePage/ProfilePage'
import DevicePage from '@/Pages/DevicePage/DevicePage'
import { useEffect, useState } from 'react'

// Layout component that includes the navigation bar and the main content outlet, as well as checking window size and choosing between navbar and footer based on this
const Layout: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {!isMobileView && <NavBar />} {/* Nav bar to be displayed on desktop view */}
      {/* Will make the content alone scrollable */}
      <RemoveScroll>
        <div style={{ height: 'calc(100vh - 56px)', overflow: 'auto' }}>
          <Outlet /> {/* Main content outlet */}
          <Toaster /> {/* Confirmation toaster */}
        </div>
      </RemoveScroll>
      {isMobileView && <Footer />} {/* Footer to be displayed on mobile view */}
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />, // Root layout component
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/connect-device',
        element: <ConnectDevicePage />,
      },
      {
        path: '/my-habits',
        element: <MyHabitsPage />,
      },
      {
        path: '/my-habits/add-habit',
        element: <AddHabitPage />,
      },
      {
        path: '/my-habits/:id',
        element: <AnalyticsPage />,
      },
      {
        path: '/my-habits/:id/addGoal',
        element: <AddGoalPage />,
      },
      {
        path: '/my-habits/:id/editHabit',
        element: <EditHabitPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/my-device',
        element: <DevicePage />,
      },

      // Add more routes as necessary
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
