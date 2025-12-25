import mongoose from "mongoose";

//create the user schema

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require:true 
        },
        email: {
            type: String,
            require:true,
            unique:true 
        },
        password: {
            type:String,
            require: true 
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }



    },
    {
        timestamps:true,
        versionKey:false 
    }
)

export const User = mongoose.model('User', userSchema);
