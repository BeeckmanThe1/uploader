import { Dog } from '../../mongoose';

const getAllDogs = async () => {
    try {
        return Dog.find();
    } catch (err) {
        throw new Error(err)
    }
}

const getDogById = async (id: string) => {
    try {
        return Dog.findById(id);
    } catch (err) {
        throw new Error(err)
    }
}

export default {
    getAllDogs,
    getDogById
}