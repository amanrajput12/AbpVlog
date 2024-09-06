import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import Admin from './Admin/Admin.jsx';
import AdminDashboard from './Admin/AdminDashboard.jsx';
import Video from './User/Video.jsx';
import PlayVideo from './User/PlayVideo.jsx';
import Singup from './Singup/Singup.jsx';
import TimeSpend from './Admin/TimeSpend.jsx';
import Register from './Register/Register.jsx';
import VerifyUser from './Admin/VerifyUser.jsx';
import ShowImage from './Admin/ShowImage.jsx';
import Wallet from './User/Wallet.jsx';
import AboutUs from './Footer/Aboutus.jsx';
import AuthRoute from './User/AuthRoute.jsx'; // Import the AuthRoute component
import Appstore from '../store/store.js';
import './index.css'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Singup />
      },
      {
        path: "video",
        element: <AuthRoute element={<Video />} /> // Protect the route
      },
      {
        path: 'wallet',
        element: <AuthRoute element={<Wallet />} /> // Protect the route
      },
      {
        path: "video/play",
        element: <AuthRoute element={<PlayVideo />} /> // Protect the route
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: "/admin",
    element: <AuthRoute element={<Admin />} />, // Protect the admin route
    children: [
      {
        path: "",
        element: <VerifyUser />
      },
      {
        path: "check",
        element: <ShowImage />
      },
      {
        path: "dashboard",
        element: <AdminDashboard />
      },
      {
        path: 'time',
        element: <TimeSpend />
      }
    ]
  },
  {
    path: "/about",
    element: <AboutUs />
  }
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={Appstore}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_clientId}>
      <RouterProvider router={routes} />
    </GoogleOAuthProvider>
  </Provider>
);
