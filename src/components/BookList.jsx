import BookCard from './BookCard';
import SearchBar from './SearchBar';

export default function BookList({
  books,
  totalBooksCount,
  searchQuery,
  onSearchChange,
  onClearSearch,
  onStatusChange,
  onDeleteBook,
  onFocusAddForm,
}) {
  const isSearching = Boolean(searchQuery && searchQuery.trim());

  return (
    <section className="library-section" aria-labelledby="library-heading">
      <div className="library-header-row">
        <div className="library-title-group">
          <div className="library-title-wrap">
            <h2 id="library-heading" className="library-heading">
              Your Library
            </h2>
            <span className="library-count-badge" aria-label={`${totalBooksCount} total books in shelf`}>
              {totalBooksCount} {totalBooksCount === 1 ? 'book' : 'books'}
            </span>
          </div>
          <p className="library-subtext">
            {isSearching
              ? `Showing ${books.length} of ${totalBooksCount} titles matching "${searchQuery.trim()}"`
              : 'Chronological catalogue of your reading collection'}
          </p>
        </div>

        <div className="library-search-area">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onClear={onClearSearch}
          />
        </div>
      </div>

      {books.length > 0 ? (
        <div className="book-cards-grid" role="feed" aria-busy="false" aria-label="Book collection list">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onStatusChange={onStatusChange}
              onDeleteBook={onDeleteBook}
            />
          ))}
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
              <rect x="25" y="20" width="70" height="85" rx="6" fill="var(--color-sage)" />
              <rect x="29" y="16" width="70" height="85" rx="6" fill="var(--color-gold-subtle)" stroke="var(--color-gold)" strokeWidth="1.5" />
              <rect x="33" y="12" width="70" height="85" rx="6" fill="#FFFFFF" stroke="var(--color-sage-border)" strokeWidth="1.5" />
              <line x1="45" y1="35" x2="85" y2="35" stroke="var(--color-forest)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="45" y1="47" x2="75" y2="47" stroke="var(--color-charcoal-light)" strokeWidth="2" strokeLinecap="round" />
              <line x1="45" y1="59" x2="80" y2="59" stroke="var(--color-charcoal-light)" strokeWidth="2" strokeLinecap="round" />
              <line x1="45" y1="71" x2="65" y2="71" stroke="var(--color-charcoal-light)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="78" cy="80" r="10" fill="var(--color-forest-subtle)" />
              <path d="M75 80l2 2 4-4" stroke="var(--color-forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="empty-state-title">Your shelf is quiet</h3>
          <p className="empty-state-desc">
            You haven&rsquo;t logged any books yet. Start your reading journal by recording the title in your hands or a novel you hope to begin.
          </p>
          <button
            type="button"
            className="btn-primary empty-cta-btn"
            onClick={onFocusAddForm}
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
        /* Empty State: Search yielded no matches */
        <div className="empty-state-card empty-search-state" role="region" aria-label="No matching books found">
          <div className="empty-state-illustration" aria-hidden="true">
            <svg
              className="empty-search-svg"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="36" cy="36" r="22" fill="var(--color-forest-subtle)" stroke="var(--color-forest)" strokeWidth="2" />
              <line x1="52" y1="52" x2="68" y2="68" stroke="var(--color-forest)" strokeWidth="3" strokeLinecap="round" />
              <path d="M30 36h12" stroke="var(--color-charcoal-muted)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="empty-state-title">No books match your query</h3>
          <p className="empty-state-desc">
            We couldn&rsquo;t find any titles or authors containing &ldquo;{searchQuery.trim()}&rdquo;. Check for spelling or reset the filter.
          </p>
          <button
            type="button"
            className="btn-secondary empty-cta-btn"
            onClick={onClearSearch}
          >
            Clear search filter
          </button>
        </div>
      )}
    </section>
  );
}
