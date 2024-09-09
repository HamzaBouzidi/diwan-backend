import express from 'express';
import { register } from '../controllers/user.controller.js';  // Import the controller functions

const router = express.Router();

// Route for user registration
router.post('/register', register);






export default router;
