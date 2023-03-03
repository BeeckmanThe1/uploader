import express from 'express';
import { dogRouter } from './dogs';
import { uploadRouter } from './upload';

export const router = express.Router();

router.use('/dogs', dogRouter)
router.use('/upload', uploadRouter)