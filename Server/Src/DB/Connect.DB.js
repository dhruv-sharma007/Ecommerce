import mongoose from "mongoose"
import DB_Name from "../Utils/Constent.js"
import asyncHandler from "../Utils/AsyncHandler.js"

const ConnectDB = async()=>{
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`)
        console.log(`Mongodb connected !!! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB not connected ERROR: ", error)
        process.exit(1)
    }
} 

export default ConnectDB