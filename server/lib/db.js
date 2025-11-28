import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected' , () => console.log("connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/chatzee-app`)
    } catch (error) {
        console.log(error)
        
    }
}