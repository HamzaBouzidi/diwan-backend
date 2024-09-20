import express from 'express';
import { addMorningDelay, getAllMorningDelays, getMorningDelayCountsByAcceptance } from '../controllers/morningDelay.controller.js';

const router = express.Router();

router.post('/morning-delay/add', addMorningDelay);
router.get('/morning-delay/list', getAllMorningDelays);
router.get('/morning-delay/counts', getMorningDelayCountsByAcceptance);











export default router;
