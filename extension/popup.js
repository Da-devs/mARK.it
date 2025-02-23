document.addEventListener('DOMContentLoaded', () => {
  const bookmarkList = document.getElementById('bookmark-list');

  const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;

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

  async function getBrowserBookmarks() {
    try {
      const bookmarkTreeNodes = await browserAPI.bookmarks.getTree();
      const bookmarks = [];
      
      function processNodes(nodes) {
        nodes.forEach(node => {
          if (node.url) { // If it's a bookmark (has URL)
            bookmarks.push({
              title: node.title || 'Untitled',
              url: node.url,
              dateAdded: new Date(node.dateAdded).toISOString()
            });
          }
          if (node.children) { // If it's a folder
            processNodes(node.children);
          }
        });
      }
      
      processNodes(bookmarkTreeNodes);
      return bookmarks;
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      return [];
    }
  }

  function saveBookmarksToFile(bookmarks) {
    const jsonContent = JSON.stringify(bookmarks, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const filename = `bookmarks_${new Date().toISOString().split('T')[0]}.json`;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Add event listeners to buttons
  document.getElementById('star-repo').addEventListener('click', () => {
    window.open('https://github.com/Da-devs/mARK.it', '_blank');
  });

  document.getElementById('visit-website').addEventListener('click', () => {
    window.open('about:blank', '_blank');
  });

  document.getElementById('sync-bookmarks').addEventListener('click', async () => {
    const bookmarks = await getBrowserBookmarks();
    if (bookmarks.length > 0) {
      saveBookmarksToFile(bookmarks);
      browserAPI.storage.local.set({ bookmarks: bookmarks }, () => {
        // displayBookmarks();
        alert(`Successfully synced ${bookmarks.length} bookmarks! File saved as JSON.`);
      });
    } else {
      alert('No bookmarks found to sync.');
    }
  });

  document.getElementById('sign-in').addEventListener('click', () => {
    alert('Sign in...');
    window.open("http://localhost:3000" + "/login", '_blank');
  });


  // Display bookmarks on load
  // displayBookmarks();
});