import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SensorData from '../Pages/SensorPage/SensorPage';
import LoginPage from '@/Pages/LoginPage/LoginPage';
import { NavBar } from '@/Components/navBar/navBar';
import { ConnectDevicePage } from '@/Pages/ConnectDevicePage/ConnectDevicePage';

const HeaderLayout = () => (
  <>
    <NavBar />
    <div className="pt-14">
      <Outlet />
    </div>
  </>
);

const router = createBrowserRouter(
  [
    {
      element: <HeaderLayout />,
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
        // Add more routes as necessary
      ],
    },
  ]
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;