import { Router } from "express";
import { addTeamMember } from "../Controllers/TeamController.js";



const Teamrouter = Router() 

Teamrouter.post('/add-team-member',addTeamMember)

export {Teamrouter}