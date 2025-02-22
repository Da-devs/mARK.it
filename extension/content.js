(() => {
  const bookmarkHandler = new BookmarkHandler();

  bookmarkHandler.addBookmarkListeners();

  // Watch for dynamic content
  createDOMObserver(() => bookmarkHandler.addBookmarkListeners());
})();
