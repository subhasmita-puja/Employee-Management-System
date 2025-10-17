import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => row.action,
  },
];

export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin-dashboard/department/${id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Do you want to delete this department?");
    if (confirmed) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.data.success) {
          onDepartmentDelete();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button className="bg-teal-600 px-4 py-1 text-white" onClick={handleEdit}>
        Edit
      </button>
      <button className="bg-red-500 px-3 py-1 text-white" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
