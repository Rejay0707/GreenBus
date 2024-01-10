import express from 'express';
import { getTicketById } from '../Controllers/getTicketByIdController.js';
import { checkAuthDetails } from '../middleware/authMiddleware.js';


const router = express.Router();
router.route('/:id').get(checkAuthDetails,getTicketById)

export default router