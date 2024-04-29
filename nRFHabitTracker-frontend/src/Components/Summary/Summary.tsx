import React from 'react';
import CoolCard from '../shadcnComponents/CoolCard';

interface SummaryProps {
  events: Array<[number, number]>;
  timerHabit: boolean;
}

const Summary: React.FC<SummaryProps> = ({ events, timerHabit }) => {
  if (!events || events.length === 0) {
    return <CoolCard title="No data logged yet" children={<p>...</p>} />;
  }

  const dataGroupedByDay: { [key: string]: number } = {};
  let totalValue = 0; // total hours for timer habits or total counts for counter habits.

  events.forEach(([timestamp, value]) => {
    const date = new Date(timestamp * 1000);
    const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    // Initialize day key if not already set
    if (!dataGroupedByDay[dayKey]) {
      dataGroupedByDay[dayKey] = 0;
    }

    if (timerHabit) {
      // Timer habits - convert seconds to hours and sum up
      const durationHours = (value - timestamp) / 3600;
      dataGroupedByDay[dayKey] += durationHours;
      totalValue += durationHours;
    } else {
      // Counter habits - sum counts directly
      dataGroupedByDay[dayKey] += value;
      totalValue += value;
    }
  });

  // Calculate averages based on tracked days
  const daysCovered = Object.keys(dataGroupedByDay).length;
  const dailyAverage = daysCovered > 0 ? (totalValue / daysCovered).toFixed(0) : '0';
  const weeklyAverage = daysCovered > 0 ? (totalValue / (daysCovered / 7)).toFixed(0) : '0';

  return (
    <div className='flex flex-col w-full'>
      <CoolCard title="Total Tracked" children={<p>{timerHabit ? `${totalValue.toFixed(0)} hours` : `${totalValue} times`}</p>} />
      <CoolCard title="Weekly Average" children={<p>{timerHabit ? `${weeklyAverage} hours per week` : `${weeklyAverage} times per week`}</p>} />
      <CoolCard title="Daily Average" children={<p>{timerHabit ? `${dailyAverage} hours per day` : `${dailyAverage} times per day`}</p>} />
    </div>
  );
};

export default Summary;
