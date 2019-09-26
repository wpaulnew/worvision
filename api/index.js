const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');
const fs = require('fs');
const os = require('os');
const app = express();

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
    db.serialize(function () {
      let songs = [];
      db.all('SELECT * FROM tracks', function (err, rows) {
        console.log('Received tracks');
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
            // console.log('Track text is empty');
          }

          if (track.text.length !== 0) {
            // console.log('Track text is not empty');

            function clear(arr, value) {

              return arr.filter(function (ele) {
                return ele !== value;
              });

            }

            track.text = clear(track.text.split("\n"), '');
          }

          console.log('Received data of the selected track');
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
          console.log('New track has been added');
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
        console.log('Track data has been changed');
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
    db.serialize(function () {
      db.all('SELECT * FROM books', function (err, rows) {
        console.log('Received books');
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
  // console.log(book_number);

  // SELECT chapter FROM verses WHERE book_number = 10 GROUP BY chapter
  const db = new sqlite3.Database(__dirname + '/resources/bible.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }

    db.serialize(function () {
      // Change chapter on name, because Dropdownmenu work it
      db.all(`SELECT chapter AS name FROM verses WHERE book_number = ${book_number} GROUP BY chapter`, function (err, rows) {
        console.log(`Chapters of book ${book_number} received`);
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

    db.serialize(function () {
      db.all(`SELECT verse, text FROM verses WHERE book_number = ${book_number} AND chapter = ${chapter}`, function (err, rows) {
        console.log(`Verses of book ${book_number} and chapter ${chapter} received`);
        res.json(rows);
      });

    });

    db.close();
  });
});

// Получить инфорацию о песне по id
app.get('/current', (request, response) => {

  const db = new sqlite3.Database(__dirname + '/resources/config.db', sqlite3.OPEN_READWRITE, (err) => {

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
          console.log('Received current save for display');
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

  const db = new sqlite3.Database(__dirname + '/resources/config.db', sqlite3.OPEN_READWRITE, (err) => {
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
        console.log('Updated current save to display');
        res.json({success: true});
      });
    });

    db.close();
  });
});

// Получить избранные песни
app.get('/favorites', (req, res) => {
  const db = new sqlite3.Database(__dirname + '/resources/songs.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    db.serialize(function () {
      let songs = [];
      db.all('SELECT * FROM tracks WHERE tracks.favorite = 1 AND tracks.active = 1 ', function (err, rows) {
        console.log('Received favorites tracks');
        res.json(rows);
      });

    });

    db.close();
  });
});

// Добавить в избранное или удалить
app.put('/favorites', (req, res) => {

  const id = req.body.id;
  const favorite = req.body.favorite;

  const db = new sqlite3.Database(__dirname + '/resources/songs.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    db.serialize(function () {
      //Perform UPDATE operation
      db.run(`UPDATE tracks SET favorite = $favorite WHERE id = $id`, {
        $id: id,
        $favorite: favorite,
      }, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Track has been ' + (favorite ? 'added to' : 'remove from') + 'favorites');
        res.json({success: true});
      });
    });

    db.close();
  });
});

// Получить настройки отображения
app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/config.json'));
});

// Обновить настройки отображения
app.put('/view', (req, res) => {

  const config = {
    x: req.body.x,
    y: req.body.y,
    width: req.body.width,
    height: req.body.height
  };

  fs.writeFile(__dirname + '/view/config.json', JSON.stringify({config: config}), function (error) {

    // if(error) throw error; // если возникла ошибка
    console.log("Настройки отображения обновленны");
    let data = fs.readFileSync(__dirname + '/view/config.json', "utf8");
    res.json(data);

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
  res.json({'ip': os.networkInterfaces().wlo1[0].address + ':' + server.address().port});
});

// Page of view text
app.get('/remote', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/remote.html'));
});

// Page of view bible text
app.get('/screen', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/screen.html'));
});

// Получить отображение
app.get('/viewx', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/view.html'));
});

//start our server
server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});

console.log('md5:', md5('md5'));

console.log(os.networkInterfaces().wlo1[0].address);