import express from 'express';
import { addVacation, getAllVacations, getVacationCountsByState } from '../controllers/vacation.controller.js';

const router = express.Router();

router.post('/vacations/add', addVacation);
router.get('/vacations/get-all', getAllVacations);
router.get('/vacations/vacation-counts', getVacationCountsByState);











export default router;
