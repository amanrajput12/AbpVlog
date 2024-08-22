import React from 'react'
import Singup from './Singup/Singup.jsx'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Singup/>
      <h3 onClick={()=>navigate('/admin')}>Admin</h3>
      <button onClick={()=>navigate('/admin/dashboard')}>Dashboard admin</button>
    </div>
  )
}

export default App
