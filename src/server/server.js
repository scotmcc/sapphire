import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import http from 'http';
import socket from 'socket.io';
import express from 'express';
import internalIp from 'internal-ip';

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.resolve(process.env.PWD, 'public')));

app.get('*', function(req, res){
  res.sendFile(path.resolve(process.env.PWD, 'public', '404.html'));
});

io.on('connection', function(socket){
  socket.on('message', data => {
    socket.send(data)
  })
});

server.listen(process.env.PORT, async () => {
  console.log(`listening on http://${await internalIp.v4()}:${server.address().port}`);
});
