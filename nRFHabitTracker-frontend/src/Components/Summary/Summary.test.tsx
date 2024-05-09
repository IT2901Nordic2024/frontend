import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Summary from './Summary'

describe('Summary Component', () => {
  it('displays correct totals and averages for timer habits', () => {
    const events: Array<[number, number]> = [
      [1707168000, 1707171600], // Event from 5th March 2024 00:00:00 to 5th March 2024 01:00:00 (3600 seconds)
      [1707254400, 1707256200], // Event from 6th March 2024 00:00:00 to 6th March 2024 00:30:00 (1800 seconds)
    ]
    render(<Summary events={events} timerHabit={true} />)
    expect(screen.getByText('90 minutes')).toBeInTheDocument() // Total minutes (60 mins + 30 mins = 90 mins)
    expect(screen.getByText('45 minutes per day')).toBeInTheDocument() // Daily average (90 mins / 2 days)
    expect(screen.getByText('13 minutes per week')).toBeInTheDocument() // Weekly average (90 mins / 7 days)
  })

  it('displays correct totals and averages for counter habits', () => {
    const events: Array<[number, number]> = [
      [1707168000, 5], // 5 times on 5th March 2024
      [1707254400, 3], // 3 times on 6th March 2024
    ]
    render(<Summary events={events} timerHabit={false} />)
    expect(screen.getByText('8 times')).toBeInTheDocument() // Total counts (5 + 3 = 8)
    expect(screen.getByText('4 times per day')).toBeInTheDocument() // Daily average (8 counts / 2 days)
    expect(screen.getByText('1 times per week')).toBeInTheDocument() // Weekly average (8 counts / 7 days), rounded to the nearest integer
  })
})
