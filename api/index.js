const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.static(__dirname + '/view'));

app.get('/remote', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/remote.html'));
});

app.listen(3001, '0.0.0.0');