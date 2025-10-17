import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "Male",
    maritalStatus: "Single",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "employee",
    image: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (Array.isArray(res.data.departments)) {
          setDepartments(res.data.departments);
        } else {
          setDepartments([]);
        }
      } catch (err) {
        setDepartments([]);
      }
    };
    fetchDepartments();
  }, []);

 const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      } else {
        alert(response.data.error || "Failed to add employee");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Error adding employee");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg ">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
            <input name="name" type="text" id="name" onChange={handleChange} value={formData.name} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
            <input name="email" type="email" id="email" onChange={handleChange} value={formData.email} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div>
            <label htmlFor="employeeId" className="block mb-1 font-medium text-gray-700">Employee ID</label>
            <input name="employeeId" type="text" id="employeeId" onChange={handleChange} value={formData.employeeId} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div>
            <label htmlFor="dob" className="block mb-1 font-medium text-gray-700">Date of Birth</label>
            <input name="dob" type="date" id="dob" onChange={handleChange} value={formData.dob} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div>
            <label htmlFor="gender" className="block mb-1 font-medium text-gray-700">Gender</label>
            <select name="gender" id="gender" value={formData.gender} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="maritalStatus" className="block mb-1 font-medium text-gray-700">Marital Status</label>
            <select name="maritalStatus" id="maritalStatus" value={formData.maritalStatus} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div>
            <label htmlFor="designation" className="block mb-1 font-medium text-gray-700">Designation</label>
            <input name="designation" type="text" id="designation" onChange={handleChange} value={formData.designation} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>


            <div>
          <label
            htmlFor="department"
            className="block mb-1 font-medium text-gray-700"
          >
            Department
          </label>
          <select
            name="department"
            id="department"
            onChange={handleChange}
            value={formData.department}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.dep_name}
              </option>
            ))}
          </select>
        </div>

          
          <div>
            <label htmlFor="salary" className="block mb-1 font-medium text-gray-700">Salary</label>
            <input name="salary" type="number" id="salary" onChange={handleChange} value={formData.salary} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
            <input name="password" type="password" id="password" onChange={handleChange} value={formData.password} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div>
            <label htmlFor="role" className="block mb-1 font-medium text-gray-700">Role</label>
            <input name="role" type="text" id="role" value="employee" readOnly
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"/>
          </div>
          <div className="col-span-full">
            <label htmlFor="image" className="block mb-1 font-medium text-gray-700">Profile Image</label>
            <input name="image" type="file" accept="image/*" onChange={handleChange}
              className="w-full text-gray-700"/>
          </div>
        </div>
        <button type="submit" 
          className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-md shadow">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
