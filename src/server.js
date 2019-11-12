import path from 'path';
import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';

import Database from './server/lib/database/database.js';
import WebServer from './server/lib/webserver/webserver.js';

import aboutRouter from './server/controllers/about.js';
import forumsRouter from './server/controllers/forums.js';
import gamesRouter from './server/controllers/games.js';
import groupsRouter from './server/controllers/groups.js';
import indexRouter from './server/controllers/index.js';
import loginRouter from './server/controllers/login.js';
import newsRouter from './server/controllers/news.js';

const server = {};
const accessLogStream = fs.createWriteStream(path.join(process.env.PWD, 'access.log'), {
  flags: 'a'
});

server.webserver = new WebServer(server);
server.database = new Database(server);

server.webserver.app.use('/about', aboutRouter);
server.webserver.app.use('/forums', forumsRouter);
server.webserver.app.use('/games', gamesRouter);
server.webserver.app.use('/groups', groupsRouter);
server.webserver.app.use('/home', indexRouter);
server.webserver.app.use('/home', loginRouter);
server.webserver.app.use('/news', newsRouter);

server.webserver.app.use(morgan('tiny', { stream: accessLogStream }));

server.webserver.on('started', ws => {
  console.log(`WebServer internally on http://localhost:${ws.port}`);
  console.log(`WebServer externally on http://${ws.address}:${ws.port}`);
});

server.database.on('started', db => {
  console.log(`Database connected to ${db.connection.db.databaseName}`);
});

server.webserver.on('echo', body => {
  server.webserver.send('echo', body);
});

server.webserver.start();
server.database.start();
