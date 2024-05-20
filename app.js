const http = require("http");
const express = require("express");
const path = require("path")

const constants = require("./src/constants/constant");
const app = require("./src/index");


const port = constants.port;
const host = constants.host;



const server = http.createServer(app);

// Corrected: Function declaration moved above its usage
 // Corrected: Calling the function after it's declared

app.listen(port, function () {
  console.log(`Example app listening on ${host}:${port}!`);
});
