import { render } from '@testing-library/react'
import Calendar, { CalendarProps } from './Calender'
import '@testing-library/jest-dom'

// Mocking the CalendarComp component
jest.mock('@/Components/shadcnComponents/calendar', () => ({
  Calendar: jest.fn(({ selected }) => <div data-testid="mock-calendar">{JSON.stringify(selected)}</div>),
}))

describe('calender', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders "No data logged yet" message if no events provided', () => {
    const props: CalendarProps = {
      events: [],
      timerHabit: true,
    }
    const { getByText } = render(<Calendar {...props} />)
    expect(getByText('No data logged yet')).toBeInTheDocument()
  })
})
