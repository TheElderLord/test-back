const messageSocket = require("./messageSocket");
const serverSocket = require('./serverSocket');
const ticketSocket = require('./ticketSocket');

const websock = (io)=>{
    messageSocket(io);
    serverSocket(io)
    ticketSocket(io)
}
module.exports = websock;