const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.end('realtime colors app');
});

const votes = {
  malatya: 0,
  istanbul: 0,
  izmir: 0,
  ankara: 0,
};

io.on('connection', socket => {
  console.log('------->Client connected');

  socket.emit('new-vote', votes);

  socket.on('new-vote', vote => {
    console.log('New Vote:', vote);
    votes[vote] += 1;
    io.emit('new-vote', votes);
  });

  socket.on('disconnect', () => console.log('------>Client disconnected'));
});

server.listen(process.env.PORT || 4444, () => {
  console.log('listening on *:4444');
});
