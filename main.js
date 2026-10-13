const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

function createWindow() {
  const win = new BrowserWindow({
    width: 620,
    height: 900,
    minWidth: 420,
    minHeight: 600,
    autoHideMenuBar: true,
    backgroundColor: "#111111",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.loadFile(path.join(__dirname, "index.html"));
}

function configureAutoUpdates() {
  // The updater is only active in packaged builds.
  if (!app.isPackaged) return;

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on("update-downloaded", () => {
    dialog.showMessageBox({
      type: "info",
      title: "Update ready",
      message: "An Incremental Game update has been downloaded.",
      detail: "The update will install when you close the game.",
      buttons: ["OK"]
    });
  });

  autoUpdater.on("error", (error) => {
    // Update failures should not stop offline gameplay.
    console.error("Auto-update check failed:", error.message);
  });

  // If offline or GitHub is unreachable, the current game remains playable.
  autoUpdater.checkForUpdatesAndNotify().catch((error) => {
    console.error("Auto-update check failed:", error.message);
  });
}

app.whenReady().then(() => {
  createWindow();
  configureAutoUpdates();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
