import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        

        await mongoose.connect(process.env.MONGO_URI!)
        
    } catch (error) {
        console.error(error);
    }
};
