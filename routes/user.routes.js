import express from 'express';
import { getAccountCountByMonth, getAllUsers, getUserInfo, login, register, updateUserState } from '../controllers/user.controller.js';  

const router = express.Router();

// Route for user registration
router.post('/register', register);
router.post('/login', login);
router.get('/all-users', getAllUsers);
router.put('/users/:userId/state', updateUserState);
router.get('/user-info/:user_ref_emp/', getUserInfo);
router.get('/account-count-by-month', getAccountCountByMonth);












export default router;
