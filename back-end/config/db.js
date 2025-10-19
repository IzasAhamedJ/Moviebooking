import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log('DB SUCCESSFULLY CONNECTED');
        })
        await mongoose.connect(`${process.env.DB_URL}/showBooking`)
    } catch (error) {
        console.log(error.message);
    }
}