import multer from "multer";

// Define storage and limits for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public'); // Directory where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Custom filename
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 250 * 1024 } // 250 KB limit
});

// Middleware to handle multer errors
export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: "File size exceeds the 250 KB limit.",
                success: false
            });
        }
    } else if (err) {
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false
        });
    }
    next();
};
