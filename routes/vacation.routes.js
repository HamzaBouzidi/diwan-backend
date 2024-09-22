import express from 'express';
import { acceptVacation, addVacation, countInProgressVacations, getAllVacations, getVacationCountsByState } from '../controllers/vacation.controller.js';

const router = express.Router();

router.post('/vacations/add', addVacation);
router.get('/vacations/get-all', getAllVacations);
router.get('/vacations/vacation-counts', getVacationCountsByState);
router.put('/vacations/:vacationId/accept', acceptVacation);
router.get('/vacations/count/in-progress', countInProgressVacations);













export default router;
