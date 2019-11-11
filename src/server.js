import dotenv from 'dotenv';
dotenv.config();

import Database from './server/lib/database/database.js';
import WebServer from './server/lib/webserver/webserver.js';

const server = {};

server.webserver = new WebServer(server);
server.database = new Database(server);

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
