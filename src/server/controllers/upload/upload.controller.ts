import { Response } from 'express';
import uploadService from '../../services/upload/upload.service';

const addUpload = async (req: any, res: Response) => {
    try {
        await uploadService.uploadImg(req, res);
        res.status(200);
    } catch (err) {
        res.status(500).json({ error: err.toString() })
    }
}

export default {
    addUpload
}