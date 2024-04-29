chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "open-overlay":
      // Query to get the current active tab in the current window
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length === 0) return; // Make sure there is at least one tab
        const currentTab = tabs[0];

        if (!currentTab.id) return; // Make sure the tab has an ID
        
        // Execute the script on the active tab
        chrome.scripting.executeScript({
          target: {tabId: currentTab.id},
          files: ['overlay.js']
        });
      });
      break;
    case "go-to-scripts":
      // Simply opens a new tab with the specified URL
      chrome.tabs.create({ url: "https://example.com/scripts" });
      break;
  }
});