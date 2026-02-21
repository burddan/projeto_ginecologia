const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  iniciarPararGravacao: (callback) => ipcRenderer.on("record:toggle", callback),
  iniciarFoto: (callback) => ipcRenderer.on("photo:take", callback),

  escolherPasta: () => ipcRenderer.invoke("choose-folder"),
  salvarArquivo: (data) => ipcRenderer.invoke("save-file", data)
});
