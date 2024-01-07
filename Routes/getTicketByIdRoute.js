import express from 'express';
import { getTicketById } from '../Controllers/getTicketByIdController.js';


const router = express.Router();
router.route('/:id').get(getTicketById)

export default router