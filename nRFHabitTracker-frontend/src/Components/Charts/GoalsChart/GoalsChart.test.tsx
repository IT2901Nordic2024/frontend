import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import GoalsChart from './GoalsChart'

describe('GoalsChart Component', () => {
  const propsDay = {
    today: 5,
    week: 35,
    target: 7,
    question: 'How many coffees did i drink?',
    frequency: 'day',
  }

  const propsWeek = {
    today: 5,
    week: 35,
    target: 49,
    question: 'How many hours did i work?',
    frequency: 'week',
  }

  test('renders with correct question for day frequency', () => {
    render(<GoalsChart {...propsDay} />)
    expect(screen.getByText(propsDay.question)).toBeInTheDocument()
  })

  test('calculates daily and weekly goals correctly for day frequency', () => {
    render(<GoalsChart {...propsDay} />)
    expect(screen.getByText(`${propsDay.today}/${propsDay.target}`)).toBeInTheDocument()
    // Now we check against the adjusted weekly target for "day" frequency
    expect(screen.getByText(`${propsDay.week}/${propsDay.target * 7}`)).toBeInTheDocument()
  })

  test('renders with correct question for week frequency', () => {
    render(<GoalsChart {...propsWeek} />)
    expect(screen.getByText(propsWeek.question)).toBeInTheDocument()
  })

  test('calculates daily and weekly goals correctly for week frequency', () => {
    render(<GoalsChart {...propsWeek} />)
    const dailyGoalForWeekFrequency = propsWeek.target / 7
    // Now we check against the adjusted daily target for "week" frequency
    expect(screen.getByText(`${propsWeek.today}/${dailyGoalForWeekFrequency}`)).toBeInTheDocument()
    expect(screen.getByText(`${propsWeek.week}/${propsWeek.target}`)).toBeInTheDocument()
  })
})
