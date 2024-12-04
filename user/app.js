const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const db = require('./config/mongoose-connection')
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const userRouter = require('./routes/userRouter');


app.get("/",userRouter);

server.listen(3001, () => {
  console.log("user-service is running on port 3001");
});
