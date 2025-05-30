const { app, BrowserWindow } = require('electron');
const path = require('path');
const{createMainWindow}= require('./src/janelaPrincipal')
const { registrarListeners } = require('./src/appListener');

app.whenReady().then(function () {

    createMainWindow();
    registrarListeners()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });

}
);


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
