/* global $ _ */

import '../stylesheets/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/index.css';
import 'bootstrap';

const message = $('#message');
const send = $('#send');
const response = $('#response');

_.socket.listen('echo', body => {
  response.val(body);
});

send.click(() => {
  _.socket.send('echo', message.val());
});

$('#myAlert').on('closed.bs.alert', () => {
  console.log('alert closed');
});
