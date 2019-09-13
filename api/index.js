const express = require('express');
const path = require('path')
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/remote'));

app.get('/remote', (req, res) => {
  // res.send('Api is here!');
  res.sendFile(path.join(__dirname + '/remote/index.html'));
});


app.listen(port, '0.0.0.0');

console.log('Running at Port: ' + port);