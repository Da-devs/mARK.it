const PLATFORM_CONFIG = {
  "twitter.com": {
    name: "Twitter",
    bookmarkSelector: 'button[data-testid="bookmark"]',
    containerSelector: 'article[data-testid="tweet"]',
    metadata: (container) => ({
      title: container.innerText.slice(0, 100),
      author: container.querySelector('div[dir="ltr"] > span')?.textContent || "Unknown",
      url: window.location.href,
      timestamp: new Date().toISOString()
    })
  },
  "x.com": {
      name: "X",
      bookmarkSelector: 'button[data-testid="bookmark"]',
      containerSelector: 'article[data-testid="tweet"]',
      metadata: (container) => ({
        title: container.innerText.slice(0, 100),
        author: container.querySelector('div[dir="ltr"] > span')?.textContent || "Unknown",
        url: window.location.href,
        timestamp: new Date().toISOString()
      })
    },
  "instagram.com": {
    name: "Instagram",
    bookmarkSelector: 'svg[aria-label="Save"]',
    containerSelector: 'article[role="presentation"]',
    metadata: (container) => ({
      title: container.innerText.slice(0, 100),
      author: container.querySelector('a[role="link"]')?.textContent || "Unknown",
      url: window.location.href,
      timestamp: new Date().toISOString()
    })
  }
};
