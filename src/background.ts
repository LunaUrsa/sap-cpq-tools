chrome.commands.onCommand.addListener((command) => {
  console.log("Command:", command)
  switch (command) {
    case "activate":
      // Query to get the current active tab in the current window
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length === 0) return; // Make sure there is at least one tab
        console.log("Tabs:", tabs)
        const currentTab = tabs[0];

        if (!currentTab.id) return; // Make sure the tab has an ID
        console.log("Current Tab:", currentTab.id)
        
        // Execute the script on the active tab
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: ['/build/overlay.js']
        }, (results) => {
          // Check for errors
          if (chrome.runtime.lastError) {
            console.error('Script injection failed:', chrome.runtime.lastError.message);
          } else {
            console.log('Script injected successfully, results:', results);
          }
        });
      });
      break;
    case "go-to-scripts":
      // Simply opens a new tab with the specified URL
      chrome.tabs.create({ url: "https://example.com/scripts" });
      break;
  }
});