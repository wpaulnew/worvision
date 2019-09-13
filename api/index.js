const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.static(__dirname + '/view'));

app.get('/current', (req, res) => {

  fs.readFile(__dirname + '/view/current.txt', "utf8",
    (error, text) => {
      if (error) throw error; // если возникла ошибка
      res.json({text: text});
    });
});

app.get('/remote', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/remote.html'));
});

app.listen(3001, '0.0.0.0');