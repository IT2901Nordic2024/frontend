import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartProps {
  events: Array<[number, number]>;
}

export const CountChart: React.FC<ChartProps> = ({ events }) => {
  if (!events || events.length === 0) {
    console.log('No data found');
    return <p>No data logged yet</p>;
  }

  // Data processing
  const dataGroupedByDay: { [key: string]: number } = {};

  events.forEach(([timestamp, count]) => {
    const date = new Date(timestamp * 1000);
    const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (!dataGroupedByDay[dayKey]) {
      dataGroupedByDay[dayKey] = 0;
    }
    dataGroupedByDay[dayKey] += count;
  });

   // Format the grouped data for ApexCharts
   const formattedData = Object.keys(dataGroupedByDay).map(day => ({
    x: new Date(day).getTime(),
    y: dataGroupedByDay[day]
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
        text: 'Total Count',
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
        formatter: (value) => `${value} Times`
      }
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={[{ name: 'Total Count', data: formattedData }]} type="line" />
    </div>
  );
};

export default CountChart;