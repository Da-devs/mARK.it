function showPopup(authorName, tweetURL) {
    // Detect if Twitter is in dark mode by checking the body's background color
    const isDarkMode = window.getComputedStyle(document.body).backgroundColor !== 'rgb(255, 255, 255)';

    // Create popup div
    const popup = document.createElement('div');
    popup.id = 'bookmark-alert-popup';
    popup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${isDarkMode ? '#1a1a1a' : '#ffffff'};
        color: ${isDarkMode ? '#ffffff' : '#000000'};
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: 'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 150px;
        font-weight: 400;
        letter-spacing: -0.02em;
    `;

    // Create emoji element
    const emoji = document.createElement('span');
    emoji.textContent = '🔖'; // Bookmark emoji
    emoji.style.cssText = `
        font-size: 14px;
        line-height: 1;
    `;

    // Create text element
    const text = document.createElement('span');
    text.textContent = 'mARKed.it';

    // Create progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background: ${isDarkMode ? '#333333' : '#e0e0e0'};
        border-radius: 0 0 5px 5px;
        overflow: hidden;
    `;

    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 100%;
        height: 100%;
        background: #00aa00;
        transform: translateX(-100%);
        animation: progress 1.5s linear forwards;
    `;

    // Add keyframes for animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes progress {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }
    `;
    document.head.appendChild(styleSheet);

    // Assemble the popup
    popup.appendChild(emoji);
    popup.appendChild(text);
    progressContainer.appendChild(progressBar);
    popup.appendChild(progressContainer);
    document.body.appendChild(popup);

    // Remove popup and cleanup after 2 seconds
    setTimeout(() => {
        popup.remove();
        document.head.removeChild(styleSheet);
    }, 2000);
}

window.showPopup = showPopup; // Make it globally available