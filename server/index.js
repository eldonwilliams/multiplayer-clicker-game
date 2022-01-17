require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { createState } = require('jstates');
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
    app.use(express.json());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const sharableState = createState({});

// 

// Load routes
fs.readdir(path.join(__dirname, './routes'), {
    withFileTypes: true, // Allows us to check is .js extension
}, (err, files) => {
    if (err) console.error(err);

    files
        .filter(file => file.name.split('.').pop() === 'js')
        .forEach((file) => {
            let loadedModule = require(path.join(__dirname, './routes', file.name));
            loadedModule({
                express: app,
                socket: io,
                state: sharableState,
            });
            console.log(`   - Loaded ${file.name} [${path.join(__dirname, './routes', file.name)}]`);
    });
});

//

httpServer.listen(process.env.SRV_PORT, () => {
    console.log(`Server is serving on port#${process.env.SRV_PORT}`);
});