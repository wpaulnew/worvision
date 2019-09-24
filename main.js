// Modules to control application life and create native browser window
const electron = require('electron');
const {app, BrowserWindow, ipcMain, webContents} = require('electron');
const fs = require('fs');
const ip = require('ip');
const path = require('path');

// Live reload
require('electron-reload')(__dirname);

// require('./api');

let mainWindow;

// let remoteWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.maximize();

  // mainWindow.loadFile(__dirname + '/app/index.html');
  mainWindow.loadURL(`http://${ip.address()}:3001/`);

  // mainWindow.webContents.openDevTools();

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

    // remoteWindow.maximize();

    remoteWindow.loadURL(`http://${ip.address()}:3001/screen`);

    remoteWindow.webContents.openDevTools();
  }

});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});