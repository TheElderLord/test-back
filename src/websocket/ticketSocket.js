const {wssSend} = require("../../controller/ticket/ticketController")

module.exports = async (io) => {
  const ticketModule = io.of('/ticket');
  

  // Function to send a message to clients every 5 seconds
  const sendPeriodicMessage = async() => {
    const messages = await wssSend();
    ticketModule.emit('chatMessage', messages); // Broadcast the message to all clients
  };

  // Set up the interval to send a message every 5 seconds
  const messageInterval = setInterval(sendPeriodicMessage, 5000);

  ticketModule.on('connection', (socket) => {
    console.log('New connection to chat module');

    // Handle events for the chat module
   

    socket.on('disconnect', () => {
      console.log('Client disconnected from chat module');
    });
  });

  // Clean up the interval when the server is stopped
  ticketModule.on('close', () => {
    clearInterval(messageInterval);
  });

  return ticketModule;
};
