/* global */

import 'webpack-icons-installer';
import './client/stylesheets/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

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

window._ = _;

export default _;
