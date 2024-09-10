import { Router } from "express";
import { Refrence } from "../Controllers/Refrence.js";
import { handleMulterError, upload } from "../Middleware/Multer.js";

const Refrencerouter = Router();

Refrencerouter.route('/create').post(
    upload.single('paymentPhoto'), 
    handleMulterError,
    Refrence
);

export { Refrencerouter };
