import { Request, Response } from 'express'
import { getBasicSkeleton } from '../../html/htmlTemplateProvider';
import { QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient()

const getRoot = (req: Request, res: Response) => {
    res.send(getBasicSkeleton({ queryClient }))
    queryClient.clear()
}

export default {
    getRoot
}