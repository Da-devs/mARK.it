class BookmarkHandler {
  constructor() {
    this.currentPlatform = this.detectPlatform();
    this.config = PLATFORM_CONFIG[this.currentPlatform];
    // Bind the click handler only once
    this.boundHandleBookmarkClick = this.handleBookmarkClick.bind(this);
  }

  detectPlatform() {
    const hostname = window.location.hostname;
    return Object.keys(PLATFORM_CONFIG).find(platform => hostname.includes(platform));
  }

  async handleBookmarkClick(event) {
    if (!this.config) return;

    const container = event.target.closest(this.config.containerSelector);
    if (!container) return;

    const metadata = this.config.metadata(container);

    if (!metadata?.url) {
      console.warn("No valid bookmark URL detected");
      return;
    }

    console.log('Bookmark detected:', metadata);
    console.log('Bookmark Link:', metadata.url);

    showPopup();

    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Bookmark saved:', data);
    } catch (error) {
      console.error('Failed to save bookmark:', error);
    }
  }


  addBookmarkListeners() {
    if (!this.config) return;

    const bookmarkButtons = document.querySelectorAll(this.config.bookmarkSelector);
    bookmarkButtons.forEach(button => {
      // Remove any previously attached listener using the bound function
      button.removeEventListener('click', this.boundHandleBookmarkClick);
      button.addEventListener('click', this.boundHandleBookmarkClick);
    });
  }
}
