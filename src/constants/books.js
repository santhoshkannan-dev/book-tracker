export const BOOK_STATUS = {
  TO_READ: 'To read',
  READING: 'Reading',
  FINISHED: 'Finished',
};

export const STORAGE_KEY = 'chapter-books';

export const STATUS_OPTIONS = [
  BOOK_STATUS.TO_READ,
  BOOK_STATUS.READING,
  BOOK_STATUS.FINISHED,
];

export const INITIAL_SAMPLE_BOOKS = [
  {
    id: 'sample-book-1',
    title: 'The Creative Act: A Way of Being',
    author: 'Rick Rubin',
    status: BOOK_STATUS.READING,
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: 'sample-book-2',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    status: BOOK_STATUS.FINISHED,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
  },
  {
    id: 'sample-book-3',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    status: BOOK_STATUS.TO_READ,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days ago
  },
];
