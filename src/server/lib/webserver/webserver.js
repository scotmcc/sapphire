import { resolve } from 'path';
import { EventEmitter } from 'events';
import http from 'http';
import socket from 'socket.io';
import express from 'express';
import internalIp from 'internal-ip';

export const app = express();
export const server = http.createServer(app);
export const io = socket(server, { serveClient: false });

class WebServer extends EventEmitter {
  constructor(server) {
    super();
    Object.defineProperty(this, 'server', { value: server });
  }
  send(topic, body) {
    this.socket.send({ topic, body });
  }
  start() {
    io.on('connection', socket => {
      Object.defineProperty(this, 'socket', { value: socket, writable: true });
      socket.on('message', message => {
        this.emit(message.topic, message.body);
      });
    });
    app.use(express.static(resolve(process.env.PWD, 'public')));
    app.get('*', (req, res) => {
      res.sendFile(resolve(process.env.PWD, 'public', '404.html'));
    });
    server.listen(process.env.PORT, async () => {
      Object.defineProperty(this, 'address', { value: await internalIp.v4() });
      Object.defineProperty(this, 'port', { value: server.address().port });
      this.emit('started', this);
    });
  }
}

export default function(server) {
  return new WebServer(server);
}
