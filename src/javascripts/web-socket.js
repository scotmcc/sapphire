const message = document.getElementById('message');
const send = document.getElementById('send');
const response = document.getElementById('response');

const socket = io();
socket.on('message', (data) => {
  response.value = data;
})

send.addEventListener('mousedown', (e) => {
  socket.send(message.value);
});

console.log('Welcome to the world!')
