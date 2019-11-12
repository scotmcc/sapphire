/* globals $ */

import '../stylesheets/login.css';

$('#signin').on('submit', function(event) {
  event.preventDefault();
  console.log($(this).serialize());
  $.post('/login', function(data) {
    console.log(data);
  });
  console.log('after');
});
