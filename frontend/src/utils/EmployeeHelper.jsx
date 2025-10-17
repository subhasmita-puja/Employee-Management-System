import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "120px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px"
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
    width: "140px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px"
  },
  {
    name: "Action",
    cell: (row) => row.action,
    center: true,
    width: "340px"
  },
];

export const fetchDepartments = async () => {
  let departments;

  try {
    const response = await axios.get('http://localhost:5000/api/department', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  
  return departments;
};

export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();

  const handleView = () => {
    console.log("View button clicked for ID:", id);
    navigate(`/admin-dashboard/employees/view/${id}`);
  };

  const handleEdit = () => {
    console.log("Edit button clicked for ID:", id);
    navigate(`/admin-dashboard/employees/edit/${id}`);
  };

  const handleSalary = () => {
    console.log("Salary button clicked for ID:", id);
    navigate(`/admin-dashboard/employees/salary/${id}`);
  };

  const handleLeave = () => {
    console.log("Leave button clicked for ID:", id);
    navigate(`/admin-dashboard/employees/leaves/${id}`);
  };

  return (
    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
      

      <button
        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
        onClick={handleEdit}
        type="button"
      >
        Edit
      </button>

      

      <button
        className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition"
        onClick={handleLeave}
        type="button"
      >
        Leave
      </button>
    </div>
  );
};