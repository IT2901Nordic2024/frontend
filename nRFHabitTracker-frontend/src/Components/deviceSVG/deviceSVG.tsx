// SVG component to render the DOD figure inside device page

import { Device } from '@/Pages/DevicePage/DevicePage'

interface SVGProps {
  svgHeight: number
  selectedSide: number
  deviceData: Device[]
}

const SVGComponent: React.FC<SVGProps> = ({ svgHeight, selectedSide, deviceData }) => {
  return (
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

        {/* Display text in the center of the polygon */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="70"
          fill="rgb(15, 23, 42)"
          strokeWidth={1}
        >
          {/* Show habit information based on selected side */}
          {selectedSide !== 12
            ? deviceData[0][selectedSide + 1] !== undefined
              ? deviceData[0][selectedSide + 1]
              : 'No habit connected'
            : 'Select a side'}
        </text>
      </svg>
    </div>
  )
}

export default SVGComponent
