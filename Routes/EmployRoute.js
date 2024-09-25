import { Router } from "express";
import { AdminEmploy, CreateEmploy, EmployAttendace, EmployLogin } from "../Controllers/Attendance.js";
import { AdminVerify } from "../Middleware/AdminVerify.js";



const Employrouter =Router()

Employrouter.route('/attendence').post(EmployAttendace)
Employrouter.route('/create').post(AdminVerify,CreateEmploy)
Employrouter.route('/adminemploy').get(AdminEmploy)
Employrouter.route('/login').post(EmployLogin)

export {Employrouter}