# Chapter — Personal Book Tracker

An editorial reading-journal web application designed for personal book curation, rhythm tracking, and distraction-free library management. Built with **React 19**, **Vite 8**, and **Vanilla CSS**.

> **Live Demo**: [https://your-chapter-deployment.vercel.app](https://your-chapter-deployment.vercel.app) *(or your deployed live URL)*

---

## Overview

**Chapter** provides a serene, tactile space to log titles in your hands, organize upcoming reads, and track reading milestones. Designed with an editorial aesthetic inspired by physical clothbound journals, it balances visual elegance with accessible, responsive software engineering.

---

## Features

- **Editorial Landing Page**: Welcoming editorial presentation with floating book covers, staggered entrance animations, value propositions, key features breakdown, interactive preview, and responsive navigation.
- **Custom Book Logo**: Distinctive Chapter emblem integrated in the navigation bar, dashboard header, and footer.
- **Book Cataloguing**: Add books with Title, Author, Status (**To read**, **Reading**, or **Finished**), and optional Book Cover Image URL.
- **Book Cover Support & Fallbacks**: Renders direct book-cover URLs cleanly, falling back to a custom CSS clothbound book jacket with algorithmic color palettes if a cover URL is omitted or fails to load.
- **Inline Validation**: Displays clear, accessible inline validation messages (`Please enter a title`, `Please enter an author`) if inputs are missing or composed solely of whitespace. Valid input fields are preserved if submission fails.
- **Chronological Sorting**: New books are prepended automatically to the top of the collection (newest first) with relative creation dates.
- **Reactive Search**: Case-insensitive instant search across both title and author. Trims leading/trailing whitespace and isolates filtered search views so saved storage is never altered.
- **Status Management**: Update any book's status on its card with an accessible `<select>` dropdown. Stats and storage update immediately while preserving original book metadata (ID, title, author, creation timestamp).
- **Persistent Local Storage**: Safely synchronizes the entire collection to browser `localStorage` under the key `chapter-books`. Uses lazy state initialization to prevent accidental empty-array overwrites and sanitizes corrupt or malformed JSON gracefully.
- **Reading Statistics**: Live progress bar displaying total books and category counts for *All Books*, *To Read*, *Reading*, and *Finished*.
- **Delete with Confirmation**: Tactile inline confirmation (`Remove book? [Confirm] [Cancel]`) prevents accidental deletions and supports keyboard `Escape` cancellation.
- **Graceful Empty States**:
  - *Empty Library*: Peaceful book illustration with a direct call to action to log your first book.
  - *Empty Search*: Dedicated message indicating no matching titles with a single-click reset button.
- **Responsive & Accessible Design**:
  - Fluid mobile-first layout tested from 1440px desktop down to 320px compact screens with zero horizontal overflow.
  - Minimum 40px touch targets for mobile inputs, selects, and action buttons.
  - Semantic HTML5 structure, ARIA alert roles, visible keyboard focus rings (`:focus-visible`), and full `@media (prefers-reduced-motion: reduce)` support.

---

## Design System

The application adheres to an intentional, restrained reading-journal palette:
- **Warm Ivory (`#F6F3EC`)**: Base page background.
- **Forest Green (`#254B3B`)**: Primary buttons, brand marks, and active accents.
- **Charcoal (`#252822`)**: Headings, body text, and structural contrast.
- **Muted Sage (`#E5EBE1` / `#D3DDD0`)**: Subtle borders, dividers, and card surfaces.
- **Restrained Gold (`#C6A56B`)**: Accent badges, eyebrow labels, and highlight markers.
- **Typography**: Editorial serif [Newsreader](https://fonts.google.com/specimen/Newsreader) for headings paired with crisp sans-serif [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for body readability.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) (Functional components, hooks: `useState`, `useMemo`, `useEffect`, `useRef`)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: Vanilla CSS with CSS Custom Properties (zero external UI library overhead)
- **Linting**: ESLint 10 (Flat Config with React Hooks & React Refresh plugins)
- **Storage**: Browser `localStorage` API with defensive validation and error handling

---

## Local Setup & Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

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

3. Start the Vite local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build & Quality Checks

- **Run ESLint**:
  ```bash
  npm run lint
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Preview Production Build**:
  ```bash
  npm run preview
  ```

---

## Deployment Instructions

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the `book-tracker` repository.
4. Keep the default settings:
   - **Framework Preset**: Vite
   - **Build Command**: `vite build` or `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Deploying to GitHub Pages
1. Install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```
2. In `vite.config.js`, set `base: '/book-tracker/'`.
3. In `package.json`, add deployment scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run:
   ```bash
   npm run deploy
   ```
5. In your GitHub repository settings, go to **Pages** and ensure the source is set to the `gh-pages` branch.
