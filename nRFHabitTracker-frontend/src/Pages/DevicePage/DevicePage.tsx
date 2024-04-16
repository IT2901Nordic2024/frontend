// Page for showing different analytics when clicking on a habit card

import { LoadingSpinner } from '@/Components/LoadingSpinner/LoadingSpinner'
import { Button } from '@/Components/shadcnComponents/button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Interface representing the structure of a device object
export interface Device {
  [key: number]: number
}

export default function DevicePage() {
  const navigate = useNavigate()

  // State to keep track of fetched data
  const [deviceData, setDeviceData] = useState<Device[]>([])

  // State to track saving process
  const [loading, setLoading] = useState(false)

  // State to hold whether a device is connected
  const [connected, setConnected] = useState(false)

  // State to keep track of selected side
  const [selectedSide, setSelectedSide] = useState<number>(12)

  // Mockup data
  const mockupData: Device = {
    1: 0,
    2: 0,
    3: 0,
    4: 1713186340194,
    5: 1712832241928,
    6: 0,
    7: 0,
    8: 0,
    9: 1712846856329,
    10: 0,
    11: 0,
  }

  // Navigation function to the connectDevice page
  function goToConnectDevicePage() {
    navigate('/connect-device')
  }

  // Function to disconnect the device
  function disconnect() {
    // TODO: Add functionality
  }

  const handleButtonClick = (side: number) => {
    setSelectedSide(side)
  }

  useEffect(() => {
    // Set data when component mounts
    setDeviceData([mockupData])
  }, []) // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="flex flex-col m-5">
      {/* Heading with the habit's name */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold leading-tight overflow-hidden text-slate-900">Your Device</h1>
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
        Click on the side you wish to see information about:
      </p>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full fixed top-0 left-0">
          <LoadingSpinner />
        </div>
      ) : (
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
      )}
      {/* SVG element for polygon */}
      {/* SVG element for polygon */}
      <div className="flex justify-center mt-10">
        <svg width="300" height="300">
          <polygon
            points="150,15 285,112.5 240,285 60,285 15,112.5"
            style={{ fill: 'none', stroke: '#334155', strokeWidth: 5 }}
          />
          {/* Text in the center of the pentagon */}
          <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" fontSize="20" fill="rgb(15, 23, 42)">
            {selectedSide !== 12
              ? deviceData[0][selectedSide + 1] !== 0
                ? deviceData[0][selectedSide + 1]
                : 'No habit connected'
              : 'Select a side'}
          </text>
        </svg>
      </div>
    </div>
  )
}
