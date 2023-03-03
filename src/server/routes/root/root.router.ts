import express from 'express';
import { apiRouter } from '../api';
import { rootController } from '../../controllers';

export const router = express.Router();

router.get('/', rootController.getRoot);
router.use('/api', apiRouter)