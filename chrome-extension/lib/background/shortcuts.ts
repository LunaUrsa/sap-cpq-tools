const handleShortcuts = () => {
  // console.info('Handling shortcuts');
  chrome.commands.onCommand.addListener(async (command) => {
    console.log(`Command: ${command}`);
    switch (command) {
      case 'Open Shortcuts': {
        console.log('Opening shortcuts');
        // await chrome.action.openPop up();
        // await chrome.sidePanel.setOptions({ path: 'sidepanel/index.html', enabled: true });
        // await chrome.sidePanel.open({ windowId: tab.windowId });
        // await chrome.action.openPopup()
        // Assuming you have a popup.html file in the root of your extension
        // const url = chrome.runtime.getURL('popup.html');
        // await chrome.windows.create({ url, type: 'popup', width: 400, height: 600 });
      }
    }
  });
  // console.log('Shortcuts handled');
}

export default handleShortcuts;