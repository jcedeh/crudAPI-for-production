import express from 'express';
import { Post } from '../models/postModel.js';

//create new post
export const newPost = async (req, res)=> {
    const {title, content, author} = req.body;
    try {
        //check all fields are entered
        if(!title || !content) {
            return res.status(400).json({message: "all fields are required"})
        }
        //check if similar title already exist
        const existingPost = await Post.findOne({title});
        if(existingPost) {
            return res.status(400).json({message: "same title already exist, please use another title"});
        }

        //create the post
        const newPost = await Post.create({
            title: req.body.title, 
            content: req.body.content,
            author: req.user.id
        });
        res.status(200).json({message: "post created successfully", author: author});

    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "internal server error", err});
    }
}

//get post by logged in user
export const getPosts = async (req, res)=> {
    try {
        const posts = await Post.find({author: req.user.id}).select('-password').populate('author', 'email' );
        
        if(posts.length === 0) {
            return res.status(404).json({message: `No post by user found`});
        }
        res.status(200).json({message: `posts found`, posts});
    }
    catch(err){
        res.status(500).json({message: "internal server error", err});
    }
}


//get post by logged in user by id
export const getPostsById = async (req, res)=> {
   
    try {
        const id = req.params.id;
        console.log(id);
        const post = await Post.findOne({_id:id, author: req.user.id}).select('-password');
        if(!post) {
            return res.status(404).json({message: "post not found or you are not authorized"});
        }
        return res.status(200).json({message: `posts by ${req.user.id}`, post});
    }
    catch(err){
        return res.status(500).json({message: "internal server error", err});
    }
}


//update post
export const updatePost = async (req, res)=> {
    const id = req.params.id;
    const {title, content} = req.body;
    try{
        
        //check if post exist
        const existingPost = await Post.findOne({_id:id, author: req.user.id});
        if(!existingPost) {
            return res.status(404).json({message: "post not found or you are not authorized"})
        }
        //check if similar title already exist
        const existingTitle = await Post.findOne({title});
        if(existingTitle) {
            return res.status(400).json({message: "same title already exist, please use another title"});
        }
        //update post
        const updated = await Post.findOneAndUpdate({_id:id, author: req.user.id}, 
            {title, content}, {new:true});
        return res.status(200).json({message: "post updated successfully"});

    }
    catch(err){
        return res.status(500).json({message: "internal server error", err});
    }

}

//delete post 
export const deletePost = async (req, res)=> {
    const id = req.params.id;
    try {
        //check if post exist
        const existingPost = await Post.findOne({_id:id, author: req.user.id});
        if(!existingPost) {
            return res.status(404).json({message: "post not found or you are not authorized"});
        }
        //delete post
        const deleted = await Post.findOneAndDelete({_id:id});
        return res.status(200).json({message: "post deleted successfully"})
    }
    catch(err){
        
        return res.status(500).json({message: "internal server error", err});
    }
}

//create an admin role; can get all post in database, as well as delete any post in database

export const adminGetPosts = async (req, res)=> {
    try {
        const posts = await Post.find().populate('author', 'email').select('-password');
        return res.status(200).json({posts});
        }
    
    catch(err){
        console.error(err)
        return res.status(500).json({message: "internal server error", err});
    }
}

export const adminDeletePost = async (req, res)=> {
    id = req.params.id;
    try {
        existingPost = await Post.findOne({_id:id}).select('-password');
        if(!existingPost) {
            return res.status(404).json({message: "post not found"});
        }
        //delete the post
        const deleted = await Post.findOneAndDelete({_id:id});
        return res.status(400).json({message: "post deleted by Admin"})
    }
    catch(err){
        return res.status(400).json({message: "internal server error", err});
    }
}