const express = require('express');
const cors = require('cors');

// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

const constants = require('./constants/constant');
const { router,wss } = require('./router/ticketRouter');
const branchRouter = require('./router/branchRouter');
const userRouter = require('./router/userRouter');
const employeeRouter = require('./router/employeeRouter');
const serviceRouter = require('./router/serviceRouter');
const windowRouter = require('./router/windowRouter');
const roleRouter = require('./router/roleRouter');



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/tickets', router);
app.use('/api/v1/branches', branchRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/windows', windowRouter);
app.use('/api/v1/roles', roleRouter);

const port = constants.port;
const host = constants.host;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
}); 


