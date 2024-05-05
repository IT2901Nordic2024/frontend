import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from './Calendar';
import { Calendar as CalenderComp } from '@/Components/shadcnComponents/calendar';

// Mock the Calendar component from shadcnComponents
jest.mock('@/Components/shadcnComponents/calendar', () => ({
  Calendar: jest.fn(() => null)
}));

describe('Calendar Component', () => {
  it('displays no data message when no events are provided', () => {
    render(<Calendar events={[]} timerHabit={false} />);
    expect(screen.getByText('No data logged yet')).toBeInTheDocument();
  });

  it('groups dates correctly for timer habits', () => {
    const events: [number, number][] = [
      [1691001600, 1691088000] // spans from 2nd to 3rd August 2023
    ];
    render(<Calendar events={events} timerHabit={true} />);
    expect(CalenderComp).toHaveBeenCalledWith({
      selected: expect.arrayContaining([new Date('2023-08-02'), new Date('2023-08-03')])
    }, expect.anything());
  });

  it('groups dates correctly for non-timer habits', () => {
    const events: [number, number][] = [
      [1691001600, 5], // a single event on 2nd August 2023
      [1691088000, 3]  // another event on 3rd August 2023
    ];
    render(<Calendar events={events} timerHabit={false} />);
    expect(CalenderComp).toHaveBeenCalledWith({
      selected: expect.arrayContaining([new Date('2023-08-02'), new Date('2023-08-03')])
    }, expect.anything());
  });
});
