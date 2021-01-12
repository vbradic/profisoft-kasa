const {app, BrowserWindow, Menu} = require('electron') 
const url = require('url') 
const path = require('path')  

let win  



function createWindow() { 
   win = new BrowserWindow({width: 800, height: 600}) 
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index.html'), 
      protocol: 'file:', 
      slashes: true 
   })); 
}  

const mainMenuTemplate = [
   {},
   {
   label: 'File',
   submenu: [{label: 'TODO'}]
}];

function initMainMenu() {
   const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
   Menu.setApplicationMenu(mainMenu);

   if (process.platform == 'darwin') {
      mainMenuTemplate.unshift({label: ''});
  }
}

if(process.env.NODE_ENV !== 'production') {
   mainMenuTemplate.push({
      label: 'DevTools',
      submenu: [{
         label: 'Toggle DevTools',
         accelerator: process.platform == 'darwin' ? 'Command + I' : 'Ctrl + I',
         click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
         }
      }]
   })
}

app.on('ready', () => {
   initMainMenu();
   createWindow();
}) 