const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config');

app.use(express.static('static'));

io.on('connection', (socket) => {
    console.log("User connected", socket.id);
    socket.broadcast.emit('user_connected');
    socket.on('disconnect', () => {
        console.log("User disconnected");
        socket.broadcast.emit('user_disconnected');
    });
    socket.on('message', (message) => {
        console.log("Got message", message);
        io.emit('message', message);
    });
});

http.listen(config.port, () => {
    console.log(`listening on *:${config.port}`);
});