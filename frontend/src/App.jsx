import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import HrDashboard from './pages/HrDashboard';
import Summary from './components/EmployeeDashboard/Summary';
import HrSummary from './components/Hrdashboard/Hrsummary';
import LeaveList from './components/leave/list'
import AddLeave from './components/leave/Add'
import Detail from "./components/leave/Detail"
import Table from "./components/leave/Table"
import Attendance from './components/attendance/Attendance'
import AttendanceReport from './components/attendance/AttendanceReport'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        <Route path="/login" element={<Login />} />

        
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="departments/add" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="departments/edit/:id" element={<EditDepartment />} />

          <Route path="employees" element={<List />} />
          <Route path="employees/edit/:id" element={<Edit />} />
          <Route path="employees/view/:id" element={<View />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="add-employee/edit/:id" element={<Edit />} />

          <Route path="leaves" element={<Table />} />
          <Route path="leaves/:id" element={<Detail />} />
          <Route path="employees/leaves/:id" element={<LeaveList />} />
<Route path="add-leave" element={<AddLeave />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendance-report" element={<AttendanceReport />} />
        </Route>

      <Route path="/employee-dashboard" element={
  <PrivateRoutes>
    <RoleBaseRoutes requiredRole={["admin", "employee"]}>
      <EmployeeDashboard />
    </RoleBaseRoutes>
  </PrivateRoutes>
}>
  <Route index element={<Summary />} />
  <Route path="profile/:id" element={<View />} />
  <Route path="leaves/:id" element={<LeaveList />} />
  <Route path="add-leaves" element={<AddLeave />} />
  <Route path="employees" element={<List />} /> 
   <Route path='add-new-leave' element={<AddLeave />} />
   <Route path='add-leave' element={<AddLeave />} />
   <Route path="attendance" element={<Attendance />} /> 
</Route>
     


        <Route
          path="/Hr-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "hr"]}>
                <HrDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<HrSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="leaves" element={<Table />} />
          <Route path="leaves/:id" element={<Detail />} />
          <Route path="employees/leaves/:id" element={<LeaveList />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendance-report" element={<AttendanceReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
