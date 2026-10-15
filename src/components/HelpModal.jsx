import { useEffect } from 'react';

export default function HelpModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-container help-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-title"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="help-modal-title" className="modal-title">
              Chapter Guide &amp; Tips
            </h2>
            <p className="modal-subtitle">How to make the most of your personal reading journal.</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close help modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="help-modal-body">
          <div className="help-tip-card">
            <h3>📖 Cataloguing Books</h3>
            <p>Click the <strong>Add New Book</strong> tile or header button. Provide a title, author, and initial status (defaults to <em>To read</em>).</p>
          </div>

          <div className="help-tip-card">
            <h3>🔄 Tracking Reading Status</h3>
            <p>Use the status selector on any book card to seamlessly transition titles between <strong>To read</strong>, <strong>Reading</strong>, and <strong>Finished</strong>.</p>
          </div>

          <div className="help-tip-card">
            <h3>🔍 Instant Search &amp; Filter</h3>
            <p>Search by author or title right in the top bar. Use the <strong>Filter</strong> button to view specific reading stages.</p>
          </div>

          <div className="help-tip-card">
            <h3>💾 Local Storage &amp; Privacy</h3>
            <p>All your books and updates are saved automatically to your browser&rsquo;s local storage. No tracking, accounts, or external databases.</p>
          </div>
        </div>

        <div className="help-modal-footer">
          <button type="button" className="btn-primary" onClick={onClose}>
            Got it, return to library
          </button>
        </div>
      </div>
    </div>
  );
}
