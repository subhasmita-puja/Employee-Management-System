import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const [leave, setLeave] = useState({
    userId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    
    if (localUser && localUser.id) {
      // Check if user is admin - admins cannot apply for leave
      if (localUser.role === 'admin') {
        alert("Admins cannot apply for leave");
        navigate("/admin-dashboard");
        return;
      }
      
      setUser(localUser);
      setLeave(prevState => ({
        ...prevState,
        userId: localUser.id
      }));
    } else {
      alert("User not found. Please login again.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!leave.userId || !leave.leaveType || !leave.startDate || !leave.endDate || !leave.reason) {
      alert("Please fill in all fields");
      return;
    }
    
    try {
      const response = await axios.post(
        `http://localhost:5000/api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.data.success) {
        alert("Leave application submitted successfully!");
        navigate(`/employee-dashboard/leaves/${user.id}`);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error || "Failed to submit leave application");
      } else {
        alert("Failed to submit leave application");
      }
    }
  };

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Apply for Leave</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Leave Type <span className="text-red-500">*</span>
          </label>
          <select
            name="leaveType"
            value={leave.leaveType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={leave.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="endDate"
            value={leave.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            name="reason"
            value={leave.reason}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Please provide a reason for your leave..."
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
          >
            Submit Application
          </button>
          <button
            type="button"
            onClick={() => navigate(`/employee-dashboard/leaves/${user.id}`)}
            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
