import express from 'express'
import { getTripById } from '../Controllers/getTripByIdController.js';

const router = express.Router();

router.get('/:id', getTripById)

export default router