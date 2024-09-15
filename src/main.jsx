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

import Register from './Register/Register.jsx';
import VerifyUser from './Admin/VerifyUser.jsx';
import ShowImage from './Admin/ShowImage.jsx';
import Wallet from './User/Wallet.jsx';
import AboutUs from './Footer/Aboutus.jsx';

import Appstore from '../store/store.js';
import './index.css'
import LoginMain from './Singup/LoginMain.jsx';
import CreateAdd from './Admin/CreateAdd.jsx';
import TermsAndConditions from './Footer/TermsAndConditions.jsx';
import CareerPage from './Footer/CareerPage.jsx';
import AdminWallet from './Admin/AdminWallet.jsx';
import SearchVideo from './Admin/SearchVideo.jsx';
import DeleteVideo from './Admin/DeleteVideo.jsx';
import Team from './User/Team.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <LoginMain />
      },
      {
        path: "video",
        element: <Video /> // Protect the route
      },
      {
        path: 'wallet',
        element: <Wallet/> // Protect the route
      },
      {
        path:'team',
        element:<Team/>
      },
      {
        path: "video/play",
        element: <PlayVideo />// Protect the route
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: "/admin",
    element: <Admin />, // Protect the admin route
    children: [
      {
        path: "",
        element: <VerifyUser />
      },
      {
        path:'wallet',
        element:<AdminWallet/>
      },
     
      {
       path:'createAdd',
       element:<CreateAdd/>
      },
      {
        path: "check",
        element: <ShowImage />
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
       
      },
      {
        path:'search',
        element:<SearchVideo/>
      },
      {
        path:'delete',
        element:<DeleteVideo/>
      }
     
    ]
  },
  {
    path: "/about",
    element: <AboutUs />
  },
  {
    path:"/terms",
    element:<TermsAndConditions/>
  },
  {
    path:"/careers",
    element:<CareerPage/>
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
