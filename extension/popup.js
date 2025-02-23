document.addEventListener('DOMContentLoaded', () => {
  const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;
  const signInButton = document.getElementById('sign-in');

  // Function to replace sign-in button with avatar
  function displayUserAvatar(avatarUrl) {
    if (avatarUrl) {
      const avatarImg = document.createElement('img');
      avatarImg.src = avatarUrl;
      avatarImg.className = 'avatar';
      avatarImg.alt = 'User Avatar';
      signInButton.replaceWith(avatarImg);
    }
  }

  // Fetch user avatar with a GET request
  async function fetchUserAvatar() {
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if needed, e.g.:
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include' // Include cookies if your auth uses them
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      const avatarUrl = userData.avatar; // Adjust based on your API response structure
      displayUserAvatar(avatarUrl);
    } catch (error) {
      console.error('Error fetching user avatar:', error);
      // Keep the sign-in button if fetch fails (e.g., user not signed in)
    }
  }

  // Call the fetch function on load
  fetchUserAvatar();

  // Function to fetch browser bookmarks
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

  // Function to save bookmarks to a JSON file
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
<<<<<<< Updated upstream
        // displayBookmarks();
        console.log(`Successfully synced ${bookmarks.length} bookmarks! File saved as JSON.`);
=======
        alert(`Successfully synced ${bookmarks.length} bookmarks! File saved as JSON.`);
>>>>>>> Stashed changes
      });
    } else {
      console.log('No bookmarks found to sync.');
    }
  });

<<<<<<< Updated upstream
  document.getElementById('sign-in').addEventListener('click', () => {
    console.log('Sign in...');
    window.open("http://localhost:3000" + "/login", '_blank');
=======
  signInButton.addEventListener('click', () => {
    alert('Sign in...');
    window.open('http://localhost:3000/login', '_blank');
>>>>>>> Stashed changes
  });
});