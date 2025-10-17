import Employee from '../models/Employee.js';
import Leave from '../models/Leave.js';

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    if (!userId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await newLeave.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adding leave:", error.message);
    return res.status(500).json({ success: false, error: "Leave add server error" });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id, role } = req.params;
    let leaves;
    
    if (role === "admin") {
      leaves = await Leave.find().populate({
        path: "employeeId",
        populate: [
          { path: 'department', select: 'dep_name' },
          { path: 'userId', select: 'name profileImage employeeId' }
        ]
      });
    } else {
      const employee = await Employee.findOne({ userId: id });
      if (!employee) {
        return res.status(404).json({ success: false, error: "Employee not found" });
      }
      
      leaves = await Leave.find({ employeeId: employee._id }).populate({
        path: "employeeId",
        populate: [
          { path: 'department', select: 'dep_name' },
          { path: 'userId', select: 'name profileImage employeeId' }
        ]
      });
    }
    
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error in getLeave:", error.message);
    return res.status(500).json({ success: false, error: "Leave retrieval server error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: 'department', select: 'dep_name' },
        { path: 'userId', select: 'name' }
      ]
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Leave retrieval server error" });
  }
};

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        { path: 'department', select: 'dep_name' },
        { path: 'userId', select: 'name profileImage' }
      ]
    });

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Leave detail server error" });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Leave update server error" });
  }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
