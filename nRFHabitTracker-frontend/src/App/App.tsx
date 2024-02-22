// Contains the main routing logic for the application
// utilizes the react-router-dom library to handle routing

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SensorData from '../Pages/SensorPage/SensorPage';
import {LoginPage} from '@/Pages/LoginPage/LoginPage';
import { NavBar } from '@/Components/navBar/navBar';
import { ConnectDevicePage } from '@/Pages/ConnectDevicePage/ConnectDevicePage';
import { SignupPage } from '@/Pages/UserSignup/UserSignup';
import { Footer } from '@/Components/footer/footer';

// Layout component that includes the navigation bar and the main content outlet
const Layout = () => (
  <>
    <NavBar /> {/* Nav bar to be displayed on every page */}
    <Outlet /> {/* Main content outlet */}
    <Footer /> {/* Footer to be displayed on every page */}
  </>
);

const router = createBrowserRouter(
  [
    {
      element: <Layout />, // Root layout component
      children: [
        {
          path: '/',
          element: <LoginPage />,
        },
        {
          path: '/sensor-data',
          element: <SensorData />,
        },
        {
          path: '/connect-device',
          element: <ConnectDevicePage />,
        },
        {
          path: '/signup',
          element: <SignupPage />,
        },
        // Add more routes as necessary
      ],
    },
  ]
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;