import './stylesheets/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/index.css';

import socket from './components/web-socket.js';
import 'bootstrap';

const message = document.getElementById('message');
const send = document.getElementById('send');
const response = document.getElementById('response');

$('#myAlert').on('closed.bs.alert', function() {
  console.log('alert closed');
});

socket.on('message', data => {
  response.value = data;
});

send.addEventListener('mousedown', e => {
  socket.send(message.value);
});
