import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper";
import { Link } from "react-router-dom";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const statusChange = async () => {
    fetchAttendance()
  }
  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.attendance.map((att) => ({
          employeeId: att.employeeId.employeeId,
          sno: sno++,
          department: att.employeeId.department.dep_name,
          name: att.employeeId.userId.name,
          action: <AttendanceHelper status={att.status} employeeId={att.employeeId._id} statusChange = {statusChange} />,
        }));

        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const records = attendance.filter((emp) =>
      emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredAttendance(records);
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Attendance</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search By Employee or Department Name"
          className="px-4 py-1 border rounded"
          onChange={handleFilter}
        />
        <p className="text-2xl">
          Mark Employees for <span className="text-2xl font-bold underline">{new Date().toISOString().split("T")[0]}{" "}</span>
        </p>
        <Link
          to="/admin-dashboard/attendance-report"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Attendance Report
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredAttendance} pagination />
      </div>
    </div>
  );
};

export default Attendance;
