/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/config/env';
import { seedSuperAdmin } from './app/utils/seedSuperAdmin';

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);
        console.log('Connected to mongoDB using mongoose');

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is running on port ${envVars.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};


(async () => {
    await startServer();
    await seedSuperAdmin();
})();


process.on('SIGTERM', () => {
    console.log('SIGTERM signal received...Server shutting down');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received...Server shutting down');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

// Promise.reject(new Error('I forget to catch this promise'));

process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception detected...Server shutting down', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

// throw new Error('I forgot to handle this local error')
