import http from 'http';
import { Express } from 'express';

export const initApp = async (app: Express) => {
    try {
        const port = process.env.PORT
        const httpServer = http.createServer(app)

        httpServer.listen(port, () => console.log(`[HTTP server]: Server is running at http://localhost:${port}`))
    } catch (err) {
        console.log('err', err)
    }
}