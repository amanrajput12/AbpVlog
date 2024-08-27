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
import Video from './User/Video.jsx';
import PlayVideo from './User/PlayVideo.jsx';
const routes = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"video",
        element:<Video/>
      },
      {
        path:"video/play",
        element:<PlayVideo/>
      }
    ]
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
         
         <Provider store={Appstore}>
   <GoogleOAuthProvider clientId={import.meta.env.VITE_clientId}>
  <RouterProvider router={routes} />
    </GoogleOAuthProvider> 
    </Provider>
  

)
