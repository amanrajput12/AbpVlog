import React from 'react'
import EmployHeader from './EmployHeader.jsx'
import { Outlet } from 'react-router-dom'

const EmployOutlet = () => {
  return (
    <div>
     
      <EmployHeader/>
      <Outlet/>
    </div>
  )
}

export default EmployOutlet
