import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Refers to the User Schema
        required: true
    },
    date: {
        type: Date,
        default: Date.now,  // Automatically records the date when attendance is marked
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late', 'Leave'],
        default: 'Absent',  // Default status is 'Present'
        required: true
    },
    checkIn: {
        type: Date,  // Automatically stores check-in time
        default: Date.now
    },
    checkOut: {
        type: Date, 
        default: null
    }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export { Attendance };
