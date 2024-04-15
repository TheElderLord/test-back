const http = require("http");

const constants = require("./src/constants/constant");
const app = require("./src/index");


const port = constants.port;
const host = constants.host;

const server = http.createServer(app);

// Corrected: Function declaration moved above its usage
 // Corrected: Calling the function after it's declared

server.listen(port, function () {
  console.log(`Example app listening on ${host}:${port}!`);
});
