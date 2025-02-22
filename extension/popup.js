document.addEventListener('DOMContentLoaded', () => {
    const bookmarkList = document.getElementById('bookmark-list');
  
    // Function to create a bookmark item element
    function createBookmarkItem(bookmark) {
      const item = document.createElement('div');
      item.className = 'bookmark-item';
      item.innerHTML = `
        <span>${bookmark.title}</span>
        <a href="${bookmark.url}" target="_blank">Visit</a>
      `;
      return item;
    }
  
    // Fetch bookmarks from storage and display them
    // function displayBookmarks() {
    //   chrome.storage.local.get(['bookmarks'], (result) => {
    //     const bookmarks = result.bookmarks || [];
    //     bookmarkList.innerHTML = ''; // Clear existing bookmarks
    //     bookmarks.forEach(bookmark => {
    //       const item = createBookmarkItem(bookmark);
    //       bookmarkList.appendChild(item);
    //     });
    //   });
    // }
  
    // Add event listeners to buttons
    document.getElementById('star-repo').addEventListener('click', () => {
      window.open('https://github.com/Da-devs/mARK.it?tab=readme-ov-file', '_blank');
    });
  
    document.getElementById('visit-website').addEventListener('click', () => {
      window.open('https://amrita.edu', '_blank');
    });
  
    document.getElementById('sync-bookmarks').addEventListener('click', () => {
      // Logic to sync bookmarks can be added here
      alert('Syncing bookmarks...');
    });
    
    document.getElementById('sign-in').addEventListener('click', () => {
      alert('Sign in...');
      window.open("http://localhost:3000" + "/login", '_blank');
    });
    
  
    // Display bookmarks on load
    // displayBookmarks();
  });