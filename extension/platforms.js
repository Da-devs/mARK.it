const PLATFORM_CONFIG = {
  "x.com": {
    name: "X (Twitter)",
    bookmarkSelector: 'button[data-testid="bookmark"]',
    containerSelector: 'article[data-testid="tweet"]',
    metadata: (container) => ({
      title: container.innerText.slice(0, 100),
      author: container.querySelector('div[dir="ltr"] > span')?.textContent || "Unknown",
      url: container.querySelector('a[href*="/status/"]')?.href || "Unknown",
      timestamp: new Date().toISOString()
    })
  },
  "instagram.com": {
    name: "Instagram",
    bookmarkSelector: 'svg[aria-label="Save"]',
    containerSelector: 'article',
    metadata: (container) => ({
      title: container.innerText.split("\n")[5].slice(0,100),
      author: container.innerText.split("\n")[0],
      url: container.querySelector('a[href*="/p/"]')?.href || "Unknown",
      timestamp: new Date().toISOString()
    })
  }
};
