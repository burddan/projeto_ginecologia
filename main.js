const { app, BrowserWindow, globalShortcut, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

let win;
let saveDir = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    }
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register("Alt+F10", () => {
    win.webContents.send("record:toggle");
  });

  globalShortcut.register("Alt+F9", () => {
    win.webContents.send("photo:take");
  });
});

// 🔹 escolher pasta
ipcMain.handle("choose-folder", async () => {
  const result = await dialog.showOpenDialog({
    title: "Escolha a pasta para salvar fotos e vídeos",
    properties: ["openDirectory", "createDirectory"]
  });

  if (result.canceled) {
    return null;
  }

  saveDir = result.filePaths[0];
  return saveDir;
});

// 🔹 salvar arquivos
ipcMain.handle("save-file", async (_, { buffer, filename }) => {
  // fallback
  if (!saveDir) {
    saveDir = app.getPath("videos");
  }

  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }

  const filePath = path.join(saveDir, filename);
  fs.writeFileSync(filePath, Buffer.from(buffer));
  return filePath;
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
