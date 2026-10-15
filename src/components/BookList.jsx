import BookCard from './BookCard';
import AddBookTile from './AddBookTile';

export default function BookList({
  books,
  totalBooksCount,
  searchQuery,
  statusFilter,
  activeNav,
  onResetFilters,
  onStatusChange,
  onDeleteBook,
  onOpenAddModal,
}) {
  const isSearching = Boolean(searchQuery && searchQuery.trim());
  const hasActiveFilter = statusFilter !== 'ALL' || (activeNav !== 'Library' && activeNav !== 'Home');

  // Compute section heading based on active filter or nav
  const getSectionTitle = () => {
    if (activeNav === 'Reading' || statusFilter === 'Reading') {
      return 'Currently Reading';
    }
    if (activeNav === 'Finished' || statusFilter === 'Finished') {
      return 'Finished Books';
    }
    if (statusFilter === 'To read') {
      return 'To Read Books';
    }
    return 'My Library';
  };

  return (
    <div className="main-library-area">
      {/* Header bar within main content */}
      <div className="library-title-row">
        <div className="library-heading-wrap">
          <div className="library-heading-with-count">
            <h1 className="library-main-heading">{getSectionTitle()}</h1>
            <span className="library-count-pill" aria-label={`${books.length} books visible`}>
              {books.length}
            </span>
          </div>
          <p className="library-main-subtext">
            {isSearching
              ? `Showing results matching "${searchQuery.trim()}" across your collection`
              : hasActiveFilter
              ? `Filtered view of your personal reading collection`
              : `Curate, organize, and track your reading journey`}
          </p>
        </div>

        <button
          type="button"
          className="btn-header-add"
          onClick={onOpenAddModal}
          aria-label="Add a new book"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Book</span>
        </button>
      </div>

      {/* Main Grid: Displays book cards followed by the Add New Book tile */}
      {books.length > 0 ? (
        <div className="dashboard-book-grid" role="feed" aria-label="Book collection grid">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onStatusChange={onStatusChange}
              onDeleteBook={onDeleteBook}
            />
          ))}

          {/* Add New Book Tile at the end of the grid */}
          <AddBookTile onOpenAddModal={onOpenAddModal} />
        </div>
      ) : totalBooksCount === 0 ? (
        /* Empty State: Empty Library */
        <div className="empty-state-card" role="region" aria-label="Empty library message">
          <div className="empty-state-illustration" aria-hidden="true">
            <svg
              className="empty-book-svg"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="25" y="20" width="70" height="85" rx="6" fill="#E5EEE5" />
              <rect x="29" y="16" width="70" height="85" rx="6" fill="#F4F8F4" stroke="#BCD9BC" strokeWidth="1.5" />
              <rect x="33" y="12" width="70" height="85" rx="6" fill="#FFFFFF" stroke="#E1E5E1" strokeWidth="1.5" />
              <line x1="45" y1="35" x2="85" y2="35" stroke="#17651D" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="45" y1="47" x2="75" y2="47" stroke="#747A76" strokeWidth="2" strokeLinecap="round" />
              <line x1="45" y1="59" x2="80" y2="59" stroke="#747A76" strokeWidth="2" strokeLinecap="round" />
              <circle cx="78" cy="80" r="10" fill="#EBF3EB" />
              <path d="M75 80l2 2 4-4" stroke="#17651D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="empty-state-title">Your library is waiting</h2>
          <p className="empty-state-desc">
            You haven&rsquo;t logged any books yet. Start your reading journal by recording the title in your hands or a novel on your wish list.
          </p>
          <button
            type="button"
            className="btn-primary empty-cta-btn"
            onClick={onOpenAddModal}
          >
            <svg
              className="btn-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add your first book</span>
          </button>
        </div>
      ) : (
        /* Empty State: Search or Filter returned no matches */
        <div className="empty-state-card empty-search-state" role="region" aria-label="No matching books found">
          <div className="empty-state-illustration" aria-hidden="true">
            <svg
              className="empty-search-svg"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="36" cy="36" r="22" fill="#EBF3EB" stroke="#17651D" strokeWidth="2" />
              <line x1="52" y1="52" x2="68" y2="68" stroke="#17651D" strokeWidth="3" strokeLinecap="round" />
              <path d="M30 36h12" stroke="#747A76" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="empty-state-title">No books found</h2>
          <p className="empty-state-desc">
            {isSearching
              ? `We couldn't find any titles or authors matching "${searchQuery.trim()}".`
              : `No books currently match the selected filter.`}
          </p>
          <button
            type="button"
            className="btn-secondary empty-cta-btn"
            onClick={onResetFilters}
            aria-label="Reset search filter and show all books"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
