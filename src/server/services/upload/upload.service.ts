const multer = require('multer');
import { Request, Response } from 'express'

const uploadImg = async (req: Request, res: Response) => {
    try {
        const storage = multer.diskStorage({
            destination:  (_request: Request, _file, callback: (_a: undefined, _b: string) => void) => callback(null, './dist/uploads'),
            filename: (_req: Request, file: Express.Multer.File, callback: (_a: undefined, _b: string) => void) => callback(null, file.originalname)
        });
        const upload = multer({ storage }).single('file');

        upload(req, res, (error: Error) => {
            setTimeout(() => {
                if(error) return res.status(500).json(error);
                else return res.status(200).send('File is uploaded successfully');
            }, 2000)
        });
    } catch (err) {
        console.log('error!', err)
        throw new Error(err)
    }
}

export default {
    uploadImg
}