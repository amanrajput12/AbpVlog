import { Router } from "express";
import { Refrence } from "../Controllers/Refrence.js";
import { upload } from "../Middleware/Multer.js";

const Refrencerouter = Router();

Refrencerouter.route('/create').post(
    upload.single('files'), // Handle single file upload with key 'files'
    (req, res, next) => {
        console.log('Request received:');
        console.log(req.body);
        console.log(req.file.path); // This should now show file details
        next();
    },
    Refrence
);

export { Refrencerouter };
