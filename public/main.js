const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
require("@electron/remote/main").initialize();

function createWindow() {
  const win = new BrowserWindow({
    icon: "../public/icon.png",
    width: 350,
    height: 439,
    minWidth: 350,
    maxHeight: 439,
    maxWidth: 350,
    minHeight: 439,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteMode: true,
    },
    autoHideMenuBar: true,
  });
  win.loadURL(
    isDev
      ? "https://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
