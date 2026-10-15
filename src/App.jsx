import { useState, useMemo, useEffect, useRef } from 'react';
import LandingPage from './components/LandingPage';
import TopHeader from './components/TopHeader';
import Sidebar from './components/Sidebar';
import BookList from './components/BookList';
import AddBookModal from './components/AddBookModal';
import HelpModal from './components/HelpModal';
import { BOOK_STATUS, STORAGE_KEY } from './constants/books';
import { loadBooksFromStorage, saveBooksToStorage } from './utils/storage';
import './App.css';

function App() {
  // Safe synchronous initialization from localStorage prevents empty overwrites
  const [books, setBooks] = useState(() => loadBooksFromStorage());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeNav, setActiveNav] = useState('Library');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Landing page vs Library dashboard view state
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#/library') {
      return 'library';
    }
    return 'landing';
  });

  const isInitialMount = useRef(true);

  // Sync hash changes with currentView for browser forward/back buttons
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/library') {
        setCurrentView('library');
      } else if (
        window.location.hash === '#/' ||
        window.location.hash === '' ||
        !window.location.hash.startsWith('#/library')
      ) {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // View navigation handlers
  const handleOpenLibrary = () => {
    setCurrentView('library');
    if (typeof window !== 'undefined') {
      window.location.hash = '#/library';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoToLanding = () => {
    setCurrentView('landing');
    if (typeof window !== 'undefined') {
      window.location.hash = '#/';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
  const handleAddBook = ({ title, author, status, coverUrl }) => {
    const newBook = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `book-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: title.trim(),
      author: author.trim(),
      status: status || BOOK_STATUS.TO_READ,
      createdAt: Date.now(),
      ...(coverUrl && coverUrl.trim() ? { coverUrl: coverUrl.trim() } : {}),
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

  // Handle sidebar navigation selection
  const handleSelectNav = (navId) => {
    if (navId === 'Help') {
      setIsHelpModalOpen(true);
      return;
    }
    if (navId === 'Home') {
      handleGoToLanding();
      return;
    }
    setActiveNav(navId);
    if (navId === 'Library') {
      setStatusFilter('ALL');
    } else if (navId === 'Reading') {
      setStatusFilter(BOOK_STATUS.READING);
    } else if (navId === 'Finished') {
      setStatusFilter(BOOK_STATUS.FINISHED);
    }
  };

  // Handle filter dropdown change from header
  const handleStatusFilterChange = (newFilter) => {
    setStatusFilter(newFilter);
    if (newFilter === BOOK_STATUS.READING) {
      setActiveNav('Reading');
    } else if (newFilter === BOOK_STATUS.FINISHED) {
      setActiveNav('Finished');
    } else {
      setActiveNav('Library');
    }
  };

  // Reset all filters and search query
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setActiveNav('Library');
  };

  // Compute filtered books (combining search query and status filter)
  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return books.filter((book) => {
      // Status filter
      if (statusFilter !== 'ALL' && book.status !== statusFilter) {
        return false;
      }
      // Search query filter (title or author)
      if (query) {
        const matchTitle = book.title.toLowerCase().includes(query);
        const matchAuthor = book.author.toLowerCase().includes(query);
        if (!matchTitle && !matchAuthor) {
          return false;
        }
      }
      return true;
    });
  }, [books, searchQuery, statusFilter]);

  // Compute live reading statistics across the entire saved collection
  const stats = useMemo(() => {
    return {
      total: books.length,
      toRead: books.filter((b) => b.status === BOOK_STATUS.TO_READ).length,
      reading: books.filter((b) => b.status === BOOK_STATUS.READING).length,
      finished: books.filter((b) => b.status === BOOK_STATUS.FINISHED).length,
    };
  }, [books]);

  if (currentView === 'landing') {
    return <LandingPage onOpenLibrary={handleOpenLibrary} />;
  }

  return (
    <div className="chapter-dashboard-shell">
      {/* Top Navigation Header */}
      <TopHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        stats={stats}
        totalBooksCount={books.length}
        onGoToLanding={handleGoToLanding}
      />

      {/* Main Body: Fixed-width Sidebar + Pale Mint Library Content */}
      <div className="dashboard-body-layout">
        <Sidebar
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          stats={stats}
        />

        <main id="main-content" className="dashboard-main-content">
          <BookList
            books={filteredBooks}
            totalBooksCount={books.length}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            activeNav={activeNav}
            onClearSearch={() => setSearchQuery('')}
            onResetFilters={handleResetFilters}
            onStatusChange={handleStatusChange}
            onDeleteBook={handleDeleteBook}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        </main>
      </div>

      {/* Modals */}
      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBook={handleAddBook}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}

export default App;
