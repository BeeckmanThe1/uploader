import express from 'express';
import uploadController from '../../../controllers/upload/upload.controller';

export const router = express.Router();

router.route('/')
    .post(uploadController.addUpload);
