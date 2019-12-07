// Modules to control application life and create native browser window
const electron = require('electron');
const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const ip = require('ip');
const path = require('path');
const installExtension = require('electron-devtools-installer');

// Live reload
// require('electron-reload')(__dirname);

// require('./api');

var mainWindow;
var remoteWindow;
var addSongWindow;
var editSongWindow;
var editorWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 720,
    show: true,
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
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    });

    // remoteWindow.maximize();

    remoteWindow.loadURL(`http://${ip.address()}:3001/add`);

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
// ipcMain.on('editor', (event, args) => {
//   console.log(args);
//   mainWindow.webContents.send('editor', args);
// });

// Add new song
ipcMain.on('add-new-song', (event, args) => {

  addSongWindow = new BrowserWindow({
    width: 740,
    height: 560,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // mainWindow.webContents.send('editor', args);

  addSongWindow.loadURL(`http://${ip.address()}:3001/add`);

  addSongWindow.on('closed', function () {
    addSongWindow = null
  });
});

// Edit song
ipcMain.on('edit-song', (event, args) => {

  editSongWindow = new BrowserWindow({
    width: 740,
    height: 560,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // mainWindow.webContents.send('editor', args);

  editSongWindow.loadURL(`http://${ip.address()}:3001/edit`);

  // editSongWindow.webContents.openDevTools();

  editSongWindow.on('closed', function () {
    editSongWindow = null
  });

  editSongWindow.once('ready-to-show', () => {
    editSongWindow.show();
    editSongWindow.webContents.send('edit-song', args);
  });
});

// Editor
ipcMain.on('editor', (event, args) => {

  editorWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // mainWindow.webContents.send('editor', args);

  editorWindow.loadURL(`http://${ip.address()}:3001/editor`);

  // editSongWindow.webContents.openDevTools();

  editorWindow.on('closed', function () {
    editorWindow = null
  });

  editorWindow.once('ready-to-show', () => {
    editorWindow.show();
  });
});

// Close add window
ipcMain.on('close-add-window', (event, args) => {
  addSongWindow.close();
});

// Close edit window
ipcMain.on('close-edit-window', (event, args) => {
  editSongWindow.close();
});

// Close editor window
ipcMain.on('close-editor-window', (event, args) => {
  editorWindow.close();
});