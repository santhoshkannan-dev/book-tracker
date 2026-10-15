import { useEffect, useRef } from 'react';
import BookForm from './BookForm';

export default function AddBookModal({ isOpen, onClose, onAddBook }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Focus input
    const timer = setTimeout(() => {
      const input = document.getElementById('book-title');
      if (input) input.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBookAdded = (bookData) => {
    onAddBook(bookData);
    // Give user a brief moment to see success toast or close
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-container"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-add-title"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="modal-add-title" className="modal-title">
              Add New Book
            </h2>
            <p className="modal-subtitle">Log a new title to your personal collection.</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close add book modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <BookForm onAddBook={handleBookAdded} isModalMode={true} />
        </div>
      </div>
    </div>
  );
}
