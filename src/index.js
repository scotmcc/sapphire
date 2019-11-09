import socket from './components/web-socket.js';
import './stylesheets/index.css';

const message = document.getElementById('message');
const send = document.getElementById('send');
const response = document.getElementById('response');

socket.on('message', data => {
  response.value = data;
});

send.addEventListener('mousedown', e => {
  socket.send(message.value);
});
