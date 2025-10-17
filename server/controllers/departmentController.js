import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error("getDepartments error:", error);
    return res.status(500).json({ success: false, error: "get department server error" });
  }
};

const addDepartment = async (req, res) => {
  try {
    console.log("addDepartment request body:", req.body);
    const { dep_name, description } = req.body;

    if (!dep_name || dep_name.trim() === "") {
      return res.status(400).json({ success: false, error: "Department name is required" });
    }

    const newDep = new Department({ dep_name, description });
    await newDep.save();

    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    console.error("addDepartment error:", error);
    return res.status(500).json({ success: false, error: "add department server error" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error("getDepartment error:", error);
    return res.status(500).json({ success: false, error: "get department server error" });
  }
};

const updateDepartments = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    if (!dep_name || dep_name.trim() === "") {
      return res.status(400).json({ success: false, error: "Department name is required" });
    }

    const updatedDep = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true }
    );

    if (!updatedDep) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department: updatedDep });
  } catch (error) {
    console.error("updateDepartments error:", error);
    return res.status(500).json({ success: false, error: "edit department server error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedep = await Department.findById(id);
    if (!deletedep) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    await deletedep.deleteOne();

    return res.status(200).json({ success: true, deletedep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "delete department server error" });
  }
};


export { addDepartment, getDepartments, getDepartment, updateDepartments, deleteDepartment };
