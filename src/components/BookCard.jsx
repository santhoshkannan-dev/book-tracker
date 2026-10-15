import { useState } from 'react';
import { BOOK_STATUS, STATUS_OPTIONS } from '../constants/books';

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

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently added';
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recently added';
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
    <article className={`book-card ${getStatusClass(book.status)}`} aria-labelledby={`book-title-${book.id}`}>
      <div className="book-card-main">
        <div className="book-card-top">
          <div className="book-status-pill">
            <span className="status-indicator-dot" aria-hidden="true"></span>
            <span className="status-pill-text">{book.status}</span>
          </div>
          <span className="book-date" title={`Logged on ${new Date(book.createdAt).toLocaleString()}`}>
            {formatDate(book.createdAt)}
          </span>
        </div>

        <div className="book-info">
          <h3 id={`book-title-${book.id}`} className="book-title">
            {book.title}
          </h3>
          <p className="book-author">
            <span className="by-label">by</span> {book.author}
          </p>
        </div>
      </div>

      <div className="book-card-footer">
        <div className="status-control-group">
          <label htmlFor={`status-select-${book.id}`} className="status-control-label">
            Change status:
          </label>
          <div className="card-select-wrapper">
            <select
              id={`status-select-${book.id}`}
              className="card-status-select"
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
            <div className="select-mini-arrow" aria-hidden="true">
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

        <div className="book-actions">
          {!isConfirmingDelete ? (
            <button
              type="button"
              className="btn-delete"
              onClick={() => setIsConfirmingDelete(true)}
              aria-label={`Delete "${book.title}" from library`}
              title="Remove book"
            >
              <svg
                className="delete-icon"
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
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              <span>Delete</span>
            </button>
          ) : (
            <div className="delete-confirm-box" role="alert">
              <span className="confirm-text">Remove book?</span>
              <div className="confirm-buttons">
                <button
                  type="button"
                  className="btn-confirm-delete"
                  onClick={handleConfirmDelete}
                  aria-label={`Confirm deletion of ${book.title}`}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn-cancel-delete"
                  onClick={() => setIsConfirmingDelete(false)}
                  aria-label="Cancel deletion"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
