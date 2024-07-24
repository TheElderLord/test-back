const express = require("express");
const cors = require("cors");



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
// const branchListRouter = require("./router/branchListRouter");
const boardRouter = require("./router/boardRouter");

const checkTokenMiddleware = require("./middleware/middleware");

// const websock = require("./websocket/webController");

const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRouter);

app.use("/images", express.static(path.join("images")));

// app.use(checkTokenMiddleware);
app.use("/api/v1/tickets",checkTokenMiddleware, router);
app.use("/api/v1/branches",checkTokenMiddleware, branchRouter);
app.use("/api/v1/users",checkTokenMiddleware, userRouter);
app.use("/api/v1/messages",checkTokenMiddleware, messageRouter);
app.use("/api/v1/employees",checkTokenMiddleware, employeeRouter);
app.use("/api/v1/services",checkTokenMiddleware, serviceRouter);
app.use("/api/v1/windows",checkTokenMiddleware, windowRouter);
app.use("/api/v1/roles",checkTokenMiddleware, roleRouter);
app.use("/api/v1/analytics",checkTokenMiddleware, analyticsRouter);
// app.use("/api/v1/branch-list",checkTokenMiddleware, branchListRouter);
app.use("/api/v1/board",checkTokenMiddleware, boardRouter);

module.exports = app;