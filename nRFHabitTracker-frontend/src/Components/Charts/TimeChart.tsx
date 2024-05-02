import { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { Button } from '../shadcnComponents/button'

interface ChartProps {
  events: Array<[number, number]> // Array of event tuples, each containing a start and end UNIX timestamp
}

// The TimeChart component visualizes the total time of events over a week in a bar chart format.
export const TimeChart: React.FC<ChartProps> = ({ events }) => {
  // State for the current week starting from Monday
  const [currentWeek, setCurrentWeek] = useState<Date>(getMonday())
  // State for storing the formatted data to be used in the chart
  const [filteredData, setFilteredData] = useState<{ x: number; y: number }[]>([])

  // Effect that recalculates data whenever the current week or events change
  useEffect(() => {
    const startOfWeek = new Date(currentWeek)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6) // Set to the end of the week (Sunday)

    // Object to accumulate total seconds per day
    const dataGroupedByDay: { [key: string]: number } = {}
    for (let i = 0; i < 7; i++) {
      // Initialize each day of the week with zero
      const day = new Date(startOfWeek)
      day.setDate(day.getDate() + i)
      const dayKey = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
      dataGroupedByDay[dayKey] = 0
    }

    // Aggregate the total time for events occurring within the week
    events.forEach(([start, end]) => {
      const startDate = new Date(start * 1000) // Convert UNIX timestamp to Date object
      if (startDate >= startOfWeek && startDate <= endOfWeek) {
        const dayKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`
        dataGroupedByDay[dayKey] += end - start // Accumulate the duration in seconds
      }
    })

    // Format data for ApexCharts, converting seconds to hours
    const formattedData = Object.keys(dataGroupedByDay).map((day) => ({
      x: new Date(day).getTime(), // Date as timestamp for x-axis
      y: parseFloat((dataGroupedByDay[day] / 3600).toFixed(2)), // Convert seconds to hours and round to two decimal places
    }))

    setFilteredData(formattedData)
  }, [currentWeek, events])

  // Handlers for navigating weeks
  const handleNextWeek = () => {
    setCurrentWeek((prev) => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 7))
  }

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 7))
  }

  // Configuration for the ApexChart
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: true, // Enable toolbar
        tools: {
          download: true, // Allow users to download the chart
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Bars are vertical
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels on bars
    },
    xaxis: {
      type: 'datetime', // Treat x-axis values as dates
      title: {
        text: 'Date',
      },
    },
    yaxis: {
      title: {
        text: 'Total Time', // Label for y-axis
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy', // Date format for tooltip
      },
      y: {
        formatter: (value) => {
          if (value < 1) {
            return `${Math.round(value * 60)} Minutes` // Convert hours to minutes if less than an hour
          } else {
            return `${value.toFixed(2)} Hours` // Display hours with two decimals
          }
        },
      },
    },
  }

  // Render the component, showing a message if no data is available
  if (!events || events.length === 0) {
    return <p>No data logged yet</p>
  }

  return (
    <div className="mx-auto py-5">
      <ReactApexChart
        options={options}
        series={[{ name: 'Total Hours', data: filteredData }]}
        type="bar"
        height={window.innerHeight * 0.3}
      />
      <div className="flex justify-between px-5 py-3">
        <Button onClick={handlePreviousWeek}>Previous Week</Button>
        <Button onClick={handleNextWeek}>Next Week</Button>
      </div>
    </div>
  )
}

export default TimeChart

// Utility function to find the Monday of the current week
function getMonday(d = new Date()) {
  d = new Date(d)
  const day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Sunday start
  return new Date(d.setDate(diff))
}
