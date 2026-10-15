import { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { BOOK_STATUS, STORAGE_KEY } from './constants/books';
import { loadBooksFromStorage, saveBooksToStorage } from './utils/storage';
import './App.css';

function App() {
  // Safe synchronous initialization from localStorage prevents empty overwrites
  const [books, setBooks] = useState(() => loadBooksFromStorage());
  const [searchQuery, setSearchQuery] = useState('');
  const isInitialMount = useRef(true);

  // Persist collection on changes (add, status change, delete)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // If storage was empty on first launch, write the initial sample dataset
      if (typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem(STORAGE_KEY) === null) {
        saveBooksToStorage(books);
      }
      return;
    }
    saveBooksToStorage(books);
  }, [books]);

  // Handle adding a book
  const handleAddBook = ({ title, author, status }) => {
    const newBook = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `book-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: title.trim(),
      author: author.trim(),
      status: status || BOOK_STATUS.TO_READ,
      createdAt: Date.now(),
    };

    // Prepend to display newest first
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  // Handle status update
  const handleStatusChange = (bookId, newStatus) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, status: newStatus } : book
      )
    );
  };

  // Handle deletion
  const handleDeleteBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  // Compute filtered books (case-insensitive, trimming whitespace)
  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return books;
    }
    return books.filter((book) => {
      const matchTitle = book.title.toLowerCase().includes(query);
      const matchAuthor = book.author.toLowerCase().includes(query);
      return matchTitle || matchAuthor;
    });
  }, [books, searchQuery]);

  // Compute live reading statistics
  const stats = useMemo(() => {
    return {
      total: books.length,
      toRead: books.filter((b) => b.status === BOOK_STATUS.TO_READ).length,
      reading: books.filter((b) => b.status === BOOK_STATUS.READING).length,
      finished: books.filter((b) => b.status === BOOK_STATUS.FINISHED).length,
    };
  }, [books]);

  // Focus helper for CTA buttons
  const handleFocusAddForm = () => {
    const titleInput = document.getElementById('book-title');
    if (titleInput) {
      titleInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      titleInput.focus();
    }
  };

  return (
    <div className="chapter-app-shell">
      <div className="chapter-container">
        <Header />

        <main id="main-content" className="chapter-main-flow">
          <StatsCards stats={stats} />

          <BookForm onAddBook={handleAddBook} />

          <BookList
            books={filteredBooks}
            totalBooksCount={books.length}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={() => setSearchQuery('')}
            onStatusChange={handleStatusChange}
            onDeleteBook={handleDeleteBook}
            onFocusAddForm={handleFocusAddForm}
          />
        </main>

        <footer className="chapter-footer">
          <div className="footer-inner">
            <p className="footer-copyright">
              Chapter &mdash; Personal Book Tracker. Crafted with care and literary calm.
            </p>
            <p className="footer-note">
              Designed for mindful reading rhythms.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
