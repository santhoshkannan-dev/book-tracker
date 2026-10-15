import { BOOK_STATUS, STATUS_OPTIONS, STORAGE_KEY, INITIAL_SAMPLE_BOOKS } from '../constants/books';

/**
 * Validates whether an item loaded from storage possesses the required structure of a book.
 * @param {unknown} item
 * @returns {boolean}
 */
export function isValidBook(item) {
  if (!item || typeof item !== 'object') return false;
  if (typeof item.id !== 'string' || !item.id.trim()) return false;
  if (typeof item.title !== 'string' || !item.title.trim()) return false;
  if (typeof item.author !== 'string' || !item.author.trim()) return false;
  return true;
}

/**
 * Sanitizes book fields to prevent corrupt values from propagating into state.
 * @param {any} item
 * @returns {object}
 */
export function sanitizeBook(item) {
  const validStatus = STATUS_OPTIONS.includes(item.status) ? item.status : BOOK_STATUS.TO_READ;
  const validCreatedAt = typeof item.createdAt === 'number' && !Number.isNaN(item.createdAt)
    ? item.createdAt
    : Date.now();

  return {
    id: String(item.id),
    title: String(item.title).trim(),
    author: String(item.author).trim(),
    status: validStatus,
    createdAt: validCreatedAt,
  };
}

/**
 * Safely retrieves books from localStorage.
 * Handles missing key, malformed JSON, and storage permission exceptions.
 * @returns {Array} List of validated book objects, sorted newest first
 */
export function loadBooksFromStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [...INITIAL_SAMPLE_BOOKS].sort((a, b) => b.createdAt - a.createdAt);
  }

  try {
    const rawData = window.localStorage.getItem(STORAGE_KEY);
    if (rawData === null) {
      // First visit: provide initial curated books
      return [...INITIAL_SAMPLE_BOOKS].sort((a, b) => b.createdAt - a.createdAt);
    }

    const parsed = JSON.parse(rawData);
    if (!Array.isArray(parsed)) {
      console.warn('[Chapter Storage] Stored data is not an array. Falling back.');
      return [...INITIAL_SAMPLE_BOOKS].sort((a, b) => b.createdAt - a.createdAt);
    }

    // Validate and sanitize each entry
    const validBooks = parsed.filter(isValidBook).map(sanitizeBook);

    // Ensure newest first by createdAt
    return validBooks.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('[Chapter Storage] Error reading or parsing localStorage:', error);
    return [...INITIAL_SAMPLE_BOOKS].sort((a, b) => b.createdAt - a.createdAt);
  }
}

/**
 * Safely persists books to localStorage.
 * @param {Array} books
 * @returns {boolean} True if successfully written, false otherwise
 */
export function saveBooksToStorage(books) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    return true;
  } catch (error) {
    console.error('[Chapter Storage] Failed to write books to localStorage:', error);
    return false;
  }
}
