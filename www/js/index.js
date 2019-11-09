console.log('Welcome to the world!')

var message = document.getElementById('message');
var send = document.getElementById('send');
var response = document.getElementById('response');

send.addEventListener('mousedown', (e) => {
  response.value = message.value;
});
