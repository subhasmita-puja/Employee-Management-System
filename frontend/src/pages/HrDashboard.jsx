import React from 'react'
import HrSidebar from '../components/Hrdashboard/hrsidebar'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'

const HrDashboard = () => {
   return (
    <div>
      <HrSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
<Navbar />
<Outlet />
      </div>
    </div>
  )
}




export default HrDashboard