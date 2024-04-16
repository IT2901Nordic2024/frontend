// Page for showing different analytics when clicking on a habit card

import { LoadingSpinner } from '@/Components/LoadingSpinner/LoadingSpinner'
import { Button } from '@/Components/shadcnComponents/button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Interface representing the structure of a device object
export interface Device {
  '1': number
  '2': number
  '3': number
  '4': number
  '5': number
  '6': number
  '8': number
  '9': number
  '10': number
  '11': number
}

export default function DevicePage() {
  const navigate = useNavigate()

  const [deviceData, setDeviceData] = useState<Device[]>([])

  // Mockup data
  const mockupData: Device = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 1713186340194,
    '5': 1712832241928,
    '6': 0,
    '8': 0,
    '9': 1712846856329,
    '10': 0,
    '11': 0,
  }

  // State to track saving process
  const [loading, setLoading] = useState(false)

  // State to hold whether a device is connected
  const [connected, setConnected] = useState(false)

  // Navigation function to the connectDevice page
  function goToConnectDevicePage() {
    console.log(2)
    navigate('/connect-device')
  }

  // Function to disconnect the device
  function disconnect() {
    // TODO: Add functionality
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
      {loading ? (
        <div className="flex items-center justify-center w-full h-full fixed top-0 left-0">
          <LoadingSpinner />
        </div>
      ) : (
        // TODO: Create 3D figure of the device
        <div className="flex justify-center">
          <p>Placeholder text</p>
        </div>
      )}
    </div>
  )
}
