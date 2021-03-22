const express = require('express');
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("New Connection...", socket.id);

    socket.on("message", (msg) => {
        console.log("Message:", msg);
        socket.emit("message", msg);
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, error => {
    if (!error) {
        console.log(`App running on port: ${port}`);
    }
});