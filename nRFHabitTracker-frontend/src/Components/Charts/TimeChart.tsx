import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartProps {
  events: Array<[number, number]>;
}

export const TimeChart: React.FC<ChartProps> = ({ events }) => {
  if (!events || events.length === 0) {
    console.log('No data found');
    return <p>No data logged yet</p>;
  }

  // Data processing
  const dataGroupedByDay: { [key: string]: number } = {};

  events.forEach((session) => {
    const startDate = new Date(session[0] * 1000);
    const dayKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    if (!dataGroupedByDay[dayKey]) {
      dataGroupedByDay[dayKey] = 0;
    }
    dataGroupedByDay[dayKey] += (session[1] - session[0]);
  });

  // Format the grouped data for ApexCharts
  const formattedData = Object.keys(dataGroupedByDay).map(day => ({
    x: new Date(day).getTime(),
    y: parseFloat((dataGroupedByDay[day] / 3600).toFixed(2)),  // Convert seconds to hours
  }));

  // Options for ApexCharts
  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: false,
        },
      },
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yaxis: {
      title: {
        text: 'Total Hours',
      },
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: (value) => `${value} Hours`
      }
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={[{ name: 'Total Hours', data: formattedData }]} type="line" />
    </div>
  );
};

export default TimeChart;
