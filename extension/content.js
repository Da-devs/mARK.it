(() => {
  const bookmarkHandler = new BookmarkHandler();

  bookmarkHandler.addBookmarkListeners();

  // Watch for dynamic content
  createDOMObserver(() => bookmarkHandler.addBookmarkListeners());
})();

chrome.storage.local.get("userUUID", (data) => {
  console.log("Retrieved data:", data);
  if (data.userUUID) {
    console.log("User UUID retrieved:", data.userUUID);
    // Use this UUID for API requests or authentication
  } else {
    console.log("No UUID found");
  }
});

console.log("Content script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getUserUUID") {
    chrome.storage.local.get("userUUID", (data) => {
      sendResponse({ userUUID: data.userUUID });
    });
    return true; // Will respond asynchronously.
  }
});