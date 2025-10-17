import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';

// Get attendance records for today
const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: [
        { path: "department" },
        { path: "userId" }
      ],
    });

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update or create attendance for given employee and today's date
const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;  // Expect MongoDB ObjectId string
    const { status } = req.body;
    const date = new Date().toISOString().split('T')[0];

    // Find employee by _id (MongoDB ObjectId)
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    // Find attendance record for employee + date and update status
    let attendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date },
      { status },
      { new: true }
    );

    if (!attendance) {
      // If not found, create new attendance record
      attendance = await Attendance.create({
        employeeId: employee._id,
        date,
        status,
      });
    }

    return res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("Error in updateAttendance:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get attendance report possibly filtered by date with pagination
const attendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;
    const query = {};
    if (date) {
      query.date = date;
    }

    const attendanceData = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: [
          { path: "department" },
          { path: "userId" }
        ],
      })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendanceData.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = [];
      }
      result[record.date].push({
        employeeId: record.employeeId.employeeId,
        employeeName: record.employeeId.userId.name,
        departmentName: record.employeeId.department.dep_name,
        status: record.status || "Not Marked"
      });
      return result;
    }, {});

    return res.status(200).json({ success: true, groupData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getAttendance, updateAttendance, attendanceReport };
