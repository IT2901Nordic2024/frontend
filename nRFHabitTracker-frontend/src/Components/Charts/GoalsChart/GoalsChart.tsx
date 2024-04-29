import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface GoalsChartProps {
  today: number
  week: number
  unit: string
  target: number
  question: string
  frequency: string
}

// Defines the component to display a goals chart.
const GoalsChart: React.FC<GoalsChartProps> = ({ today, week, target, frequency, question }) => {
  let dailyGoal = 0 // Daily goal
  let weeklyGoal = 0 // Weekly goal

  // Calculate goals based on the frequency
  if (frequency === 'day') {
    dailyGoal = target // Daily target is the target itself
    weeklyGoal = target * 7 // Weekly target is 7 times the daily target
  } else if (frequency === 'week') {
    weeklyGoal = target // Weekly target is the target itself
    dailyGoal = target / 7 // Daily goal is the weekly target divided by 7
  }

  // Series data for the chart, representing today's and this week's data.
  const series = [
    {
      name: 'Goals',
      data: [today, week],
    },
  ]

  // Calculate the maximum y-axis value for the chart, adding a buffer for visual space.
  const maxYaxisValue = Math.max(today, week) + 3

  // Chart configuration options.
  const options: ApexOptions = {
    chart: {
      height: 350, // Chart height
      type: 'bar', // Chart type
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10, // Rounded corners for bars
        horizontal: false, // Vertical bars
        columnWidth: '55%', // Width of the bars
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        // Format labels to show the value and the goal
        const goal = opts.dataPointIndex === 0 ? dailyGoal : weeklyGoal
        return `${val} / ${goal}`
      },
      offsetY: 0, // Y offset for labels
      style: {
        fontSize: '12px', // Label font size
        colors: ['white'], // Label color
      },
    },
    stroke: {
      show: true, // Show borders around bars
      width: 2, // Border width
      colors: ['transparent'], // Border color
    },
    xaxis: {
      categories: ['Today', 'This week'], // Categories for the x-axis
      labels: {
        style: {
          colors: ['#304758'], // Label color
          fontSize: '14px', // Label font size
          fontWeight: 600, // Label font weight (bold)
        },
      },
      axisBorder: {
        show: false, // Hide the x-axis border line
      },
      axisTicks: {
        show: false, // Hide the x-axis ticks
      },
    },

    yaxis: {
      show: false, // Hide the y-axis
      max: maxYaxisValue, // Max value for the y-axis
    },
    tooltip: {
      enabled: false, // Disable tooltips
    },

    fill: {
      opacity: 1, // Bar fill opacity
    },
  }

  // TODO: Change chart height to better fit and be more responsive
  return (
    <div className="text-2xl font-semibold leading-none tracking-tight">
      {question} <ReactApexChart options={options} series={series} type="bar" height={window.innerHeight * 0.25} />
    </div>
  )
}

export default GoalsChart
