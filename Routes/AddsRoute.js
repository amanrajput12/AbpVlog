import { Router } from "express";
import { upload, handleMulterError } from "../Middleware/Multer.js"; // Ensure the path is correct
import { CreateAdds, GetAdds } from "../Controllers/Adds.js";

const Addsroute = Router();

// Define the route with  file upload
Addsroute.route("/create").post(upload.single('AddImage'),handleMulterError,CreateAdds); // Handle any multer errors
Addsroute.route("/get").get(GetAdds)
export { Addsroute };
