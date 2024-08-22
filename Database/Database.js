import mongoose from "mongoose";


const connectDb = async()=>{
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connect sucess",db.connection.name);
        
    } catch (error) {
        console.log("error on connecting the db",error.message);
        
    }
}

export {connectDb}