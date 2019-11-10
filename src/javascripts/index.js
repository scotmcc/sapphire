/* global $ */

import '../stylesheets/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/index.css';

import socket from '../components/web-socket.js';
import 'bootstrap';

const message = document.getElementById('message');
const send = document.getElementById('send');
const response = document.getElementById('response');

const status = {
  connection: 'connected'
};

$('#myAlert').on('closed.bs.alert', () => {
  console.log('alert closed');
});

socket.on('connect', () => {
  if (status.connection === 'disconnected') {
    window.location.replace(window.location.href);
  }
});

socket.on('disconnect', () => {
  status.connection = 'disconnected';
});

socket.on('message', message => {
  response.value = message;
});

send.addEventListener('mousedown', () => {
  socket.send(message.value);
});

console.log('foo');
