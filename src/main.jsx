import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import {createBrowserRouter, RouterProvider}  from "react-router-dom"
import {Provider} from "react-redux"
import Appstore from '../store/store.js';
import Admin from './Admin/Admin.jsx';
import AdminDashboard from './Admin/AdminDashboard.jsx';
const routes = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
    {
      path:"/admin",
      element:<Admin/>,
      children:[
        {
          path: "dashboard",
          element:<AdminDashboard/>,
        }
      ]
    }
])


const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={Appstore}>
   <GoogleOAuthProvider clientId={import.meta.env.VITE_clientId}>
  <RouterProvider router={routes} />
    </GoogleOAuthProvider> 
    </Provider>
  </StrictMode>,
)
