require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('www'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './www/404.html'));
});

app.listen(process.env.PORT, () => {
  console.log('Application listening on: ' + process.env.PORT);
})
