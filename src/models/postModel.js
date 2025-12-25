import mongoose from 'mongoose';
import { User } from './userModel.js';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        unique: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
        
    }

},
{
    timestamps :true,
    versionKey: false
});

export const Post = mongoose.model('Post', postSchema);