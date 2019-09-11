// Modules to control application life and create native browser window
const electron = require('electron');
const {app, BrowserWindow, ipcMain, webContents} = require('electron');
const path = require('path');
const fs = require('fs');

// Live reload
require('electron-reload')(__dirname);

// require('./app/api');

let mainWindow;
let remoteWindow;

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

  mainWindow.loadFile('./app/index.html');

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  // Create windows
  createWindow();

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
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});

// const mainProcessVars = {
//   somevar: "name",
//   anothervar: 33
// };

ipcMain.on('variable-request', function (event, arg) {
  fs.readFile(__dirname + '/app/api/modules/tracks.json', "utf8", (err, tracks) => {
    if (err) console.error(err);
    event.sender.send('variable-reply', JSON.parse(tracks));
  });
});

ipcMain.on('send-me-track', function (event, id) {
  fs.readFile(__dirname + '/app/api/modules/tracks.json', "utf8", (err, tracks) => {
    if (err) console.error(err);

    // Find track by id
    const track = JSON.parse(tracks).find((track) => track.id === parseInt(id));

    // Send founded track to renderer
    event.sender.send('send-me-track-reply', track);
  });
});

ipcMain.on('update-track-text', function (event, track) {
  fs.readFile(__dirname + '/app/api/modules/tracks.json', "utf8", (err, tracks) => {
    if (err) console.error(err);

    const parsedTracks = JSON.parse(tracks);

    //Find index of specific object using findIndex method.
    // console.log(track);
    let objIndex = JSON.parse(tracks).findIndex(t => t.id === track.selectedTrackId);

    //Log object to Console.
    console.log("Before update: ", [objIndex]);

    //Update object name property.
    parsedTracks[objIndex].text = track.text;

    //Log object to console again.
    console.log("After update: ", parsedTracks[objIndex]);
    console.log(parsedTracks);

    // console.log(tracks.concat(tracks, JSON.parse(tracks).find((track) => track.id === parseInt(track.id))));

    // const newTrackContainer = [...tracks, JSON.parse(tracks).find((track) => track.id === parseInt(track.id)).text = track.text];

    // console.log(newTrackContainer);

    fs.writeFile(__dirname + '/app/api/modules/tracks.json', JSON.stringify(parsedTracks), () => {
      event.sender.send('send-me-track-reply', true);
    });
  });
});