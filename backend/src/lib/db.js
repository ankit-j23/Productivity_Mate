import mongoose from 'mongoose'

const MONGO_URI = "mongodb://localhost:27017/Productivity_Mate";

export const connectToMOngo = async () =>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Mongo DB Connected Successfully")
    } catch (error) {
        console.log("Error while connecting to MongoDB" + error)
    }
}