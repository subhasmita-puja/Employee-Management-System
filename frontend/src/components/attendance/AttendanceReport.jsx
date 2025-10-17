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

  const handleReset = () => {
    setDateFilter("");
    setSkip(0);
    setReport({});
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Attendance Report
        </h2>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Filter by Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 px-3 py-1.5 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setSkip(0);
              }}
            />
          </div>
          
          {dateFilter && (
            <button
              className="px-4 py-1.5 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition mt-5"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && skip === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p className="mt-3 text-gray-600 text-sm">Loading...</p>
        </div>
      ) : Object.keys(report).length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No attendance records found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(report).map(([date, records]) => (
            <div className="bg-white rounded-lg shadow overflow-hidden" key={date}>
              {/* Date Header */}
              <div className="bg-teal-600 px-4 py-2">
                <h3 className="text-base font-bold text-white">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </h3>
                <p className="text-teal-100 text-xs">
                  {records.length} records
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                        No.
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                        Emp ID
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                        Name
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                        Department
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {records.map((data, i) => (
                      <tr 
                        key={`${data.employeeId}-${i}`}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-3 py-2 text-gray-900">
                          {i + 1 + skip}
                        </td>
                        <td className="px-3 py-2 font-medium text-gray-900">
                          {data.employeeId || "N/A"}
                        </td>
                        <td className="px-3 py-2 text-gray-900">
                          {data.employeeName || "N/A"}
                        </td>
                        <td className="px-3 py-2 text-gray-900">
                          {data.departmentName || "N/A"}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span
                            className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                              data.status === "Present"
                                ? "bg-green-100 text-green-800"
                                : data.status === "Absent"
                                ? "bg-red-100 text-red-800"
                                : data.status === "Half Day"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {data.status || "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Load More Button */}
          <div className="flex justify-center">
            <button
              className="px-6 py-2 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 transition shadow disabled:bg-gray-400"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;
