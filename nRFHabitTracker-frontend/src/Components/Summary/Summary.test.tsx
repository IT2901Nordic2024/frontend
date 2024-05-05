import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Summary from './Summary';  

describe('Summary Component', () => {
it('displays correct totals and averages for timer habits', () => {
    const events: Array<[number, number]> = [
        [1707168000, 1707171600], // Event from 5th March 2024 00:00:00 to 5th March 2024 01:00:00 (1 hour)
        [1707254400, 1707256200]  // Event from 6th March 2024 00:00:00 to 6th March 2024 00:30:00 (30 minutes)
    ];
    render(<Summary events={events} timerHabit={true} />);
    expect(screen.getByText('2 hours')).toBeInTheDocument(); // Adjusted total hours
    expect(screen.getByText('1 hours per day')).toBeInTheDocument(); // Daily average
    expect(screen.getByText('5 hours per week')).toBeInTheDocument(); // Weekly average
});

it('displays correct totals and averages for counter habits', () => {
    const events: Array<[number, number]> = [
        [1707168000, 5], // 5 times on 5th March 2024
        [1707254400, 3]  // 3 times on 6th March 2024
    ];
    render(<Summary events={events} timerHabit={false} />);
    expect(screen.getByText('8 times')).toBeInTheDocument(); // Adjusted total counts
    expect(screen.getByText('4 times per day')).toBeInTheDocument(); // Daily average
    expect(screen.getByText('28 times per week')).toBeInTheDocument(); // Weekly average
});
});