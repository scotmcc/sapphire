/* global $ */

import { sock, socket } from './client/lib/web-socket.js';

const status = {
  socket: { connected: true }
};

sock.on('connect', () => {
  if (!status.socket.connected) {
    window.location.replace(window.location.href);
  }
});

sock.on('disconnect', () => {
  status.socket.connected = false;
});

export const _ = {
  socket,
  status
};

$(document).ready(function() {
  console.log('ready!');
});

window._ = _;

export default _;
