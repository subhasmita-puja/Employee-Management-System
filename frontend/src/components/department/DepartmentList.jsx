import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response?.data?.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              id={dep._id}        // fix prop name to match DepartmentButtons
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));

        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const filterDepartments = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(searchTerm)
    );
    setFilteredDepartments(filtered);
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>

          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search By Dep Name"
              className="px-4 py-0.5 border rounded"
              onChange={filterDepartments}
            />

            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Department
            </Link>
          </div>

          <div className="mt-5">
            <DataTable columns={columns} data={filteredDepartments} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
