import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { EmployeeButtons } from "../../utils/EmployeeHelper";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/employee", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.success && response.data.employees.length > 0) {
        setEmployees(response.data.employees);
        setFilteredEmployees(response.data.employees);
      } else {
        setEmployees([]);
        setFilteredEmployees([]);
        alert("No employee records found");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [location]);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const records = employees.filter(emp => {
      const empName = emp.userId?.name || "";
      const depName = emp.department?.dep_name || emp.department?.name || "";
      return empName.toLowerCase().includes(searchTerm) || 
             depName.toLowerCase().includes(searchTerm);
    });
    setFilteredEmployees(records);
  };

  const columns = [
    {
      name: "S No",
      selector: (row, index) => index + 1,
      width: "70px"
    },
    {
      name: "Image",
      cell: (row) => (
        <div className="flex justify-center items-center">
          <img
            src={`http://localhost:5000/${row.userId?.profileImage || 'uploads/default.png'}`}
            alt="profile"
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>
      ),
      width: "90px"
    },
    {
      name: "Name",
      selector: (row) => row.userId?.name || "N/A",
      sortable: true,
      width: "140px"
    },
    {
      name: "Department",
      selector: (row) => row.department?.dep_name || row.department?.name || "N/A",
      sortable: true,
      width: "140px"
    },
    {
      name: "DOB",
      selector: (row) => new Date(row.dob).toLocaleDateString(),
      sortable: true,
      width: "130px"
    },
    {
      name: "Actions",
      cell: (row) => <EmployeeButtons id={row._id} />,
      width: "340px",
      ignoreRowClick: true
    },
  ];

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Employee or Department Name"
          className="px-4 py-2 border rounded w-80"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700"
        >
          Add New Employee
        </Link>
      </div>
      
      <div className="bg-white rounded shadow">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          progressPending={loading}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          noDataComponent={<div className="p-4">No employees found</div>}
        />
      </div>
    </div>
  );
};

export default EmployeeList;
