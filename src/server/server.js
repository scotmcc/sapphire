import dotenv from 'dotenv';
dotenv.config();

import Database from './lib/database/database.js';
import WebServer from './lib/webserver/webserver.js';

const server = {
  webserver: new WebServer(this),
  database: new Database(this)
};

server.webserver.on('started', ws => {
  console.log(`WebServer started on ${ws.address}:${ws.port}`);
});

server.database.on('started', db => {
  console.log(`Database connected to ${db.connection.db.databaseName}`);
});

server.webserver.on('echo', body => {
  server.webserver.send('echo', body);
});

server.webserver.start();
server.database.start();
