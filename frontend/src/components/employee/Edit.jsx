import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: ''
    });
    const [departments, setDepartments] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()

    useState({
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

   

  useEffect(() => {
    const getDepartments = async () => {
      const depts = await fetchDepartments();
      setDepartments(depts);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) {
          const emp = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: emp.userId.name,
            email: emp.userId.email,
            employeeId: emp.employeeId,
            dob: emp.dob,
            gender: emp.gender,
            maritalStatus: emp.maritalStatus,
            designation: emp.designation,
            department: emp.department?._id || "",
            salary: emp.salary,
          }));
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching employee");
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  }

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/employee/add/${id}`,
        employee,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      } else {
        alert(response.data.error || "Failed to update employee");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Error updating employee");
    }
  };

return (
    <>{departments && employee ? (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
                        <input name="name" type="text" id="name" onChange={handleChange} value={employee.name} required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="maritalStatus" className="block mb-1 font-medium text-gray-700">Marital Status</label>
                        <select name="maritalStatus" id="maritalStatus" value={employee.maritalStatus} onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="designation" className="block mb-1 font-medium text-gray-700">Designation</label>
                        <input name="designation" type="text" id="designation" onChange={handleChange} value={employee.designation} required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="salary" className="block mb-1 font-medium text-gray-700">Salary</label>
                        <input name="salary" type="number" id="salary" onChange={handleChange} value={employee.salary} required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="department" className="block mb-1 font-medium text-gray-700">Department</label>
                        <select name="department" id="department" onChange={handleChange} value={employee.department} required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">Select Department</option>
                            {(departments || []).map(d => (
                                <option key={d._id} value={d._id}>{d.dep_name || d.name}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <button type="submit"
                    className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-md shadow">
                    Edit Employee
                </button>
            </form>
        </div>
    ) : <div> Loading.... </div>}</>
);
};

export default Edit;
