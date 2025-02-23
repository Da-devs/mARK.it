// background.js
// const CONFIG = {
//   ROOT_URL: "http://localhost:3000",
//   API_BASE_URL: "http://localhost:3000/api",
// };
// import CONFIG  from 'config.js';

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);
  
  // if (!sender.url.startsWith(CONFIG.ROOT_URL)) {
  //   console.error("Unauthorized sender domain");
  //   sendResponse({ success: false, error: "Unauthorized sender" });
  //   return true;
  // }

  if (message.uuid) {
    // Store UUID with timestamp
    const authData = {
      uuid: message.uuid,
      timestamp: Date.now(),
      origin: sender.url
    };
    
    chrome.storage.local.set({ authData }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error storing auth data:", chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError });
      } else {
        console.log("Auth data stored:", authData);
        // Broadcast to all tabs that auth state changed
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { type: 'AUTH_STATE_CHANGED', data: authData });
          });
        });
        sendResponse({ success: true });
      }
    });
  }

  return true;
});

// Handle auth state changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.authData) {
    const newAuthData = changes.authData.newValue;
    console.log('Auth data changed:', newAuthData);
  }
});