const multer = require('multer');
import { Request, Response } from 'express'

const uploadImg = async (req: Request, res: Response) => {
    try {
        const storage = multer.diskStorage({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            destination:  (_request, _file, callback) => callback(null, './dist/uploads'),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            filename: (_req, file: Express.Multer.File, callback: () => void) => callback(null, file.originalname)
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