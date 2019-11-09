console.log('Welcome to the world!')

var message = document.getElementById('message');
var send = document.getElementById('send');
var response = document.getElementById('response');

var socket = io();
socket.on('message', function (data) {
  response.value = data;
})

send.addEventListener('mousedown', (e) => {
  socket.send(message.value);
});
