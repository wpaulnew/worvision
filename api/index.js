const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

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
  ws.on('message', function incoming(response) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        // console.log('FROM API', response);
        client.send(response);
      }
    });
  });
});

// Database

// Получить все песни
app.get('/tracks', (req, res) => {
  const db = new sqlite3.Database(__dirname + '/resources/songs.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Select all songs');
    db.serialize(function () {
      let songs = [];
      db.all('SELECT * FROM tracks', function (err, rows) {
        // console.log(rows);
        res.json(rows);
      });

    });

    db.close();
  });
});

// Получить инфорацию о песне по id
app.get('/tracks/:id', (request, response) => {

  const id = request.params.id;

  const db = new sqlite3.Database(__dirname + '/resources/songs.db', sqlite3.OPEN_READWRITE, (err) => {

    if (err) {
      console.error(err.message);
    }

    db.serialize(function () {
      db.all(`SELECT * FROM tracks WHERE id = '${id}'`, function (err, rows) {

          if (err) {
            response.json(
              {
                success: false,
                message: 'ERROR: GET DATA BY ID FROM DB',
              }
            );
          }

          const track = {
            id: rows[0].id,
            name: rows[0].name,
            text: rows[0].text
          };

          if (track.text.length === 0) {
            console.log('Track text is empty');
          }

          if (track.text.length !== 0) {
            console.log('Track text is not empty');

            function clear(arr, value) {

              return arr.filter(function (ele) {
                return ele !== value;
              });

            }

            track.text = clear(track.text.split("\n"), '');
          }

          response.json({track});
        }
      );
    });

    db.close();
  });

});

// Добавить новую песню в базу данных
app.post('/track', function (req, res) {

  const id = md5(req.body.name);
  const name = req.body.name;
  const text = req.body.text;

  const db = new sqlite3.Database(__dirname + '/resources/songs.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Select all songs');

    db.serialize(function () {
      //Perform UPDATE operation
      db.run(`INSERT INTO tracks (id, name, text) VALUES ($id, $name, $text)`, {
        $id: id,
        $name: name,
        $text: text
      }, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Song was added!');
          res.json({success: true});
        }
      });
    });

    db.close();
  });
});

// Обновить данные о песни
app.put('/track', function (req, res) {

  const id = req.body.id;
  const name = req.body.name;
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
      db.run(`UPDATE tracks SET name = $name, text = $text WHERE id = $id`, {
        $id: id,
        $name: name,
        $text: text
      }, (err) => {
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

// Получить инфорацию о песне по id
app.get('/current', (request, response) => {

  const db = new sqlite3.Database(__dirname + '/resources/songs.db', sqlite3.OPEN_READWRITE, (err) => {

    if (err) {
      console.error(err.message);
    }

    db.serialize(function () {
      db.all("SELECT * FROM current", function (err, rows) {

          if (err) {
            response.json(
              {
                success: false,
                message: 'ERROR: SELECT * FROM current',
              }
            );
          }
          // console.log(rows);
          response.json({
            data: rows[0].data
          });
        }
      );
    });

    db.close();
  });

});

// Обновить текущие выбраные тексты песни или библии
app.put('/current', function (req, res) {

  const data = req.body.data;
  // console.log(data);

  const db = new sqlite3.Database(__dirname + '/resources/songs.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }

    db.serialize(function () {
      //Perform UPDATE operation
      db.run(`UPDATE current SET data = $data`, {
        $data: data,
      }, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Current data was update');
        res.json({success: true});
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

console.log('md5:', md5('md5'));