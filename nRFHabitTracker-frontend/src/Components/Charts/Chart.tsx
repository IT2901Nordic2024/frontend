import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useLocation, useNavigate } from "react-router-dom";
import { ApexOptions } from "apexcharts";


const Chart: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Effect to check if there's no data in the location state, and navigate to '/my-habits' if true
  useEffect(() => {
    if (!location.state) {
      console.log("No data found");
      navigate("/my-habits");
    }
  }, [location, navigate]);

  // Early return if there's no data in the location state
  if (!location.state) return null;

  // Extracting data and name from the location state
  const { data, name } = location.state as { data: [number, number][], name: string };

  // Prepare data: Group sessions by day and prepare sessions mapping for tooltips
  const dataGroupedByDay: { [key: string]: [number, number][] } = {};
  const sessionsMapping: { [key: string]: [number, number][] } = {};


  // Loop through each session and group by day -> populate sessionsMapping
  data.forEach((session) => {
    const startDate = new Date(session[0] * 1000);
    // dayKey is the date in the format 'YYYY-MM-DD' 
    const dayKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;

    // Initialize arrays in the objects if they don't exist for the dayKey
    dataGroupedByDay[dayKey] = dataGroupedByDay[dayKey] || [];
    sessionsMapping[dayKey] = sessionsMapping[dayKey] || [];

    // Unshift to maintain chronological order of sessions
    dataGroupedByDay[dayKey].unshift(session);
    sessionsMapping[dayKey].unshift(session);
  });


  //Format the grouped data for ApexCharts
  const formattedData = Object.entries(dataGroupedByDay).map(([day]) => {
    const sessions = sessionsMapping[day];
    // Calculate total duration for the day
    const totalDuration = sessions.reduce((acc, curr) => acc + (curr[1] - curr[0]), 0) / (3600);
    //Return object with day as x, total duration as y, and include dayKey for tooltip lookup
    return { x: day, y: parseFloat(totalDuration.toFixed(2)), meta: { dayKey: day } }; // Format data into x, y, and meta properties
  });

  // Format data into series for ApexCharts
  const series = [
    {
      name: name || "Habit Data",
      data: formattedData,
    },
  ];

  // Options for ApexCharts
  const options: ApexOptions = {
    chart: {
      type: "line", // Set chart type to line
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: false 
        },
      },
    },
    xaxis: {
      type: "datetime", // Set x-axis type to datetime
      title: {
        text: "Date" // Set x-axis title
      },
    },
    yaxis: {
      title: {
        text: "Total Hours" // Set y-axis title
      },
    },
    stroke: {
      curve: "smooth", // Set stroke curve type to smooth
    },
    tooltip: {
      // Custom tooltip to show session data
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const dayKey = w.config.series[seriesIndex].data[dataPointIndex].meta.dayKey;
        const sessions = sessionsMapping[dayKey];

        //If no session data is found
        if (!sessions) {
          return `<div class="arrow_box">No session data available</div>`;
        }
        //Bulid tooltip content with start and end times for sessions
        let tooltipContent = `<div class="arrow_box"><strong>Sessions</strong><br>`;
        sessions.forEach((session: [number, number]) => {
          const start = new Date(session[0] * 1000);
          const end = new Date(session[1] * 1000);
          tooltipContent += `<span>${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')} - ${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}</span><br>`;
        });
        tooltipContent += `</div>`;
        return tooltipContent;
      }
    },
  };

  // Render the ApexChart component with defined options and series
  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" />
    </div>
  );
};

export default Chart;
