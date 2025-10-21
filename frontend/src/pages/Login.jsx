import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });

    console.log("Login response:", response.data);

    if (response.data.success) {
      // Save token
      localStorage.setItem('token', response.data.token);
      
      // Save user data - FIXED: use .id instead of ._id
      const userData = {
        id: response.data.user.id,  // ✅ FIXED: Backend returns id, not _id
        name: response.data.user.name,
        role: response.data.user.role
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log("User data saved:", userData);
      
      // Update auth context if you're using it
      if (login) {
        login(userData);
      }

      // Navigate based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (response.data.user.role === 'employee') {
        navigate('/employee-dashboard');
      } else if (response.data.user.role === 'hr') {
        navigate('/hr-dashboard');
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    if (error.response && error.response.data && error.response.data.error) {
      setError(error.response.data.error);
    } else {
      setError('Login failed. Please try again.');
    }
  }
};


  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-sevillana text-3xl text-white">Employee Management System</h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600">Forgot Password?</a>
          </div>
          <div className="mb-4">
            <button 
              type="submit"
              className="w-full bg-teal-600 text-white py-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
