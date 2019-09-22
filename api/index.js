const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Get ip address
const ip = require('ip');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

//Web socket

const server = http.createServer(app); //initialize a simple http server
const wss = new WebSocket.Server({server}); //initialize the WebSocket server instance

// Send data to all connected clients
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        // console.log('FROM API', data);
        client.send(data);
      }
    });
  });
});

// Database

// Get songs from database
app.get('/songs', (req, res) => {
  const db = new sqlite3.Database(__dirname + '/resources/songs.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Select all songs');
    db.serialize(function () {
      let songs = [];
      db.all('SELECT * FROM songs', function (err, rows) {
        // console.log(rows);
        res.json(rows);
      });

    });

    db.close();
  });
});

// Send text of song by id
app.get('/song', (req, res) => {

  const id = req.query.id;

  if (id) {
    const db = new sqlite3.Database(__dirname + '/resources/songs.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Select song by id: ' + id);
      db.serialize(function () {
        db.all(`SELECT text FROM songs WHERE id = ${id}`, function (err, row) {
            if (err) console.error(err);

            const text = row.split("\n");
            // console.log(text);

            let formattedText = [];

            for (let i = 0; i < text.length; i++) {
              if (text[i] !== '') {
                // console.log('<p>' + text[i] + '</p>');
                // formattedText.push('<p>' + text[i] + '</p>')
                formattedText.push(text[i]);
                for (let i = 0; i < text.length; i++) {
                  if (text[i] !== '') {
                    // console.log('<p>' + text[i] + '</p>');
                    // formattedText.push('<p>' + text[i] + '</p>')
                    formattedText.push(text[i])
                  }
                }
              }

              console.log(formattedText);
              res.json({text: formattedText});
            }
          }
        );
      });

      db.close();
    });
  }
});

// Save edited text to Database
app.post('/text', function (req, res) {
  const id = req.body.id;
  const text = req.body.text;

  const db = new sqlite3.Database(__dirname + '/resources/songs.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Select all songs');

    // const DATA = [id, text];
    // const SQL = "UPDATE songs SET text = :text WHERE id = :id";

    db.serialize(function () {
      //Perform UPDATE operation
      db.run(`UPDATE songs SET text = $text WHERE id = $id`, {$id: id, $text: text}, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Updated!');
        res.json({success: true});
      });
    });

    db.close();
  });
});

// Add new song to Database
app.post('/add', function (req, res) {
  const name = req.body.name;
  const text = req.body.text;
  // res.json({name: name, text: text});

  const db = new sqlite3.Database(__dirname + '/resources/songs.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Select all songs');

    // const DATA = [id, text];
    // const SQL = "UPDATE songs SET text = :text WHERE id = :id";

    db.serialize(function () {
      //Perform UPDATE operation
      db.run(`INSERT INTO songs (name, text) VALUES ($name, $text)`, {$name: name, $text: text}, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Song was added!');
        res.json({success: true});
      });
    });

    db.close();
  });
});

// Get books of bible all
app.get('/books', (req, res) => {
  const db = new sqlite3.Database(__dirname + '/resources/bible.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Select all bible books from database');
    db.serialize(function () {
      db.all('SELECT * FROM books', function (err, rows) {
        // console.log(rows);
        res.json(rows);
      });

    });

    db.close();
  });
});

// /chapters?book=:id
// Get count of chapters of chosen book
app.get('/chapters', (req, res) => {

  const book_number = req.query.book;
  console.log(book_number);

  // SELECT chapter FROM verses WHERE book_number = 10 GROUP BY chapter
  const db = new sqlite3.Database(__dirname + '/resources/bible.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Select chapter from book_number: ', book_number);
    db.serialize(function () {
      // Change chapter on name, because Dropdownmenu work it
      db.all(`SELECT chapter AS name FROM verses WHERE book_number = ${book_number} GROUP BY chapter`, function (err, rows) {
        // console.log(rows);
        res.json(rows);
      });

    });

    db.close();
  });
});

// /chapters?book=:id&chapter=:id
// Get verses of chosen chapter
app.get('/verses', (req, res) => {

  const book_number = req.query.book;
  const chapter = req.query.chapter;

  // SELECT chapter FROM verses WHERE book_number = 10 GROUP BY chapter
  const db = new sqlite3.Database(__dirname + '/resources/bible.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Select verses: ', book_number, chapter);
    db.serialize(function () {
      db.all(`SELECT verse, text FROM verses WHERE book_number = ${book_number} AND chapter = ${chapter}`, function (err, rows) {
        // console.log(rows);
        res.json(rows);
      });

    });

    db.close();
  });
});

// App

app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, './build'), 'index.html'));
});

// Send config
app.get('/config', (req, res) => {
  res.json({'ip': ip.address() + ':' + server.address().port});
});

// Page of view text
app.get('/remote', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/remote.html'));
});

// Page of view bible text
app.get('/screen', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/screen.html'));
});

//start our server
server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});