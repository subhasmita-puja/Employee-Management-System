import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    
    if (localUser) {
      setUser(localUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!user || !user.id) {
        return;
      }
      
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/${user.id}/${user.role}`,
          {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("token")}` 
            },
          }
        );

        if (response.data.success) {
          setLeaves(response.data.leaves);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
        
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    
    fetchLeaves();
  }, [user]);

  if (!user) {
    return <div className="p-6">Loading user info...</div>;
  }
  
  if (leaves === null) {
    return <div className="p-6">Loading leaves...</div>;
  }

  if (leaves.length === 0) {
    return (
      <div className="p-6">
        <h3 className="text-xl font-bold">No Leaves Found</h3>
        <p>There are no leave records in the database.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      
      <div className="mt-6">
        <p className="mb-4">Found {leaves.length} leave(s)</p>
        
        <div className="space-y-4">
          {leaves.map((leave, index) => (
            <div key={leave._id} className="border rounded-lg p-4 bg-white shadow">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Employee</p>
                  <p className="font-semibold">
                    {leave.employeeId?.userId?.name || 'N/A'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Leave Type</p>
                  <p className="font-semibold">{leave.leaveType}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className={`font-semibold ${
                    leave.status === 'Pending' ? 'text-yellow-600' :
                    leave.status === 'Approved' ? 'text-green-600' :
                    'text-red-600'
                  }`}>
                    {leave.status}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Action</p>
                  <button
                    className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                    onClick={() => navigate(`/admin-dashboard/leaves/${leave._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Dates:</span> {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Reason:</span> {leave.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
