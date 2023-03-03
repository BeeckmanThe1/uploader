import { Schema, model } from 'mongoose'

export type DogType = {
    name: string,
    breed: string,
    age: number,
    isGoodBoy?: boolean
}
const DogSchema = new Schema<DogType>({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    isGoodBoy: {
        type: Boolean,
        required: false,
        default: true
    }
});

export const Dog = model<DogType>('Dog', DogSchema);