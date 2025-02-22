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

  handleBookmarkClick(event) {
    if (!this.config) return;

    const container = event.target.closest(this.config.containerSelector);
    if (!container) return;

    const metadata = this.config.metadata(container);
    console.log('Bookmark detected:', metadata);
    console.log('Bookmark Link: ', metadata.url)

    showPopup();
    // Here you can add logic to send metadata to your backend
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
