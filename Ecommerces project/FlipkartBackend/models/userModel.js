import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    fullname:{
        type: String,
        require: true,
        trim: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
       
    },
    contact:{
        type: String,
        require: true,
        
    },
    address:{
        type: {},
        require: true,
        
    },
    answer: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
    },
},
{ timestamps: true } 
);

export default mongoose.model("users", userSchema)