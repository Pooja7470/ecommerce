import mongoose from "mongoose";
const connectDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connection Established");

    }catch(error){
        console.log("error message");
    }
};
export default connectDatabase;
