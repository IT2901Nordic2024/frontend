import CoolCard from '../shadcnComponents/CoolCard'

interface SummaryProps {
  events: Array<[number, number]>
  timerHabit: boolean
}

const Summary: React.FC<SummaryProps> = ({ events, timerHabit }) => {
  if (!events || events.length === 0) {
    return <CoolCard title="No data logged yet" children={<p>...</p>} />
  }

  const dataGroupedByDay: { [key: string]: number } = {}
  let totalValue = 0 // Total minutes for timer habits or total counts for counter habits.
  let earliestDate = new Date() // Initialized to now but will be adjusted

  events.forEach(([timestamp, value]) => {
    const date = new Date(timestamp * 1000)
    earliestDate = earliestDate > date ? date : earliestDate // Update earliestDate if the current date is earlier
    const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

    if (!(dayKey in dataGroupedByDay)) {
      dataGroupedByDay[dayKey] = 0
    }

    if (timerHabit) {
      // Timer habits - convert seconds to minutes
      const durationMinutes = (value - timestamp) / 60
      dataGroupedByDay[dayKey] += durationMinutes
      totalValue += durationMinutes
    } else {
      // Counter habits - count directly
      dataGroupedByDay[dayKey] += value
      totalValue += value
    }
  })

  const daysCovered = Object.keys(dataGroupedByDay).length
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const daysSinceEarliest = (+today - +earliestDate) / (1000 * 60 * 60 * 24)
  const effectiveDays = Math.min(daysCovered, Math.ceil(daysSinceEarliest + 1))
  const dailyAverage = (totalValue / daysCovered).toFixed(0)
  const weeklyAverage = (totalValue / Math.max(effectiveDays, 7)).toFixed(0) // Ensure minimum divisor is 7 days or actual days tracked

  return (
    <div className="flex flex-col w-full">
      <CoolCard
        title="Total Tracked"
        children={<p>{timerHabit ? `${totalValue.toFixed(0)} minutes` : `${totalValue} times`}</p>}
      />
      <CoolCard
        title="Weekly Average"
        children={<p>{timerHabit ? `${weeklyAverage} minutes per week` : `${weeklyAverage} times per week`}</p>}
      />
      <CoolCard
        title="Daily Average"
        children={<p>{timerHabit ? `${dailyAverage} minutes per day` : `${dailyAverage} times per day`}</p>}
      />
    </div>
  )
}

export default Summary
