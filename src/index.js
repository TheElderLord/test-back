const express = require("express");
const cors = require("cors");
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const history = require('connect-history-api-fallback');

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

const options = {
  key: fs.readFileSync(path.join(__dirname, "../public/keys/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "../public/keys/server.crt")),
};

const app = express();

const server = http.createServer(app);
const httpsServer = https.createServer(options, app);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
// app.use(express.static("dist"));
app.use('/images', express.static("images"));

// API routes
app.use("/api/v1/auth", authRouter);
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

// Token middleware


// History API Fallback for SPA
// app.use(history({
//   rewrites: [
//     { from: /^\/api\/.*$/, to: function(context) { return context.parsedUrl.pathname; } }
//   ]
// }));

// // Handle SPA fallback after static and API routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist', 'index.html'));
// });

const port = constants.port;
const host = constants.host;
const httpsPort = constants.httpsPort;

httpsServer.listen(httpsPort, function () {
  console.log(`Https server is running on ${host}:${httpsPort}`);
});
server.listen(port, function () {
  console.log(`Example app listening on ${host}:${port}!`);
});
