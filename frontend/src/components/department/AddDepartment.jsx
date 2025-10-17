import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
        department,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments"); // Redirect triggers DepartmentList to reload data
      } else {
        alert(response.data.error || "Failed to add department");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Error adding department");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Department</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dep_name">Department Name *</label>
        <input
          id="dep_name"
          name="dep_name"
          value={department.dep_name}
          onChange={handleChange}
          placeholder="Enter department name"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={department.description}
          onChange={handleChange}
          placeholder="Enter description"
          rows={4}
        />

        <button type="submit">Add Department</button>
      </form>

      <style>{`
        .form-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          background: white;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 8px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        label {
          font-weight: 600;
          color: #333;
        }
        input, textarea {
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.3s;
        }
        input:focus, textarea:focus {
          border-color: #000;
          outline: none;
        }
        button {
          padding: 12px 20px;
          border: 1px solid #000;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          background: transparent;
          color: #000;
          transition: background-color 0.3s, color 0.3s;
        }
        button:hover {
          background-color: #000;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default AddDepartment;
