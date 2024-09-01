import { Router } from "express";
import { Refrence } from "../Controllers/Refrence.js";
import { upload } from "../Middleware/Multer.js";

const Refrencerouter = Router();

Refrencerouter.route('/create').post(
    upload.fields([
        { name: 'userId', maxCount: 1 },
        { name: 'userPhoto', maxCount: 1 },
        { name: 'paymentPhoto', maxCount: 1 }
    ]), // Handle multiple file uploads with specific field names
    (req, res, next) => {
        // Proceed to the next middleware or route handler
        next();
    },
    Refrence
);

export { Refrencerouter };
