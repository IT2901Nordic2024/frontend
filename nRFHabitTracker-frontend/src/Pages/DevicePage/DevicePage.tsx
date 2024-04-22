// Page for showing different analytics when clicking on a habit card

import { fetchHabits } from '@/Api/api'
import SVGComponent from '@/Components/deviceSVG/deviceSVG'
import { Button } from '@/Components/shadcnComponents/button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// TODO: Remove connection logic if it is not possible to disconnect at the end of the project

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
  const navigate = useNavigate()

  // State variables to hold habits data, device data, connection data, selected side, whether there should be mobile view, and svgHeight based on view
  const [habitsData, setHabitsData] = useState<Habit[]>([])
  const [deviceData, setDeviceData] = useState<Device[]>([])
  const [connected, setConnected] = useState<boolean>(true)
  const [selectedSide, setSelectedSide] = useState<number>(12)
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768)
  const [svgHeight, setSvgHeight] = useState<number>(
    window.innerWidth < 768 ? window.innerWidth * 0.9 : window.innerWidth * 0.4
  )

  // TODO: Replace the user ID with the actual user ID when users are implemented
  const userId = '0'

  // Effect hook to fetch habits data when the component mounts
  useEffect(() => {
    fetchHabits(userId)
      .then((response: Habit[]) => {
        // Check if response is not empty
        if (response.length > 0) {
          // Transform the fetched data to match the structure expected by the component
          const transformedData: Habit[] = response.map((habit) => ({
            habitId: habit.habitId,
            habitName: habit.habitName,
            side: habit.side,
          }))
          setHabitsData(transformedData) // Set the transformed data to state
        }
      })
      .catch((error) => console.error('Error fetching habit data:', error))
  }, []) // Empty dependency array ensures this effect runs only once on component mount

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
      setIsMobileView(window.innerWidth < 768)
      setSvgHeight(window.innerWidth < 768 ? window.innerWidth * 0.9 : window.innerWidth * 0.4)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Navigation function to the connectDevice page
  function goToConnectDevicePage() {
    navigate('/connect-device')
  }

  // Function to disconnect the device
  function disconnect() {
    // TODO: Add functionality
  }

  // Update selected side
  const handleButtonClick = (side: number) => {
    setSelectedSide(side)
  }

  return (
    <div className="flex flex-col m-5">
      {/* Heading with the habit's name */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold leading-tight overflow-hidden text-slate-900">My Device</h1>
        {connected ? (
          <Button className={'ml-4'} onClick={disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button className={'ml-4'} onClick={goToConnectDevicePage}>
            Connect
          </Button>
        )}
      </div>
      <p className="flex justify-center mt-10 mb-5 text-sm text-slate-500 dark:text-slate-400">
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
  )
}
