const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.end('realtime colors app');
});

io.on('connection', socket => {
  console.log('--->Client connected');

  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
