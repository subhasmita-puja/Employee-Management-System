import React from 'react'
import {NavLink} from 'react-router-dom'
import {FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaBuilding, FaUsers, FaRegCalendarAlt} from 'react-icons/fa'
import { useAuth } from '../../context/authContext'
import { AiOutlineFileText } from 'react-icons/ai';


const HrSidebar = () => {
    const {user} = useAuth()
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-teal-700 h-12 flex items-center justify-center'>
            <h3 className='text-2xl text-center font-pacifico'>Employees MS</h3>
        </div>
        <div>
            <NavLink to="/hr-dashboard"
             className={({isActive}) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}end>
                <FaTachometerAlt />
                <span> HR Dashboard</span>
            </NavLink>
            </NavLink>
            <NavLink to="/hr-dashboard/departments"
             className={({isActive}) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
                <FaBuilding />
                <span>Department</span>
            </NavLink>
            <NavLink to="/hr-dashboard/leaves"
             className="flex items-center space-x-4 py-2.5 px-4 rounded">
                <FaCalendarAlt />
                <span>Leave</span>
            </NavLink>
            <NavLink to={`/hr-dashboard/attendance`}
                         className={({isActive}) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
                            <FaRegCalendarAlt />
                            <span>Attendance</span>
                        </NavLink>
                        <NavLink to={`/hr-dashboard/attendance-report`}
                                     className={({isActive}) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`}>
                                        <AiOutlineFileText />
                                        <span>Attendance Report</span>
                                    </NavLink>
            
        </div>
    </div>
  )
}

export default HrSidebar
