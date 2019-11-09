require('dotenv').config();

const path = require('path');
const express = require('express');
const internalIp = require('internal-ip');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.resolve(process.env.PWD, 'src')));

app.get('/', function(req, res){
  res.sendFile(path.resolve(process.env.PWD, 'src', 'html', 'index.html'));
});

io.on('connection', function(socket){
  socket.on('message', data => {
    socket.send(data)
  })
});

server.listen(process.env.PORT, async () => {
  console.log(`listening on http://${await internalIp.v4()}:${server.address().port}`);
});
