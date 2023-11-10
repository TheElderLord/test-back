const express = require('express');


const ticketRouter = require('./router/ticketRouter');
const branchRouter = require('./router/branchRouter');
const userRouter = require('./router/userRouter');
const employeeRouter = require('./router/employeeRouter');
const serviceRouter = require('./router/serviceRouter');
const windowRouter = require('./router/windowRouter');

const app = express();
app.use(express.json());

app.use('/api/v1/tickets', ticketRouter);
app.use('/api/v1/branches', branchRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/windows', windowRouter);



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
}); 


