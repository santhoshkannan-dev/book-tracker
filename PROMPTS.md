# Development Prompts & Evolution Record

This document records the five most pivotal prompts used during the development of **Chapter — Personal Book Tracker**, their intended purpose, what was accomplished, and a genuine AI mistake encountered and resolved during the process.

---

## The Five Most Important Prompts

### 1. Project Inspection & Architecture Assessment
> **Prompt:**  
> *"I am building a React + Vite web application called Chapter — Personal Book Tracker for an internship assessment. Before coding, inspect my existing project structure, package.json, entry files, and current implementation... For this stage, do not implement the whole application. Report the current project structure, recommend the smallest sensible set of file changes, identify any existing issues, and propose the implementation order. Then wait for my next prompt."*

* **Purpose:** Prevent blind overwriting of boilerplate files, inspect existing dependencies (React 19, Vite 8, ESLint), and establish a modular component architecture before writing code.
* **What Happened:** The repository was audited. A clean plan was proposed dividing the app into reusable components (`Header`, `StatsCards`, `BookForm`, `SearchBar`, `BookCard`, `BookList`), centralized constants, and an editorial design token system.

---

### 2. Visual Foundation & Editorial Design System
> **Prompt:**  
> *"Now implement the visual foundation for Chapter using my existing React + Vite project. Create or update reusable components as appropriate: Header.jsx, StatsCards.jsx, BookForm.jsx, SearchBar.jsx, BookList.jsx, BookCard.jsx, App.jsx, index.css... Keep the existing main.jsx and project configuration unless changes are necessary. UI REQUIREMENTS: 1. Compact top nav with Chapter wordmark... 2. Editorial hero section... 3. Statistics area... 4. Accessible Add a Book form... 5. Library section with search... 6. Elegant book cards... 7. Polished empty states... 8. Delete control with confirmation..."*

* **Purpose:** Establish the editorial reading-journal visual identity (warm ivory `#F6F3EC`, forest green `#254B3B`, charcoal `#252822`, muted sage `#E5EBE1`, and gold `#C6A56B`), import Google Fonts (*Newsreader* serif and *Plus Jakarta Sans*), and lay out the core interactive interface.
* **What Happened:** Global CSS variables were defined in `index.css`, typography links added to `index.html`, and initial component structures built and styled with restrained elevation, custom SVG icons, and a centered 1120px layout.

---

### 3. Add a Book Feature with Strict Validation
> **Prompt:**  
> *"Implement the Add a Book feature in Chapter. FUNCTIONAL REQUIREMENTS: 1. Users can enter a book title, author, and status. 2. Both title and author are required. 3. If the title is empty, show 'Please enter a title' directly below the title field. 4. If the author is empty, show 'Please enter an author' directly below the author field. 5. Trim whitespace from the title and author before validation and saving. 6. If validation fails, do not add a book. Preserve the user's other valid input. 7. If validation succeeds, create a book object with a stable unique ID, title, author, selected status, and createdAt timestamp. 8. Insert the new book at the beginning of the collection so the newest book appears first. 9. Clear the form after a successful submission and return the status field to To read..."*

* **Purpose:** Enforce strict field requirements, validate trimmed input, preserve partial valid input on error, and guarantee chronological newest-first insertion.
* **What Happened:** Implemented robust trimmed validation, connected `aria-invalid` and `aria-describedby` attributes for accessibility, generated stable UUIDs with fallback timestamps, and wired instant statistics updates.

---

### 4. Resilient LocalStorage Persistence
> **Prompt:**  
> *"Now implement persistent storage for Chapter using browser localStorage. REQUIREMENTS: 1. Load saved books when the application initializes. 2. Save the current collection whenever books are added, deleted, or their status changes. 3. Refreshing the page must restore all books with their original titles, authors, IDs, creation timestamps, and statuses. 4. Saving must not reset a book's status to To read. 5. Use a single, consistent localStorage key, such as 'chapter-books'. 6. Handle missing data, malformed JSON, and storage access errors gracefully without crashing the application. 7. Validate the loaded data sufficiently to avoid rendering invalid book objects. 8. Avoid overwriting existing saved data with an empty initial array before the stored data has been loaded. 9. Do not save filtered search results; always persist the complete collection..."*

* **Purpose:** Eliminate data loss on page refresh, protect against the classic React race condition where an initial empty `[]` state overwrites stored data, and ensure malformed data does not crash the UI.
* **What Happened:** Created `src/utils/storage.js` with `isValidBook` and `sanitizeBook` schema validators. Implemented synchronous lazy state initialization (`useState(() => loadBooksFromStorage())`) and defensive `try...catch` serialization under the key `chapter-books`.

---

### 5. Reactive Search, Delete Confirmation & Responsive Viewport Polish
> **Prompt:**  
> *"Complete the remaining functional requirements for Chapter... Perform a visual polish and responsive-design pass on Chapter... Test at approximately 1440px, 768px, 390px, and 320px widths. Fix any real issues you discover rather than merely reporting them."*

* **Purpose:** Connect case-insensitive derived search filtering across both title and author without mutating stored books, refine inline delete confirmation with keyboard `Escape` dismissal, and eliminate horizontal scrolling across mobile viewports down to 320px.
* **What Happened:** Implemented `useMemo` search filtering, created distinct geometric status badges, tuned mobile input and button sizes to $\ge 40$px touch targets, ensured word-wrapping for long titles, added `prefers-reduced-motion` overrides, and verified clean rendering at 1440px, 768px, 390px, and 320px.

---

## Real AI Mistake Encountered & Resolved

### The Mistake / Incorrect Assumption
During **Prompt 2**, when initially scaffolding `BookForm.jsx`, the AI assumed generic phrasing for field validation errors:
```javascript
// AI's initial assumption:
if (!currentTitle.trim()) {
  errs.title = 'Please provide a book title.';
}
if (!currentAuthor.trim()) {
  errs.author = 'Please provide the author’s name.';
}
```
The AI assumed polite, conversational error strings were acceptable, rather than checking if strict standardized strings were required by the assessment specification.

### How It Was Detected
In **Prompt 3**, the specification explicitly called for standardized strings:
- *"3. If the title is empty, show 'Please enter a title' directly below the title field."*
- *"4. If the author is empty, show 'Please enter an author' directly below the author field."*

During manual inspection of the form's error outputs and automated browser validation, the discrepancy between the prompt requirements and the component output was immediately apparent.

### How It Was Corrected
In `src/components/BookForm.jsx`, the validation function and input change handlers were updated to strictly match the required text:
```javascript
// Corrected implementation:
const validate = (currentTitle, currentAuthor) => {
  const errs = { title: '', author: '' };
  if (!currentTitle.trim()) {
    errs.title = 'Please enter a title';
  }
  if (!currentAuthor.trim()) {
    errs.author = 'Please enter an author';
  }
  return errs;
};
```
Furthermore, the `aria-describedby` references (`book-title-error` and `book-author-error`) and `role="alert"` were verified so screen readers announce these exact strings whenever validation triggers.
