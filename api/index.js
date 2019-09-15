const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

// Get ip address
const ip = require('ip');

const app = express();

//Web socket

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({server});

// Send data to all connected clients
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.text);
      }
    });
  });
});

// App

app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/build'));

const BUILD_DIR = path.join(__dirname, './build');
const HTML_FILE = path.join(BUILD_DIR, 'index.html');

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

// Send config
app.get('/config', (req, res) => {
  res.json({'ip': ip.address() + ':' + server.address().port});
});

// Send songs
app.get('/songs', (req, res) => {
  fs.readdir(__dirname + '/resources/songs', (err, songs) => {
    res.json({songs});
  });
});

// Send text song by name
app.get('/song', (req, res) => {

  const name = req.query.name;

  if (name) {
    fs.readFile(__dirname + '/resources/songs/' + name + '.txt', "utf8",
      function (error, data) {
        if (error) throw error; // если возникла ошибка

        const text = data.split("\n");
        // console.log(text);

        let formattedText = [];

        for (let i = 0; i < text.length; i++) {
          if (text[i] !== '') {
            // console.log('<p>' + text[i] + '</p>');
            // formattedText.push('<p>' + text[i] + '</p>')
            formattedText.push(text[i])
          }
        }

        // console.log(formattedText);
        res.json({text: formattedText});
      });
  }
});

// Get full list of songs
app.get('/songs', (req, res) => {
  fs.readdir(__dirname + '/resources', (err, songs) => {
    res.json({songs});
  });
});

// Get books of bible all
app.get('/books', (req, res) => {
  fs.readFile(__dirname + '/resources/bible/books.json', "utf8", (err, books) => {
    res.json(JSON.parse(books));
  });
});

// Get current text of song
app.get('/current', (req, res) => {
  fs.readFile(__dirname + '/view/current.txt', "utf8",
    (error, text) => {
      if (error) throw error; // если возникла ошибка
      res.json({text: text});
    });
});

// Page of view bible text
app.get('/screen', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/screen.html'));
});

// Page of view text
app.get('/remote', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/remote.html'));
});

//start our server
server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});