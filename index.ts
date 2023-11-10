// src/server.ts
const http = require('http');
import * as WebSocket from 'ws';
import * as EventEmitter from 'events';
import * as express from 'express';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });
const eventEmitter: EventEmitter = new EventEmitter();

app.use(express.json());

let chartData = [
    {
        "name": "red",
        "value": 154
    },
    {
        "name": "green",
        "value": 224
    },
    {
        "name": "blue",
        "value": 72
    }
];




wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    // Send a welcome message to the connected client
    ws.send(chartData);
    
    eventEmitter.on('newData', (data) => {
        ws.send(JSON.stringify(data));
    });


    // Handle disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});



app.post('/data', (req, res) => {
    const data = req.body.data;
    // console.log(data);
    // console.log(chartData);
    chartData = data;
    // console.log(chartData);
    eventEmitter.emit('newData', data);
    res.send('Data received');
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
