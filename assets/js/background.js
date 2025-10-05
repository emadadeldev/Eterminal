chrome.commands.onCommand.addListener((command) => {
    if (command === "open-search-box") {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tab = tabs[0];
        if (tab.url.startsWith("chrome-extension://")) {
          console.log("Skipping injection on extension page.");
          return;
        }
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ['assets/js/search-box.js']
        });
      });
    }
  });
  