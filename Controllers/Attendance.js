import { Attendance } from "../Models/AttendanceSchema.js";
import { Employ } from "../Models/EmployShema.js";



export const EmployAttendace = async function (req, res) {
    try {
        const { userId, status } = req.body;
        console.log("in employ attendance", req.body);

        // Check if userId and status are provided
        if (!userId || !status) {
            return res.status(400).json({
                message: "Id and Status required",
                success: false
            });
        }

        // Get the current date and time for today
        const currentDate = new Date();

        // Extract the current day, month, and year for comparison (ignores time)
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();  // Month is zero-indexed (0 = January)
        const currentYear = currentDate.getFullYear();

        // Find if attendance is already marked for this user on the same date
        const existingAttendance = await Attendance.findOne({
                EmployId: userId});
              console.log("exist attendace",existingAttendance);
              
        // Check if there's an attendance for today by comparing the date parts (day, month, year)
        if (existingAttendance) {
            const attendanceDate = new Date(existingAttendance.createdAt);
            const attendanceDay = attendanceDate.getDate();
            const attendanceMonth = attendanceDate.getMonth();
            const attendanceYear = attendanceDate.getFullYear();

            if (attendanceDay === currentDay && attendanceMonth === currentMonth && attendanceYear === currentYear) {
                // If the attendance date matches the current date, attendance has already been marked
                return res.status(400).json({
                    message: "Attendance has already been marked for today",
                    success: false
                });
            }
        }

        // If no attendance is found for today, proceed to mark attendance
        const attendance = await Attendance.create({
            EmployId: userId,
            status,
        });

        if (attendance) {
            return res.status(200).json({
                message: "Attendance marked successfully",
                success: true // Marking this as a successful operation
            });
        }

    } catch (error) {
        console.log("Error marking attendance:", error.message);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};



export const CreateEmploy = async function (req,res) {
    try {
    
         const {department,ifscCode,accountNo,joiningDate,reportingManager,email,emplId,name,password}=req.body
         console.log("in create employ",req.body);
         

         if(!(department,ifscCode,accountNo,joiningDate,reportingManager,email,emplId,name,password)){
            return res.status(400).json({
                message:"All field required",
                sucess:false
            })
         }
         const alreadyEmploy = await Employ.findOne({email})
         if(alreadyEmploy){
            return res.status(400).json({
                message:"This email already Exist",
                sucess:false
            })
         }
                 
           const employ = await Employ.create({
            department,
            ifscCode,
            accountNo,
            joiningDate,
            reportingManager,
            email,
            emplId,
            name,
            password
           })

           res.status(201).json({
            message:"Employ created Sucessfully",
            sucess:true,
            employ
           })

    } catch (error) {
        console.log("error on creating employ",error.message);
        res.status(500).json({
            message:"Server Error",
            sucess:false
        })
        
    }
}

export const AdminEmploy = async function (req,res) {
    try {
          const data = await Employ.find().select('-password');
          console.log("data in adminemploy",data);
                
               res.status(200).json({
                message:"Employ get Sucess",
                sucess:true,
                data
               })
    } catch (error) {
         console.log("error on get employ admin",error.message);
         
    }
}

export const EmployLogin = async function (req, res) {
    try {
        const { email, password } = req.body;

        // Step 1: Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Both email and password are required",
                success: false
            });
        }

        // Step 2: Check if the email exists in the Employ database
        const employ = await Employ.findOne({ email: email.toLowerCase() }); // Convert to lowercase to avoid case sensitivity

        if (!employ) {
            return res.status(404).json({
                message: "Employee not found",
                success: false
            });
        }

        // Step 3: Check if the password matches (plain text comparison)
        if (employ.password !== password) {
            return res.status(401).json({
                message: "Incorrect password",
                success: false
            });
        }

        // Step 4: If email and password are correct, return a success message
        return res.status(200).json({
            message: "Login successful",
            success: true,
            employ: {
                email: employ.email,
                name: employ.name,
                employId:employ._id
                // You can return additional details here if needed
            }
        });

    } catch (error) {
        console.log("Error on employ login:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};