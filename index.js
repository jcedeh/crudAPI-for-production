import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import userRoute from './src/routes/userRoute.js';
import postRoute from './src/routes/postRoute.js';

dotenv.config();

const app = express();

//include middlewares
app.use(express.json());

//add database
connectDB();

//add routes
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);




app.listen(process.env.PORT || 2000, ()=>{
    console.log(`server listening on localhost:${process.env.PORT}`)
})