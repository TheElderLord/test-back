const getBranches = require("../../controller/branch/getBranches")

module.exports = async (io) => {
  const serverModule = io.of('/server');
  

  // Function to send a message to clients every 5 seconds
  const sendPeriodicMessage = async() => {
    const messages = await getBranches();
    serverModule.emit('chatMessage', messages); // Broadcast the message to all clients
  };

  // Set up the interval to send a message every 5 seconds
  const messageInterval = setInterval(sendPeriodicMessage, 5000);

  serverModule.on('connection', (socket) => {
    console.log('New connection to chat module');

    // Handle events for the chat module
   

    socket.on('disconnect', () => {
      console.log('Client disconnected from chat module');
    });
  });

  // Clean up the interval when the server is stopped
  serverModule.on('close', () => {
    clearInterval(messageInterval);
  });

  return serverModule;
};
