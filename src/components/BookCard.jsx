import { useState } from 'react';
import { BOOK_STATUS, STATUS_OPTIONS } from '../constants/books';
import BookCover from './BookCover';

export default function BookCard({ book, onStatusChange, onDeleteBook }) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const getStatusClass = (status) => {
    switch (status) {
      case BOOK_STATUS.READING:
        return 'status-reading';
      case BOOK_STATUS.FINISHED:
        return 'status-finished';
      case BOOK_STATUS.TO_READ:
      default:
        return 'status-to-read';
    }
  };

  const handleStatusSelect = (e) => {
    onStatusChange(book.id, e.target.value);
  };

  const handleConfirmDelete = () => {
    onDeleteBook(book.id);
    setIsConfirmingDelete(false);
  };

  return (
    <article className="dashboard-book-card" aria-labelledby={`book-title-${book.id}`}>
      {/* a & b: Large pale green rectangular cover area with centered book cover */}
      <div className="card-cover-frame">
        <BookCover title={book.title} author={book.author} coverUrl={book.coverUrl} />
      </div>

      {/* Card Details below the cover */}
      <div className="card-details">
        <div className="card-heading-group">
          <h3 id={`book-title-${book.id}`} className="card-book-title" title={book.title}>
            {book.title}
          </h3>
          <p className="card-book-author" title={book.author}>
            {book.author}
          </p>
        </div>

        {/* Status Control & Delete Action */}
        <div className="card-footer-actions">
          <div className="status-control-container">
            <label htmlFor={`status-select-${book.id}`} className="sr-only">
              Change reading status for {book.title}
            </label>
            <div className={`card-status-pill-wrap ${getStatusClass(book.status)}`}>
              <select
                id={`status-select-${book.id}`}
                className="card-status-dropdown"
                value={book.status}
                onChange={handleStatusSelect}
                aria-label={`Update reading status for ${book.title}`}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="status-select-arrow" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="card-delete-container">
            {!isConfirmingDelete ? (
              <button
                type="button"
                className="btn-card-delete"
                onClick={() => setIsConfirmingDelete(true)}
                aria-label={`Delete "${book.title}" from library`}
                title="Delete book"
              >
                <svg
                  className="delete-card-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            ) : (
              <div
                className="delete-confirm-popover"
                role="alert"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    e.stopPropagation();
                    setIsConfirmingDelete(false);
                  }
                }}
              >
                <span className="confirm-popover-text">Delete?</span>
                <button
                  type="button"
                  className="btn-confirm-mini"
                  onClick={handleConfirmDelete}
                  aria-label={`Confirm deletion of ${book.title}`}
                  autoFocus
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn-cancel-mini"
                  onClick={() => setIsConfirmingDelete(false)}
                  aria-label="Cancel deletion"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
