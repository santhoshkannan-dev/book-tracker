import { useState, useRef, useEffect } from 'react';
import { BOOK_STATUS } from '../constants/books';

export default function TopHeader({
  searchQuery,
  onSearchChange,
  onClearSearch,
  statusFilter,
  onStatusFilterChange,
  stats,
  totalBooksCount,
  onGoToLanding,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const filterRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFilterOpen(false);
        setIsNotifOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filterOptions = [
    { value: 'ALL', label: 'All Statuses' },
    { value: BOOK_STATUS.TO_READ, label: 'To read' },
    { value: BOOK_STATUS.READING, label: 'Reading' },
    { value: BOOK_STATUS.FINISHED, label: 'Finished' },
  ];

  return (
    <header className="top-header">
      <div className="header-inner">
        {/* Brand / Logo */}
        <button
          type="button"
          className="header-brand-btn"
          onClick={onGoToLanding}
          title="Return to Chapter Landing Page"
          aria-label="Return to Chapter Landing Page"
        >
          <div className="header-logo-badge" aria-hidden="true">
            <svg
              className="header-logo-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
          </div>
          <span className="header-brand-title">Chapter</span>
        </button>

        {/* Center: Long Pill-shaped Search & Filter */}
        <div className="header-search-group">
          <div className="header-search-bar">
            <label htmlFor="dashboard-search" className="sr-only">
              Search books by title or author
            </label>
            <span className="search-slot-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              id="dashboard-search"
              type="search"
              className="header-search-input"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape' && searchQuery) {
                  e.preventDefault();
                  onClearSearch();
                }
              }}
              autoComplete="off"
              spellCheck="false"
            />
            {searchQuery && (
              <button
                type="button"
                className="header-search-clear"
                onClick={onClearSearch}
                aria-label="Clear search"
                title="Clear search"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}
          </div>

          {/* Working Filter Button & Popover */}
          <div className="header-filter-wrapper" ref={filterRef}>
            <button
              type="button"
              className={`header-filter-btn ${statusFilter !== 'ALL' ? 'active-filter' : ''}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              aria-expanded={isFilterOpen}
              aria-haspopup="listbox"
              aria-label="Filter books by status"
            >
              <svg
                className="filter-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              <span className="filter-btn-label">
                {statusFilter === 'ALL' ? 'Filter' : statusFilter}
              </span>
            </button>

            {isFilterOpen && (
              <div className="filter-dropdown-menu" role="listbox" aria-label="Status filters">
                <div className="dropdown-header">Filter by Status</div>
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={statusFilter === opt.value}
                    className={`filter-option-item ${statusFilter === opt.value ? 'selected' : ''}`}
                    onClick={() => {
                      onStatusFilterChange(opt.value);
                      setIsFilterOpen(false);
                    }}
                  >
                    <span>{opt.label}</span>
                    {statusFilter === opt.value && (
                      <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Notifications Button & Popover */}
        <div className="header-actions" ref={notifRef}>
          <button
            type="button"
            className="header-landing-btn"
            onClick={onGoToLanding}
            title="Return to Chapter Landing Page"
            aria-label="Return to Chapter Landing Page"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="header-back-arrow" aria-hidden="true">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            <span className="landing-btn-text">Landing Page</span>
          </button>

          <button
            type="button"
            className="header-icon-btn notif-btn"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            aria-expanded={isNotifOpen}
            aria-label="View notifications and reading summary"
            title="Notifications"
          >
            <svg
              className="header-action-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {totalBooksCount > 0 && <span className="notif-badge-dot" aria-hidden="true"></span>}
          </button>

          {isNotifOpen && (
            <div className="notif-dropdown-menu" role="region" aria-label="Notifications panel">
              <div className="dropdown-header">Reading Overview</div>
              <div className="notif-content-list">
                <div className="notif-item">
                  <span className="notif-item-title">Total Shelf</span>
                  <span className="notif-item-value">{stats.total} {stats.total === 1 ? 'book' : 'books'} catalogued</span>
                </div>
                <div className="notif-item">
                  <span className="notif-item-title">Currently Open</span>
                  <span className="notif-item-value">{stats.reading} in progress</span>
                </div>
                <div className="notif-item">
                  <span className="notif-item-title">Completed</span>
                  <span className="notif-item-value">{stats.finished} finished</span>
                </div>
                <div className="notif-footer-note">
                  <span>✓ All changes safely synced to localStorage</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
