import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Button } from '../shadcnComponents/button';

interface ChartProps {
  events: Array<[number, number]>
}

export const TimeChart: React.FC<ChartProps> = ({ events }) => {
  const [currentWeek, setCurrentWeek] = useState<Date>(getMonday());
  const [filteredData, setFilteredData] = useState<{ x: number, y: number }[]>([]);

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

    events.forEach(([start, end]) => {
      const startDate = new Date(start * 1000);
      if (startDate >= startOfWeek && startDate <= endOfWeek) {
        const dayKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
        dataGroupedByDay[dayKey] += (end - start);
      }
    });

    const formattedData = Object.keys(dataGroupedByDay).map(day => ({
      x: new Date(day).getTime(),
      y: parseFloat((dataGroupedByDay[day] / 3600).toFixed(2)),  // Convert seconds to hours
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
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yaxis: {
      title: {
        text: 'Total Time',
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: (value) => {
        if (value < 1) {
          return `${Math.round(value * 60)} Minutes`;
        } else {
          return `${value.toFixed(2)} Hours`;
        }
      }
    }
    },
  };

  if (!events || events.length === 0) {
    console.log('No data found');
    return <p>No data logged yet</p>;
  }

  return (
    <div className="mx-auto py-5">
      <ReactApexChart options={options} series={[{ name: 'Total Hours', data: filteredData }]} type="bar" />
      <div className="flex justify-between px-5 py-3">
        <Button onClick={handlePreviousWeek}>Previous Week</Button>
        <Button onClick={handleNextWeek}>Next Week</Button>
      </div>
    </div>
  )
}

export default TimeChart;

function getMonday(d = new Date()) {
  d = new Date(d);
  const day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is Sunday
  return new Date(d.setDate(diff));
}

