import React from 'react';
import CoolCard from '../shadcnComponents/CoolCard';

interface SummaryProps {
  events: Array<[number, number]>;
  timerHabit: boolean;
}

const Summary: React.FC<SummaryProps> = ({ events, timerHabit }) => {
  if (!events || events.length === 0) {
    return <CoolCard title="Summary" children={<p>No data logged yet</p>} />;
  }

  let totalMilliseconds = 0;

  // Calculating total time spent
  if (timerHabit) {
    events.forEach(([start, end]) => {
      totalMilliseconds += (end - start) * 1000;
    });
  } else {
    events.forEach(([timestamp, count]) => {
      totalMilliseconds += count;
    });
  }

  const totalHours = totalMilliseconds / 3600000;

    // Grouping data by day for average calculation
  const dataGroupedByDay: { [key: string]: number } = {};
  events.forEach(([timestamp]) => {
    const date = new Date(timestamp * 1000);
    const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (!dataGroupedByDay[dayKey]) {
      dataGroupedByDay[dayKey] = 0;
    }
    if (timerHabit) {
      dataGroupedByDay[dayKey] += totalMilliseconds / 3600000; // Converting milliseconds to hours for total hours display
    } else {
      dataGroupedByDay[dayKey] += 1; // Counting occurrences
    }
  });

  const daysCovered = Object.keys(dataGroupedByDay).length;
  const weeklyAverage = (totalHours / (daysCovered / 7)).toFixed(0);
  const dailyAverage = (totalHours / daysCovered).toFixed(0);

  return (
    <div className='flex flex-col w-full'>
      <CoolCard title="Total Hours Spent" children={<p>{timerHabit ? `${totalHours.toFixed(0)} hours` : `${totalMilliseconds} times`}</p>} />
      <CoolCard title="Weekly Average" children={<p>{timerHabit ? `${weeklyAverage} hours per week` : `${(totalMilliseconds / 7).toFixed(0)} times per week`}</p>} />
      <CoolCard title="Daily Average" children={<p>{timerHabit ? `${dailyAverage} hours per day` : `${(totalMilliseconds / daysCovered).toFixed(0)} times per day`}</p>} />
    </div>
  );
};

export default Summary;
