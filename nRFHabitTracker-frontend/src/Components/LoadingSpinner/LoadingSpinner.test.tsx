import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingSpinner } from './LoadingSpinner';

// Checks if the LoadingSpinner component renders without crashing

describe('LoadingSpinner', () => {
  it('renders successfully', () => {
    render(<LoadingSpinner />);
    expect(screen.getByAltText('Loading')).toBeInTheDocument();
  });
});

