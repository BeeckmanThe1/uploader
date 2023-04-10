import { Request, Response } from 'express'
import { getBasicSkeleton } from '../../html/htmlTemplateProvider';

const getRoot = (req: Request, res: Response) => {
    res.send(getBasicSkeleton())
}

export default {
    getRoot
}