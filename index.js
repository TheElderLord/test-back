const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

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

const checkTokenMiddleware = require("./middleware/middleware");

const websock = require("./websocket/webController");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/images", express.static(path.join("images")));
app.use(checkTokenMiddleware);
app.use("/api/v1/tickets", router);
app.use("/api/v1/branches", branchRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/windows", windowRouter);
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/analytics", analyticsRouter);



// websock(io);

const port = constants.port;
const host = constants.host;
server.listen(port, function () {
  console.log(`Example app listening on ${host}:${port}!`);
});
