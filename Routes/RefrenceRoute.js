import { Router } from "express";
import { Refrence } from "../Controllers/Refrence.js";
import { handleMulterError, upload } from "../Middleware/Multer.js";

const Refrencerouter = Router();

Refrencerouter.route('/create').post(
    upload.fields([
        { name: 'userId', maxCount: 1 },
        { name: 'userPhoto', maxCount: 1 },
        { name: 'paymentPhoto', maxCount: 1 }
    ]), 
    handleMulterError,
    Refrence
);

export { Refrencerouter };
