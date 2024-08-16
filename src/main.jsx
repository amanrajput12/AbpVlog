import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'



const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
   <GoogleOAuthProvider clientId={import.meta.env.VITE_clientId}>
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
