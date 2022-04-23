'use strict';

const config = require('./config.json');

const electron = require('electron');
const { app } = electron;
const { protocol } = electron;
const { ipcMain } = electron;
const { dialog } = electron;
const { shell } = electron;
const { webContents } = electron;
const { contextBridge } = electron;

const BrowserWindow = electron.BrowserWindow;

const mime = require('mime');
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');

var mainWindow = null;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: (config.mode == "debug") ? 700 : 350,
        height: 380,
        resizable: false,
        frame: true,
        maximizable: false,
        minHeight: 380,
        minWidth: (config.mode == "debug") ? 700 : 350,
        maxHeight: 380,
        maxWidth: (config.mode == "debug") ? 700 : 350,
        fullscreenable: false,
        autoHideMenuBar: true,

        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        }

    });

    if (config.mode == "debug") {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.setMenu(null);
    mainWindow.setTitle('Spinny') // Window name isn't this
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'html',
        slashes: true
    }))

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}

app.on('ready', () => {

    protocol.registerBufferProtocol('html', function(request, callback) {
        let pathName = (new URL(request.url).pathname).substring(os.platform() == 'win32' ? 1 : 0);
        let extension = path.extname(pathName);

        if (extension == "") {
            extension = ".js";
            pathName += extension;
        }

        return callback({ data: fs.readFileSync(path.normalize(pathName)), mimeType: mime.getType(extension) });

    });

    createWindow();

});