const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onRecordToggle: (callback) => ipcRenderer.on("record:toggle", callback),
  onPhotoTake: (callback) => ipcRenderer.on("photo:take", callback),

  chooseFolder: () => ipcRenderer.invoke("choose-folder"),
  saveFile: (data) => ipcRenderer.invoke("save-file", data)
});