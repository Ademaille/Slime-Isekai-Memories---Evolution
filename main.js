const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');

// Initialisation du stockage de fichier JSON local
const store = new Store();

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    title: "Suivi des Personnages",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile('index.html');
}

// Gestionnaires IPC pour lire et écrire dans le fichier JSON
ipcMain.handle('get-data', () => {
  return store.get('charactersData', []); // Retourne les données ou un tableau vide
});

ipcMain.handle('save-data', (event, data) => {
  store.set('charactersData', data);
  return true;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});