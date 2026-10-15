export default function AddBookTile({ onOpenAddModal }) {
  return (
    <button
      type="button"
      className="add-book-tile"
      onClick={onOpenAddModal}
      aria-label="Open dialog to add a new book to your library"
    >
      <div className="add-tile-cover-area">
        <div className="add-plus-circle" aria-hidden="true">
          <svg
            className="add-plus-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>
      <div className="add-tile-meta">
        <span className="add-tile-title">Add New Book</span>
        <span className="add-tile-subtitle">Add title &amp; author</span>
      </div>
    </button>
  );
}
