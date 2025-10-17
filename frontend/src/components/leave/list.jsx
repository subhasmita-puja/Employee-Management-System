import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const List = () => {
  const [leaves, setLeaves] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  let sno = 1;
  
  const { id: paramId } = useParams();
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

      const employeeId = paramId || user.id;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/${employeeId}/${user.role}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeaves(response.data.leaves);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [user, paramId]);

  if (loading) {
    return <div className="p-6">Loading leaves...</div>;
  }

  if (!leaves || leaves.length === 0) {
    return (
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-2xl font-bold">My Leaves</h3>
          <Link
            to="/employee-dashboard/add-new-leave"
            className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700"
          >
            Add New Leave
          </Link>
        </div>
        <p>No leave records found. Click "Add New Leave" to apply for leave.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-2xl font-bold">My Leaves</h3>
        <Link
          to="/employee-dashboard/add-new-leave"
          className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700"
        >
          Add New Leave
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Applied Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className="bg-white border-b">
                <td className="px-6 py-4">{sno++}</td>
                <td className="px-6 py-4">{leave.leaveType}</td>
                <td className="px-6 py-4">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{leave.reason}</td>
                <td className="px-6 py-4">
                  {new Date(leave.appliedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded ${
                      leave.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : leave.status === "Approved"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
