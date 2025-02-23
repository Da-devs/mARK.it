chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    console.log("Received message:", message); // Debugging step
  
    if (message.uuid) {
      chrome.storage.local.set({ userUUID: message.uuid }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error storing UUID:", chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError });
        } else {
          console.log("UUID stored in extension:", message.uuid);
          sendResponse({ success: true });
        }
      });
    }
  
    return true; // Required for async response
  });
  