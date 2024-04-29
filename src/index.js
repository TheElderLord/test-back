const express = require("express");
const cors = require("cors");
const http = require("http");
const https = require("https");
const socketIO = require("socket.io");
const fs = require("fs");
const path = require("path");

// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

const constants = require("./constants/constant");
const { router } = require("./router/ticketRouter");
const branchRouter = require("./router/branchRouter");
const userRouter = require("./router/userRouter");
const employeeRouter = require("./router/employeeRouter");
const serviceRouter = require("./router/serviceRouter");
const windowRouter = require("./router/windowRouter");
const roleRouter = require("./router/roleRouter");
const analyticsRouter = require("./router/analyticsRouter");
const authRouter = require("./router/authRouter");
const messageRouter = require("./router/messageRouter");
const branchListRouter = require("./router/branchListRouter");
const boardRouter = require("./router/boardRouter");

const checkTokenMiddleware = require("./middleware/middleware");

// const websock = require("./websocket/webController");

const options = {
  key: fs.readFileSync(path.join(__dirname, "../public/keys/client-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../public/keys/client-cert.pem")),
};

const app = express();

const server = http.createServer(app);
const httpsServer = https.createServer(options, app);
// const io = socketIO(server);

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRouter);

app.use("/images", express.static(path.join("images")));
app.use(checkTokenMiddleware);
app.use("/api/v1/tickets", router);
app.use("/api/v1/branches", branchRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/windows", windowRouter);
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/branch-list", branchListRouter);
app.use("/api/v1/board", boardRouter);

// (async () => {
//   // Inside this IIFE, you can use await
//   await createUser("admin");

// })();

// websock(io);

const port = constants.port;
const host = constants.host;

const httpsPort = constants.httpsPort;
httpsServer.listen(httpsPort, function () {
  console.log(`Https server is running on ${httpsPort}`);
});
server.listen(port, function () {
  console.log(`Example app listening on ${host}:${port}!`);
});
