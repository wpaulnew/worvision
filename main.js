// Modules to control application life and create native browser window
const electron = require('electron');
const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const ip = require('ip');
const path = require('path');
const installExtension = require('electron-devtools-installer');

// Live reload
require('electron-reload')(__dirname);

// require('./api');

var mainWindow;
var remoteWindow;

// let remoteWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Install dev exs
  const options = {extraHeaders: "pragma: no-cache\n"};
  mainWindow.loadURL(`http://${ip.address()}:3001/`, options);
  installExtension.default(installExtension.REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  installExtension.default(installExtension.REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  mainWindow.webContents.openDevTools();

  mainWindow.maximize();

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
      fullscreen: false,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      }
    });

    // remoteWindow.maximize();

    remoteWindow.loadURL(`http://${ip.address()}:3001/screen`);

    remoteWindow.on('closed', function () {
      remoteWindow = null
    })

    // remoteWindow.webContents.openDevTools();
  }

});

app.once('ready-to-show', () => {
  mainWindow.show();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});

// Actions
ipcMain.on('editor', (event, args) => {
  console.log(args);
  mainWindow.webContents.send('editor', args);
});

// Add new song
ipcMain.on('add-new-song', (event, args) => {
  console.log('');

  let addSongWindow;

  addSongWindow = new BrowserWindow({
    width: 740,
    height: 560,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // mainWindow.webContents.send('editor', args);

  addSongWindow.loadURL(`http://${ip.address()}:3001/view`);

  addSongWindow.on('closed', function () {
    addSongWindow = null
  })
});