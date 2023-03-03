import { Dog } from './models';
import dogData from './data/dog.data.json';

export const seedDb = async () => {
        const dbIsAlreadySeeded = !!await Dog.count();

        if (dbIsAlreadySeeded) return;

        const dog1 = { name: 'Dog 1', age: 12, breed: 'Labrador' };
        const dog2 = { name: 'Dog 2', age: 12, breed: 'Poodle' };
        const dog3 = { name: 'Dog 3', age: 12, breed: 'Labradoodle' };

        const dogs = [dog1, dog2, dog3]

        await Dog.insertMany([...dogs, ...dogData])
}