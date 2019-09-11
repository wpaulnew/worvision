// Modules to control application life and create native browser window
const electron = require('electron');
const {app, BrowserWindow, ipcMain, WebContents} = require('electron');
const path = require('path');

require('./app/api');

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);

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

ipcMain.on('close-main-window', function () {
  app.quit();
});

ipcMain.on('show-remote-screen', function () {

});

ipcMain.on('change-text', (event, args) => {
  remoteWindow.webContents.send('get-new-text', args);
});