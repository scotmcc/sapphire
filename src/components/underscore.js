/* global */

import { sock, socket } from './web-socket.js';

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

window._ = _;

export default _;
