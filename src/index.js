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
const messageRouter = require("./router/messageRouter");
const branchListRouter = require("./router/branchListRouter");
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
app.use("/api/v1/branch-list",checkTokenMiddleware, branchListRouter);
app.use("/api/v1/board",checkTokenMiddleware, boardRouter);

app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const createUser = require("./controller/users/createUser");
const truncation = require("./db/truncation");

// (async () => {
//   // Inside this IIFE, you can use await
//   await createUser("admin");

// })();

// websock(io);

function startMainAtCustomTime() {
  const restartTime = process.env.RESTART_TIME || "09:00"; // Default restart time is 09:00
  const [hours, minutes] = restartTime.split(":").map(Number);
  const now = new Date();
  let restartDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    0
  );
  if (restartDate <= now) {
    restartDate.setDate(restartDate.getDate() + 1); // If restart time has already passed for today, schedule it for tomorrow
  }
  const millisecondsUntilRestart = restartDate - now;
  setTimeout(async () => {
    await truncation();
    setInterval(truncation, 24 * 60 * 60 * 1000);
  }, millisecondsUntilRestart);
}

startMainAtCustomTime();

// const port = constants.port;
// const host = constants.host;
// server.listen(port, function () {
//   console.log(`Example app listening on ${host}:${port}!`);
// });
module.exports = app;