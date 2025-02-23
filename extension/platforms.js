const PLATFORM_CONFIG = {
  "x.com": {
    bookmarkSelector: 'button[data-testid="bookmark"]',
    containerSelector: 'article[data-testid="tweet"]',
    metadata: (container) => ({
      name: "X (Twitter)",
      description: container.innerText.split("\n")[4].slice(0, 100),
      author: container.querySelector('div[dir="ltr"] > span')?.textContent || "Unknown",
      url: container.querySelector('a[href*="/status/"]')?.href || "Unknown",
      timestamp: new Date().toISOString()
    })
  },
  "instagram.com": {
    bookmarkSelector: 'svg[aria-label="Save"]',
    containerSelector: 'article',
    metadata: (container) => ({
      platform: "Instagram",
      description: container.innerText.split("\n")[5].slice(0, 100),
      author: container.innerText.split("\n")[0],
      url: container.querySelector('a[href*="/p/"]')?.href || "Unknown",
      timestamp: new Date().toISOString()
    })
  },
  "gitlab.com": { // TODO
    bookmarkSelector: 'button[class*="star-btn"]',
    containerSelector: 'div[class*="project-page-layout"]',
    metadata: (container) => ({
      platform: "GitLab",
      description: container.textContent.trim().slice(0, 100) || "Untitled",
      author: container.textContent.trim() || "Unknown",
      url: window.location.href,
      timestamp: new Date().toISOString()
    })
  },
  "github.com": {// TODO
    bookmarkSelector: 'button[aria-label*="Star this repository"]', // GitHub star button
    containerSelector: '', // Covers repos, issues, and PRs
    metadata: (container) => ({
      platform: "GitHub",
      description: container.querySelector('h1, .js-issue-description, .js-pull-request-description')?.textContent.trim().slice(0, 100) || "Untitled",
      author: container.querySelector('.author, .user-login')?.textContent.trim() || "Unknown",
      url: container.querySelector('a.js-navigation-open, a.Link--primary')?.href || window.location.href,
      timestamp: new Date().toISOString()
    })
  }
};
