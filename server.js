const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

let chatMessages = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("chatHistory", chatMessages);

  socket.on("message", (message) => {
    chatMessages.push(message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
