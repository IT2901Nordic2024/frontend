import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'


interface GoalsChartProps {
  events: Array<[number, number]>;
  type: string;
  target: number
  question: string
  frequency: string
}

// Defines the component to display a goals chart.
const GoalsChart: React.FC<GoalsChartProps> = ({ events, type, target, frequency, question }) => {
  let dailyGoal = 0 // Daily goal
  let weeklyGoal = 0 // Weekly goal

  // Calculate goals based on the frequency
  if (frequency === 'day') {
    dailyGoal = target // Daily target is the target itself
    weeklyGoal = target * 7// Weekly target is 7 times the daily target
  } else if (frequency === 'week') {
    weeklyGoal = target // Weekly target is the target itself
    dailyGoal = target / 7 // Daily goal is the weekly target divided by 7
  }

  // Data processing
  let totalToday = 0 // Today's data
  let totalLastWeek = 0 // This week's data

  const today = new Date(2024, 2, 15);
  console.log(today);
  today.setHours(0,0,0,0);

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  oneWeekAgo.setHours(0,0,0,0);

  if (type === 'time') {
    events.forEach(([start, end]) => {
      const startDate = new Date(start * 1000);
      startDate.setHours(0, 0, 0, 0); // Normalize the time to midnight
      const endDate = new Date(end * 1000);
      endDate.setHours(0, 0, 0, 0); // Normalize the time to midnight

      // Calculate the duration in seconds and convert it to hours
      const durationHours = (end - start) / 3600; // Convert seconds to hours

      if (startDate.getTime() === today.getTime()) {
        totalToday += durationHours;
      }

      if (startDate >= oneWeekAgo && startDate <= today) {
        totalLastWeek += durationHours;
      }
    });
    // Round the values to two decimal places
    totalToday = Number(totalToday.toFixed(2));
    totalLastWeek = Number(totalLastWeek.toFixed(2));
  } else{
    events.forEach(([timestamp, value]) => {
      const eventDate = new Date(timestamp * 1000);
      eventDate.setHours(0, 0, 0, 0); // Normalizes the time part to ensure comparison by date only
      
      if (eventDate.getTime() === today.getTime()) {
        totalToday += value;
      }
      if (eventDate >= oneWeekAgo && eventDate <= today) {
        totalLastWeek += value;
      }
    });
  }

  // Series data for the chart, representing today's and this week's data.
  const series = [
    {
      name: 'Goals',
      data: [totalToday, totalLastWeek],
    },
  ]

  // Calculate the maximum y-axis value for the chart, adding a buffer for visual space.
  const maxYaxisValue = Math.max(totalToday, totalLastWeek) + 3

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
        const goal = opts.dataPointIndex === 0 ? dailyGoal.toFixed(2) : weeklyGoal.toFixed(2)
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
      show: true, // Hide the y-axis
      max: maxYaxisValue, // Max value for the y-axis
      title: {
        text: type === 'time' ? 'Total Hours' : 'Total Count', // Y-axis title
      },
    },
    tooltip: {
      enabled: false, // Disable tooltips
    },

    fill: {
      opacity: 1, // Bar fill opacity
    },
  }

  return (
    <div className="text-2xl font-semibold leading-none tracking-tight">
      {question} <ReactApexChart options={options} series={series} type="bar" height={window.innerHeight * 0.25} />
    </div>
  )
}

export default GoalsChart
