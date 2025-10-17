import axios from "axios";
import React, { useEffect, useState } from "react";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) query.append("date", dateFilter);

      const response = await axios.get(
        `http://localhost:5000/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({
            ...prevData,
            ...response.data.groupData,
          }));
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  return (
    <div className="min-h-screen p-10 bg-white">
      <h2 className="text-center text-2xl font-bold">Attendance Report</h2>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Filter by Date</h2>
        <input
          type="date"
          className="border bg-gray-100 px-3 py-1 rounded"
          onChange={(e) => {
            setDateFilter(e.target.value);
            setSkip(0);
          }}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        Object.entries(report).map(([date, records]) => (
          <div className="mt-4 border-b pb-4" key={date}>
            <h2 className="text-xl font-semibold mb-2">{date}</h2>
            <table className="w-full border" cellPadding="10">
              <thead>
                <tr className="bg-gray-100">
                  <th>S.No</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((data, i) => (
                  <tr key={data.employeeId}>
                    <td>{i + 1}</td>
                    <td>{data.employeeId}</td>
                    <td>{data.employeeName}</td>
                    <td>{data.departmentName}</td>
                    <td>{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="mt-3 px-4 py-2 border bg-gray-100 text-lg font-semibold rounded"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AttendanceReport;
