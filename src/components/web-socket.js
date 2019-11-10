import io from 'socket.io-client';

export const sock = io();
const handlers = {};

sock.on('message', message => {
  if (Object.prototype.hasOwnProperty.call(handlers, message.topic)) {
    handlers[message.topic].forEach(handler => handler(message.body));
  }
});

export const socket = {
  listen: (topic, callback) => {
    if (!Object.prototype.hasOwnProperty.call(handlers, topic)) {
      handlers[topic] = [];
    }
    return handlers[topic].push(callback) - 1;
  },
  send: (topic, body) => {
    sock.send({
      topic,
      body
    });
  }
};

export default socket;
