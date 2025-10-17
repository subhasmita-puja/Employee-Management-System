import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';


const Summary = () => {
    const {user} = useAuth
  return (
    <div className='p-6'>
    <div className="rounded flex bg-white shadow p-4 items-center gap-4">
      <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4 py-3 rounded`}>
       <FaUser />
      </div>
      <div>
        <p className="text-lg font-semibold">Welcome Back</p>
        <p className="text-2xl font-bold">{UserActivation.name}</p>
      </div>
    </div>
    </div>
  );
};

export default Summary;
