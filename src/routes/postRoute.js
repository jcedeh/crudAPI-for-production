import express from 'express';
import { newPost, getPosts, getPostsById, updatePost, 
    deletePost, adminGetPosts, adminDeletePost} from '../controllers/postController.js';
import { auth } from '../middlewares/authMiddleware.js';
import { authorizeRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/create-post', auth, newPost);
router.get('/admin-get', auth, authorizeRole('admin'), adminGetPosts);
router.delete('/admin-delete', authorizeRole('admin'), adminDeletePost);
router.get('/get-posts', auth, getPosts);
router.get('/:id', auth, getPostsById);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);



export default router;