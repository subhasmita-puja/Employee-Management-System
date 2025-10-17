import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js';
import employeeRoutes from './routes/employee.js';
import connectToDatabase from './db/db.js'
import leaveRouter from './routes/leave.js'
import dashboardRouter from './routes/dashboard.js'
import attenndanceRouter from './routes/attendance.js'

connectToDatabase();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRoutes);
app.use('/api/leave', leaveRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/attendance', attenndanceRouter);
app.use(express.static("public/uploads"));

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}`);
});
