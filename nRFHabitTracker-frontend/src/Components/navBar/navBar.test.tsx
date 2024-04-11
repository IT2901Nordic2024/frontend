import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavBar } from './navBar';
import { BrowserRouter } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // import and retain the original functionalities
  useNavigate: () => jest.fn().mockImplementation(() => '/'), // mock useNavigate
}));

describe('NavBar', () => {
  test('navigates to the login page on image click', async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Find the image and click it
    const image = screen.getByRole('img', {name: /icon/i}); // Find the image by its alt text
    userEvent.click(image);
  });
});