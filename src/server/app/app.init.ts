import http from 'http';
import mongoose from 'mongoose';
import { Express } from 'express';
import { seedDb } from '../mongoose';

export const initApp = async (app: Express) => {
    try {
        const port = process.env.PORT
        const httpServer = http.createServer(app)

        await mongoose.connect(process.env.MONGO_URL)
        await seedDb();

        httpServer.listen(port, () => console.log(`[HTTP server]: Server is running at http://localhost:${port}`))
    } catch (err) {
        console.log('err', err)
    }
}