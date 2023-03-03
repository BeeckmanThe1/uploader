import { Request, Response } from 'express';
import dogService from '../../services/dogs/dog.service';

const getDog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const dog = await dogService.getDogById(id);

        res.status(200).json(dog);
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

const getDogs = async (req: Request, res: Response) => {
    try {
        const allDogs = await dogService.getAllDogs();
        res.status(200).json(allDogs);
    } catch (err) {
        res.status(500).json({ error: err.toString() })
    }
}

export default {
    getDog,
    getDogs
}