// Page for showing different analytics when clicking on a habit card

import { fetchHabits } from '@/Api/api'
import SVGComponent from '@/Components/deviceSVG/deviceSVG'
import { Button } from '@/Components/shadcnComponents/button'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '@/Components/LoadingSpinner/LoadingSpinner'

// Interface representing the structure of a device object
export interface Device {
  [key: number]: string
}

// Interface representing the structure of a Habit object
interface Habit {
  habitName: string
  habitId: number
  side: number
}

export default function DevicePage() {
  // State variables to hold habits data, device data, connection data, selected side, whether there should be mobile view, and svgHeight based on view
  const [loading, setLoading] = useState<boolean>(true)
  const [habitsData, setHabitsData] = useState<Habit[]>([])
  const [deviceData, setDeviceData] = useState<Device[]>([])
  const [selectedSide, setSelectedSide] = useState<number>(12)
  const [svgHeight, setSvgHeight] = useState<number>(
    window.innerWidth < 768 ? window.innerWidth * 0.9 : window.innerWidth * 0.4
  )

  const navigate = useNavigate()

  // Effect hook to fetch habits data when the component mounts
  useEffect(() => {
    const userId = Cookies.get('userId') // Get userId from cookie

    if (!userId) {
      // Redirect the user to the login page if userId is not found in the cookie
      navigate('/')
      return // Exit early if userId is not available
    }
    fetchHabits(userId)
      .then((response: { habits: Habit[]; deviceId: string }) => {
        // Check if response is not empty
        if (response.habits.length > 0) {
          // Transform the fetched data to match the structure expected by the component
          const transformedData: Habit[] = response.habits.map((habit) => ({
            habitId: habit.habitId,
            habitName: habit.habitName,
            side: habit.side,
          }))
          setHabitsData(transformedData) // Set the transformed data to state
        }
        setLoading(false) // Set loading status to false after fetching data
      })
      .catch((error) => console.error('Error fetching habit data:', error))
  }, [navigate]) // Empty dependency array ensures this effect runs only once on component mount

  useEffect(() => {
    if (habitsData.length > 0) {
      // Create device data based on habit data
      const deviceDataFromHabits: Device = habitsData.reduce((dod: Device, habit: Habit) => {
        if (habit.side !== undefined) {
          dod[habit.side] = habit.habitName
        }
        return dod
      }, {})
      setDeviceData([deviceDataFromHabits])
    }
  }, [habitsData]) // Update device data whenever habits data changes

  useEffect(() => {
    const handleResize = () => {
      setSvgHeight(window.innerWidth < 768 ? window.innerWidth * 0.9 : window.innerWidth * 0.4)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Update selected side
  const handleButtonClick = (side: number) => {
    setSelectedSide(side)
  }

  return (
    <div className="flex flex-col h-screen" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Heading */}
      <div className="flex justify-between pt-5 px-5">
        <h1 className="text-4xl font-bold leading-tight text-slate-900">My Device</h1>
      </div>
      <div className="flex flex-grow justify-center items-center px-5 pt-2">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full fixed top-0 left-0">
            <LoadingSpinner />
          </div>
        ) : habitsData.length > 0 ? (
          <div className="flex flex-col">
            <p className="flex justify-center mb-5 text-sm text-slate-500 dark:text-slate-400">
              Select the side you wish to see information about:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {Array.from(Array(11).keys()).map((side) => (
                <Button
                  key={side}
                  variant={selectedSide === side ? 'default' : 'secondary'} // Change button style based on selected side
                  onClick={() => handleButtonClick(side)}
                >
                  Side {side + 1}
                </Button>
              ))}
            </div>
            {/* SVG element for polygon */}
            <SVGComponent svgHeight={svgHeight} selectedSide={selectedSide} deviceData={deviceData} />
          </div>
        ) : (
          // Display message if the device data can not be retrieved
          <p>There is trouble collecting your data!</p>
        )}
      </div>
    </div>
  )
}
