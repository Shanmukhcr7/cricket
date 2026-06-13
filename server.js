const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
    res.send("CR7 Sports Viewer Counter Running");
});

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const viewers = new Set();

io.on("connection", (socket) => {

    viewers.add(socket.id);

    io.emit("viewerCount", viewers.size);

    socket.on("disconnect", () => {

        viewers.delete(socket.id);

        io.emit("viewerCount", viewers.size);

    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});