import { render, screen, fireEvent } from '@testing-library/react';
import HabitCard from './habitCard'; 
import '@testing-library/jest-dom';

describe('HabitCard', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    render(
      <HabitCard
        id="312"
        name="Coffie"
        bgColor="bg-blue-500"
        onClick={mockOnClick}
      />
    );
  });

  test('renders habit name correctly', () => {
    expect(screen.getByText('Coffie')).toBeInTheDocument();
  });

test('calls onClick prop when clicked', () => {
    const card = screen.getByText('Coffie').parentNode;
    if (card) {
        fireEvent.click(card);
    }
    expect(mockOnClick).toHaveBeenCalledTimes(1);
});
});