import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';

//register a new user 
export const registerUser = async (req, res)=> {
    const {name, email, password} = req.body;
    try{
        //check all fields are entered
        if(!name || !email || !password) {
            res.status(400).json({message: "all fields are required"})
        }
        //check if email already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({message: "user already exists"})
        }
        //hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        //create the user
        const newUser = await User.create({name, email, password:hashPassword});
        res.status(201).json({message: "user created successfully"});

    }
    catch(err) {
        res.status(500).json({message: "internal server error", err});
    }
}

//login user
export const loginUser = async(req, res)=> {
    const {email, password} = req.body;
    try {
        //check all fields are entered
        if(!email || !password){
            return res.status(400).json({message: "all fields are required"});
        }
        //check if user exist
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(400).json({message: " incorrect login details"});
        }
        
        //check if password is valid
        const isValid = await bcrypt.compare(password, existingUser.password);
        if(!isValid) {
            return res.status(400).json({message: " incorrect login details"});
        }
        //assign a token to the user
        const token = jwt.sign({id: existingUser.id, role: existingUser.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
        
        return res.status(200).json({message: "login successful", token});
        

    }
    catch(err){
        console.error(err)
        res.status(500).json({message: "internal server error"});
    }
}


//ADMIN CREATION

export const adminUser = async (req, res)=> {
    const {name, email, password, role} = req.body;
    try{
        //check all fields are entered
        if(!name || !email || !password, !role) {
            return res.status(400).json({message: "all fields are required"})
        }
        //check if email already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "admin already exists"})
        }
        //hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        //create the user
        const admin = await User.create({name, email, password:hashPassword, role});
        res.status(201).json({message: "admin created successfully"});
    }
    catch(err){
        res.status(500).json({message: "internal server error", err})
    }

}
