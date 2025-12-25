import express from 'express';
import { registerUser, loginUser, adminUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin-register', adminUser);


export default router;