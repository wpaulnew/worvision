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
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb',
})); // support encoded bodies

//Set Request Size Limit;

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

const database = 'database.sqlite'; // имя баззы данных

/*

books/ -- список всех книги
books/:book_id -- информация по книге
books/:book_id/:chapter_id -- информация по книге
books/:book_id/:chapter_id/:verse_id -- информация по книге

"book_id": 1,
"book_name": "Бытие",
"book_active": 0,
"book_chapters": {
  0: {

  }
}

*/

// Получам все книги
app.get('/books', (request, response) => {
  const db = new sqlite3.Database(__dirname + '/resources/' + database, sqlite3.OPEN_READWRITE, (error) => {

    if (error) {
      console.error(error);
    } else {
      db.serialize(function () {

        const sql = `
        SELECT * 
        FROM books
        `;

        db.all(sql, function (error, rows) {
          if (error) {
            console.error(error)
          } else {
            response.json(rows);
          }
        });
      });
      db.close();
    }

  });
});

// Получить список стихов главы
app.get('/verses/:book_id/:chapter_id', (request, response) => {

  const book_id = request.params.book_id;
  const chapter_id = request.params.chapter_id;

  const db = new sqlite3.Database(__dirname + '/resources/' + database, sqlite3.OPEN_READWRITE, (error) => {

    if (error) {
      console.error(error.message);
    } else {
      db.serialize(function () {

        const sql = `
        SELECT *
        FROM verses
        WHERE book_id = ${book_id} AND chapter_id = ${chapter_id}
      `;

        db.all(sql, function (error, rows) {
          if (error) {
            console.error(error)
          } else {
            response.json(rows);
          }
        });

      });

      db.close();
    }

  });
});

// Получить текущий стих
app.get('/verses/active', (request, response) => {

  const db = new sqlite3.Database(__dirname + '/resources/' + database, sqlite3.OPEN_READWRITE, (error) => {

    if (error) {
      console.error(error.message);
    } else {
      db.serialize(function () {

        const sql = `
        SELECT *
        FROM verses
        WHERE verse_active = 1
        LIMIT 1
      `;

        db.all(sql, function (error, rows) {
          if (error) {
            console.error(error)
          } else {
            response.json(rows);
          }
        });

      });

      db.close();
    }

  });
});

// Сделать этит стих активным, поставить 1
app.put('/verses/:book_id/:chapter_id/:verse_id', (request, response) => {

  const book_id = request.params.book_id;
  const chapter_id = request.params.chapter_id;
  const verse_id = request.params.verse_id;

  const db = new sqlite3.Database(__dirname + '/resources/' + database, sqlite3.OPEN_READWRITE, (error) => {

    if (error) {
      console.error(error.message);
    } else {
      db.serialize(function () {

        const sql = `
        SELECT *
        FROM verses
        WHERE book_id = ${book_id} AND chapter_id = ${chapter_id} AND verse_id = ${verse_id}
      `;

        db.all(sql, function (error, rows) {
          if (error) {
            console.error(error)
          } else {
            response.json(rows);
          }
        });

      });

      db.close();
    }

  });
});

// Получить текущий стих
app.get('/tabs/active', (request, response) => {

  const db = new sqlite3.Database(__dirname + '/resources/' + database, sqlite3.OPEN_READWRITE, (error) => {

    if (error) {
      console.error(error.message);
    } else {
      db.serialize(function () {

        const sql = `
        SELECT *
        FROM verses
        WHERE verse_active = 1
        LIMIT 1
      `;

        db.all(sql, function (error, rows) {
          if (error) {
            console.error(error)
          } else {
            response.json(rows);
          }
        });

      });

      db.close();
    }

  });
});

// Получить данные для запуска
// Получить текущий стих
app.get('/api/connect', (request, response) => {

  const db = new sqlite3.Database(__dirname + '/resources/' + database, sqlite3.OPEN_READWRITE, (error) => {

    if (error) {
      console.error(error.message);
    } else {

      const bible = {
        books: {}
      };

      // Получить список книг
      db.serialize(function () {

        const sql = `
        SELECT * 
        FROM books
        `;

        db.all(sql, function (error, books) {
          if (error) {
            console.error(error)
          } else {

            for (let i = 0; i < books.length; i++) {
              bible.books[`${books[i].book_id}`] = {
                id: books[i].book_id,
                name: books[i].book_name,
                active: !!books[i].book_active,
                chapters: {}
              };

              if (books[i].book_active) {
                // bible.books[`${books[i].book_name}`].chapters

                db.serialize(function () {
                  const verses = `
                  SELECT * FROM verses WHERE verses.book_id = ${books[i].book_id} AND verses.chapter_id = ${books[i].book_active_chapter}
                  `;

                  db.all(verses, function (error, verses) {
                    if (error) {
                      console.error(error)
                    } else {
                      for (let j = 0; j < books[i].book_count_chapters; j++) {
                        bible.books[`${books[i].book_id}`].chapters[`${j+1}`] = {
                          id: j,
                          active: books[i].book_active_chapter === j + 1,
                          verses: {}
                        };

                        if (books[i].book_active_chapter === j + 1) {
                          for (let l = 0; l < verses.length; l++) {
                            bible.books[`${books[i].book_id}`].chapters[`${j+1}`].verses[`${verses[l].verse_id}`] = {
                              id: verses[l].verse_id,
                              active: !!verses[l].verse_active,
                              text: verses[l].verse_text
                            }
                          }
                        }
                      }
                      response.json(bible.books);
                    }
                  })
                })
              }
            }
          }
        });
      })
    }
  });
});
// db.close();

// db.serialize(function () {
//   const sql = `
//   SELECT book_id, chapter_id, verse_id
//   FROM verses
//   WHERE verse_active = 1
//   LIMIT 1
// `;
//
//   db.all(sql, function (error, rows) {
//     if (error) {
//       console.error(error)
//     } else {
//
//       console.log(rows);
//
//       // const book_id = rows.book_id;
//       const chapter_id = rows.chapter_id;
//       const verse_id = rows.verse_id;
//
//       response.json(rows);
//     }
//   });
//
// });
//
// db.close();

// verse -- текущий выбраный стих получть

// для обновление позиции текущего стиха UPDATE verses SET verse_active = 1 WHERE book_id = 43 AND chapter_id = 3 AND verse_id = 16

// App

// Получам одну книгу по id
// app.get('/books/:book_id', (request, response) => {
//
//   const book_id = request.params.book_id;
//
//   const db = new sqlite3.Database(__dirname + '/resources/' + database, sqlite3.OPEN_READWRITE, (error) => {
//
//     if (error) {
//       console.error(error);
//     } else {
//       db.serialize(function () {
//
//         const sql = `
//         SELECT *
//         FROM books
//         WHERE book_id = ${book_id}
//         `;
//
//         db.all(sql, function (error, rows) {
//           if (error) {
//             console.error(error)
//           } else {
//             response.json(rows);
//           }
//         });
//       });
//
//       db.close();
//     }
//
//   });
// });

// app.use("/", express.static(__dirname + '/view'));
// app.use(express.static(path.join(__dirname, './view')));
app.use(express.static(path.join(__dirname, './build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, './build'), 'index.html'));
});

//start our server
server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});

console.log('md5:', md5('md5'));

console.log(os.networkInterfaces().wlo1[0].address);