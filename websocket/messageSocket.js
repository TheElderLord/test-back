const { getMessages } = require("../controller/users/getMessages");

module.exports = async (io) => {
  const chatModule = io.of('/chat');
  

  // Function to send a message to clients every 5 seconds
  const sendPeriodicMessage = async() => {
    const messages = await getMessages();
    chatModule.emit('chatMessage', messages); // Broadcast the message to all clients
  };

  // Set up the interval to send a message every 5 seconds
  const messageInterval = setInterval(sendPeriodicMessage, 5000);

  chatModule.on('connection', (socket) => {
    console.log('New connection to chat module');

    // Handle events for the chat module
    socket.on('chatMessage', (message) => {
      chatModule.emit('chatMessage', message); // Broadcast the message to all clients
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected from chat module');
    });
  });

  // Clean up the interval when the server is stopped
  chatModule.on('close', () => {
    clearInterval(messageInterval);
  });

  return chatModule;
};
