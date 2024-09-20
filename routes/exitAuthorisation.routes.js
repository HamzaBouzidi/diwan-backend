import express from 'express';
import { addExitAuthorisation, getAllExits, getExitCountsByAcceptance } from '../controllers/exitAuthorization.controller.js';

const router = express.Router();

router.post('/authorisation/add-exit', addExitAuthorisation);
router.get('/authorisation/list-exit', getAllExits);
router.get('/authorisation/counts', getExitCountsByAcceptance);









export default router;
