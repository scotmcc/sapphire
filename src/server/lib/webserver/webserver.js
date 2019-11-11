import { resolve } from 'path';
import { EventEmitter } from 'events';
import http from 'http';
import uuid from 'uuid/v1';
import socket from 'socket.io';
import express from 'express';
import internalIp from 'internal-ip';

import session from 'express-session';
import mongo from 'connect-mongo';

const MongoStore = mongo(session);

export const app = express();
export const server = http.createServer(app);
export const io = socket(server, { serveClient: false });

class WebServer extends EventEmitter {
  constructor(server) {
    super();
    Object.defineProperty(this, 'server', { value: server });
    Object.defineProperty(this, 'app', { value: app });
  }
  send(topic, body) {
    this.socket.send({ topic, body });
  }
  start() {
    app.use(
      session({
        secret: uuid(),
        resave: false,
        rolling: false,
        saveUninitialized: true,
        store: new MongoStore({
          mongooseConnection: this.server.mongoose.connection,
          ttl: 5 * 60
        })
      })
    );
    app.use((req, res, next) => {
      if (!req.session.id) {
        req.session.id = uuid();
      }
      return next();
    });

    app.use(express.static(resolve(process.env.PWD, 'public')));
    app.get('*', (req, res) => {
      res.sendFile(resolve(process.env.PWD, 'public', '404.html'));
    });

    io.on('connection', socket => {
      Object.defineProperty(this, 'socket', { value: socket, writable: true });
      socket.on('message', message => {
        this.emit(message.topic, message.body);
      });
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
