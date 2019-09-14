// Modules to control application life and create native browser window
const electron = require('electron');
const {app, BrowserWindow, ipcMain, webContents} = require('electron');
const fs = require('fs');
const ip = require('ip');

// Live reload
require('electron-reload')(__dirname);

require('./api');

let mainWindow;

// let remoteWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.maximize();

  mainWindow.loadFile(__dirname + '/app/index.html');

  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  // Create windows
  createWindow();

  // Get files
  ipcMain.on('files', function (event, args) {

    fs.readdir(__dirname + '/api/resources', (err, files) => {
      // event.sender.send('files', JSON.parse(files));

      event.sender.send('files', files);
    });
  });

  // Read file
  ipcMain.on('file', function (event, name) {

    if (name !== null) {
      fs.readFile(__dirname + '/api/resources/' + name + '.txt', "utf8",
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
          event.sender.send('file', formattedText);
        });
    }

  });

  // Write file
  ipcMain.on('write', function (event, text) {
    fs.writeFile(__dirname + '/api/view/current.txt', text, (error) => {
      if (error) throw error;
    });
  });

  // Send ip address
  ipcMain.on('ip-address', function (event, args) {
    event.sender.send('ip-address', ip.address());
  });

  /*
  // Create remote window
  let displays = electron.screen.getAllDisplays();
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  });

  if (externalDisplay) {
    remoteWindow = new BrowserWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
      fullscreen: true,
      webPreferences: {
        nodeIntegration: true
      }
    });

    remoteWindow.maximize();

    // and load the index.html of the app.
    remoteWindow.loadFile('./app/remote.html');
  }
  */
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});