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

  // Check window size
  const isMobile = window.innerWidth <= 768

  // SVG height based on window size
  const svgHeight = isMobile ? window.innerWidth * 0.9 : window.innerWidth * 0.4

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
      <div className="flex justify-center mt-5">
        {/* Custom SVG */}
        <svg
          height={svgHeight}
          viewBox="0 0 1600 1600"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlSpace="preserve"
          style={{
            fill: 'none',
            stroke: 'black',
            strokeWidth: '5',
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

          {/* Text in the center of the polygon */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="70"
            fill="rgb(15, 23, 42)"
            strokeWidth={1}
          >
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
