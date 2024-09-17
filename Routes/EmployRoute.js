import { Router } from "express";
import { EmployAttendace } from "../Controllers/Attendance.js";



const Employrouter =Router()

Employrouter.route('/attendence').post(EmployAttendace)

export {Employrouter}