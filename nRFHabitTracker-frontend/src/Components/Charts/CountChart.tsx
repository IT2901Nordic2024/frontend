import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Button } from '../shadcnComponents/button';

interface ChartProps {
  events: Array<[number, number]>
}

export const CountChart: React.FC<ChartProps> = ({ events }) => {
  const [currentWeek, setCurrentWeek] = useState<Date>(getMonday());
  const [filteredData, setFilteredData] = useState<{ x: string, y: number }[]>([]);
  

  useEffect(() => {
    const startOfWeek = new Date(currentWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const dataGroupedByDay: { [key: string]: number } = {};
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      const dayKey = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
      dataGroupedByDay[dayKey] = 0;
    }

    events.forEach(([timestamp, count]) => {
      const date = new Date(timestamp * 1000);
      if (date >= startOfWeek && date <= endOfWeek) {
        const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        dataGroupedByDay[dayKey] += count;
      }
    });

    const formattedData = Object.keys(dataGroupedByDay).map(day => ({
      x: day,
      y: dataGroupedByDay[day]
    }));

    setFilteredData(formattedData);
  }, [currentWeek, events]);

  const handleNextWeek = () => {
    setCurrentWeek(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 7));
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 7));
  };

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: true,
        tools: {
          download: true,
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
        horizontal: false,
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
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: (value) => `${value} Times`,
      },
    },
  };

  if (!events || events.length === 0) {
    console.log('No data found');
    return <p>No data logged yet</p>;
  }

  return (
    <div className="mx-auto py-5">
      <ReactApexChart options={options} series={[{ name: 'Total Count', data: filteredData }]} type="bar" />
      <div className="flex justify-between px-5 py-3">
        <Button onClick={handlePreviousWeek}>Previous Week</Button>
        <Button onClick={handleNextWeek}>Next Week</Button>
      </div>
    </div>
  )
}

export default CountChart;

function getMonday(d = new Date()) {
  d = new Date(d);
  const day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is Sunday
  return new Date(d.setDate(diff));
}