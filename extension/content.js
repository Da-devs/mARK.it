// Function to handle Bookmark button clicks
function handleBookmarkClick(event) {
    // Find the closest tweet container
    const tweetContainer = event.target.closest('article[data-testid="tweet"]');
    console.log(tweetContainer);
    if (!tweetContainer) return;
  
    // Extract the author's name
    const authorNameElement = tweetContainer.querySelector('div[dir="ltr"] > span');
    if (authorNameElement) {
      const authorName = authorNameElement.textContent;
      alert(`You bookmarked a post by: ${authorName}`);
    }
  }
  
  // Function to add click listeners to Bookmark buttons
  function addBookmarkListeners() {
    // Select all Bookmark buttons
    const bookmarkButtons = document.querySelectorAll('button[data-testid="bookmark"]');
    bookmarkButtons.forEach(button => {
      button.removeEventListener('click', handleBookmarkClick);
      button.addEventListener('click', handleBookmarkClick);
    });
  }
  
  // Observe changes in the DOM to handle dynamically loaded content
  const observer = new MutationObserver(addBookmarkListeners);
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Initial call to add listeners to existing Bookmark buttons
  addBookmarkListeners();
  