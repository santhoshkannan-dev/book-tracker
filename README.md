# Chapter — Personal Book Tracker

An editorial reading-journal web application designed for personal book curation, reading status tracking, and distraction-free library management. Built with **React 19**, **Vite 8**, and **Vanilla CSS**.

> **Live Demo:** [https://your-deployment-url.vercel.app](https://your-deployment-url.vercel.app) *(Replace with your deployed URL)*  
> **Repository:** [https://github.com/santhoshkannan-dev/book-tracker](https://github.com/santhoshkannan-dev/book-tracker)

---

## Overview

**Chapter** provides a focused, tactile interface to catalog books in progress, queue upcoming reads, and track reading milestones. The application is structured as a client-side single-page application (SPA) featuring an editorial landing page that transitions into a personal library dashboard. All data is persisted directly to the browser via `localStorage`, requiring no accounts, backend services, or third-party trackers.

---

## Implemented Features

### 1. Landing Page & Navigation
- **Editorial Presentation:** Welcoming hero section with staggered entrance animations, typography inspired by book publishers, and a three-cover floating visual stage featuring real cover artwork.
- **Custom Brand Identity:** Custom emblem icon (`/chapter.avif`) in the top navigation bar, dashboard header, and footer.
- **Zero-Dependency View Routing:** Hash-based view switching (`#/` for the landing page, `#/library` for the dashboard) supporting browser back/forward buttons and direct bookmarking without external routing libraries.
- **Responsive Navigation:** Desktop navigation links (*The Concept*, *Features*, *Preview*) and a collapsible mobile dropdown menu.
- **Footer with Creator Links:** Multi-column footer including navigation links, developer details, portfolio link ([santhoshkannan.codes](https://www.santhoshkannan.codes)), LinkedIn ([santhosh-kannan-r](https://www.linkedin.com/in/santhosh-kannan-r/)), and GitHub ([santhoshkannan-dev](https://github.com/santhoshkannan-dev)).

### 2. Library Dashboard & Cataloguing
- **Book Addition Form:** Form accessible via modal or grid tile supporting **Title**, **Author**, **Reading Status** (*To read*, *Reading*, *Finished*), and an optional **Cover Image URL**.
- **Inline Validation:** Strict validation requiring non-empty, trimmed title and author values. Submitting invalid inputs displays clear inline messages (`Please enter a title`, `Please enter an author`) without clearing validly entered data.
- **Chronological Sorting:** New books are prepended automatically to the top of the collection (newest first).
- **Book Cover Display & Graceful Fallbacks:** Valid HTTP/HTTPS image URLs render within the card frame (`object-fit: cover`). If a cover URL is omitted or fails to load (404/network error), the card automatically falls back to an algorithmic, CSS-rendered clothbound book jacket displaying the title, author, and book ornament with zero broken-image icons.

### 3. Search & Status Management
- **Reactive Instant Search:** Case-insensitive search across both title and author with leading and trailing whitespace trimming. Search results filter in real time without altering the saved collection.
- **Status Updates:** Update any book's reading status via an accessible dropdown selector directly on the card. Statistics and storage synchronize immediately while preserving original IDs and creation timestamps.
- **Statistics Calculation:** Live reading statistics (*Total Books*, *To Read*, *Reading*, *Finished*) calculated from the complete collection rather than filtered search views.
- **Delete with Confirmation:** Two-step confirmation popover (`Delete? Yes / No`) to prevent accidental deletions, supporting `Escape` key cancellation.
- **State Feedback:** Distinct empty-library and no-search-results states with a one-click filter reset.

### 4. Persistence & Reliability
- **Browser LocalStorage:** Synchronizes all operations (adds, updates, deletions) under the single key `chapter-books`.
- **Race Condition Prevention:** Uses synchronous lazy state initialization (`useState(() => loadBooksFromStorage())`) to prevent initial empty-array state from overwriting existing stored data.
- **Data Validation & Sanitization:** Filters and sanitizes loaded items, discarding malformed JSON or invalid schema entries while falling back to initial sample titles on first launch.

---

## Design System

The application uses an intentional, high-contrast reading-journal palette defined with CSS Custom Properties:

| Token | Hex | Usage |
|---|---|---|
| Warm Ivory | `#F6F3EC` | Landing page background and primary surfaces |
| Forest Green | `#254B3B` | Primary call-to-action buttons, brand accents, active states |
| Charcoal | `#252822` | Primary typography and high-contrast structural text |
| Muted Sage | `#E5EBE1` | Subtle borders, badges, card surfaces, and dividers |
| Restrained Gold | `#C6A56B` | Accent highlights, eyebrow badges, and tag elements |

**Typography:**
- Headings: [Newsreader](https://fonts.google.com/specimen/Newsreader) (editorial serif).
- Body & Interface: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (clean geometric sans-serif).

---

## Technology Stack

- **Framework:** [React](https://react.dev/) `^19.2.8` (Functional components, hooks: `useState`, `useMemo`, `useEffect`, `useRef`)
- **Build Tool:** [Vite](https://vite.dev/) `^8.3.0` (Client build with `@vitejs/plugin-react` `^6.1.1`)
- **Styling:** Vanilla CSS with custom properties and CSS Grid/Flexbox (zero runtime CSS libraries)
- **Code Quality:** [ESLint](https://eslint.org/) `^10.10.0` (Flat Config with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`)
- **Persistence:** Browser `localStorage` API

---

## Local Setup & Development

### Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **npm:** v9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/santhoshkannan-dev/book-tracker.git
   cd book-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open the development URL in your browser:
   ```text
   http://localhost:5173
   ```

---

## Available Scripts

In the project root, you can execute:

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and optimizes assets into the `dist/` directory for production. |
| `npm run lint` | Runs ESLint across all `.js`, `.jsx` files to check code quality and React hook rules. |
| `npm run preview` | Serves the production build locally at `http://localhost:4173` to test the output bundle. |

---

## Deployment Instructions

### Deploying to Vercel (Recommended)

1. Push the latest code to GitHub:
   ```bash
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the `book-tracker` repository.
4. Keep the default configuration:
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `vite build` (or `npm run build`)
   - **Output Directory:** `dist`
5. Click **Deploy**. Vercel will build and assign a production URL.
6. Copy the live URL and update the placeholder at the top of this `README.md`.

### Deploying to GitHub Pages

If deploying to GitHub Pages instead of Vercel, adjust for repository sub-path hosting:

1. In `vite.config.js`, set the base path to your repository name:
   ```javascript
   // vite.config.js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/book-tracker/',
   })
   ```
2. Install the `gh-pages` deployment tool:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Add the deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run deployment:
   ```bash
   npm run deploy
   ```
5. In GitHub repository settings under **Pages**, ensure the branch source is set to `gh-pages`. Because the application uses hash-based routing (`#/` and `#/library`), direct page refreshes work reliably on GitHub Pages without server-side redirect rules.

---

## Quality Verification

- **Linting:** Verified clean via `npm run lint` with 0 warnings and 0 errors.
- **Production Build:** Verified clean via `npm run build` generating optimized production assets.
- **Browser Testing:** Verified manually in browser across desktop (1440px), tablet (768px), and mobile (390px, 320px) viewports with zero horizontal overflow.
