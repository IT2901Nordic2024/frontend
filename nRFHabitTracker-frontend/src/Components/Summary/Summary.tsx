import { CardTitle } from '../shadcnComponents/card'

interface SummaryProps {
  events: Array<[number, number]>
  timerHabit: boolean
}

const Summary: React.FC<SummaryProps> = ({ events, timerHabit }) => {
  if (!events || events.length === 0) {
    return <p>No data logged yet</p>
  }

  let totalMilliseconds = 0

  if (timerHabit) {
    // Calculating total duration in milliseconds for timer habits
    events.forEach(([start, end]) => {
      totalMilliseconds += (end - start) * 1000
      console.log(totalMilliseconds)
    })
  } else {
    // Counting occurrences for non-timer habits
    events.forEach(([timestamp, count]) => {
      totalMilliseconds += count
    })
  }

  const totalHours = totalMilliseconds / 3600000

  let daysCovered = 0
  const dataGroupedByDay: { [key: string]: number } = {}

  // Calculating days covered
  if (timerHabit) {
    events.forEach((session) => {
      const startDate = new Date(session[0] * 1000)
      const dayKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`
      if (!dataGroupedByDay[dayKey]) {
        dataGroupedByDay[dayKey] = 0
      }
      dataGroupedByDay[dayKey] += session[1] - session[0]
    })
    daysCovered = Object.keys(dataGroupedByDay).length
  } else {
    events.forEach(([timestamp, count]) => {
      const date = new Date(timestamp * 1000)
      const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      if (!dataGroupedByDay[dayKey]) {
        dataGroupedByDay[dayKey] = 0
      }
      dataGroupedByDay[dayKey] += count
    })
    daysCovered = Object.keys(dataGroupedByDay).length
  }

  // Calculating averages
  const weeklyAverage = (totalHours / (daysCovered / 7)).toFixed(0)
  const dailyAverage = (totalHours / daysCovered).toFixed(0)

  return (
    <div>
      <CardTitle className="text-sm font-medium pl-3">
        Total hours spent: {timerHabit ? `${totalHours.toFixed(0)} hours` : `${totalMilliseconds} times`}
        <br />
        Weekly average: {timerHabit ? `${weeklyAverage} hours` : `${(totalMilliseconds / 7).toFixed(0)} times`}
        <br />
        Daily average: {timerHabit ? `${dailyAverage} hours` : `${(totalMilliseconds / daysCovered).toFixed(0)} times`}
      </CardTitle>
    </div>
  )
}

export default Summary
