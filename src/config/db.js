import mongoose from "mongoose";;

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("mongodb connected successfully"))
.catch((err)=>console.log(err))
};