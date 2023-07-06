import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import num from 'lodash';

const port = 4001;
const app = express();
const httpServer = http.createServer(app);
const server = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
  },
});

let timeChange;
let data = [
  { name: 1, x: num.random(0, 10), y: num.random(0, 10) },
  { name: 2, x: num.random(0, 10), y: num.random(0, 10) },
  { name: 3, x: num.random(0, 10), y: num.random(0, 10) },
  { name: 4, x: num.random(0, 10), y: num.random(0, 10) },
  { name: 5, x: num.random(0, 10), y: num.random(0, 10) },
];

const updateData = () => {
  if (data.length > 5) {
    data.shift();
  }
  const newData = {
    name: data[data.length - 1].name + 1,
    x: num.random(0, 10),
    y: num.random(0, 10),
    z: num.random(0, 10)
  };
  data.push(newData);
  server.emit('message', data);
};

server.on('connection', (socket) => {
  console.log('connected');
  if (timeChange) clearInterval(timeChange);

  timeChange = setInterval(updateData, 1000);

  socket.emit('message', data);
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
