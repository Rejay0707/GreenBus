import express from 'express';
import { getAllTicket } from "../Controllers/getAllTicketController.js";

const router = express.Router();

router.get('', getAllTicket);

export default router