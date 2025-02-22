# mARK.it - The Ultimate Bookmark Manager

## Project Description
mARK.it is a **hybrid bookmark management system** that helps users **capture**, **organize**, and **synchronize** bookmarks from various platforms into a single, centralized interface. With a browser extension for easy bookmarking and a web app for advanced organization, Mark.it ensures that users never lose track of important links. With mARK.it, your bookmarks aren’t just saved—they’re seamlessly connected, intelligently organized, and instantly accessible, anytime, anywhere.

## Problem Statement
Managing bookmarks across multiple platforms is a **chaotic** and **fragmented experience**:
- Browser bookmarks are **limited to a single device** unless synced manually.
- Social media platforms (Twitter, Instagram, Reddit) **do not offer an easy way to export saved links**.
- Users end up **losing track of saved links** due to disorganization.
- Manually importing/exporting bookmarks is tedious.

mARK.it solves this problem by providing a **seamless browser extension** for capturing bookmarks and a **web app** for managing, organizing, and searching saved links.

## Key Features
### Browser Extension (Capture Bookmarks Easily)
- One-click bookmarking for any website.
- Automatically saves URL, title, and metadata.
- Works on Chrome, Firefox, and Edge.
- Sends bookmarks directly to the web app.

### Web App (Organize & Manage Bookmarks)
- View and search bookmarks in a clean UI.
- Supports tagging, categorization, and filtering.
- Import bookmarks from Chrome, Firefox, and JSON/CSV files.

### Sync & Export
- Auto-sync bookmarks between extension and web app.
- Export bookmarks in multiple formats (HTML, JSON, CSV).
- Offline support - access saved bookmarks without internet.

## Tech Stack
- **Browser Extension** - Manifest V3 (Chrome & Firefox), JavaScript
- **Frontend (Web App)** - Next.js
- **Backend API** - FastAPI (Python)
- **Database** - SQLite

## Why mARK.it stands out?
mARK.it is a truly **open-source**, **self-hosted**, and **privacy-focused bookmark manager**, making it the perfect alternative to closed-source bookmark services. With **minimal reliance on third-party APIs**, it's built for hackers, researchers, and productivity enthusiasts alike!

# Checklist

## Setup & Installation
- [x] Clone the repository
- [x] Install dependencies for both `extension/` and `webapp/`
- [ ] Run development servers:
  - [ ] Web app (`webapp/`): `npm run dev`
  - [ ] Load extension in Chrome as an unpacked extension

## Browser Extension Development
- [ ] Implement `manifest.json` with required permissions
- [ ] Configure Webpack for bundling
- [ ] Create content scripts for social media monitoring
- [ ] Develop background scripts for event handling and API requests
- [ ] Build popup UI for quick bookmark management

## Web App Development (Next.js)
- [ ] Initialize Next.js app and configure `next.config.js`
- [ ] Develop core pages:
  - [ ] Home (`index.tsx`)
  - [ ] Dashboard (`dashboard.tsx`)
  - [ ] Settings (`settings.tsx`)
- [ ] Create reusable components:
  - [ ] `BookmarkList.tsx`
  - [ ] `Sidebar.tsx`
- [ ] Implement API routes for bookmark management (`api/bookmarks.ts`)

## Integration & Testing
- [ ] Connect browser extension with web app via API calls
- [ ] Sync bookmark data between extension and web app
- [ ] Perform unit tests on components
- [ ] Conduct end-to-end testing
- [ ] Debug any issues (API calls, permissions, etc.)

## Deployment & Optimization
- [ ] Optimize performance (minimize API calls, lazy loading, caching)
- [ ] Secure authentication tokens and sensitive data
- [ ] Deploy web app (e.g., on Vercel)
- [ ] Package and publish the Chrome extension
- [ ] Monitor user feedback and iterate with improvements
