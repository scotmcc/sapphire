require('dotenv').config();

const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('www'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/www/index.html');
});

io.on('connection', function(socket){
  socket.on('message', data => {
    socket.send(data)
  })
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
