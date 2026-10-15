import { useState } from 'react';
import { BOOK_STATUS, STATUS_OPTIONS } from '../constants/books';

export default function BookForm({ onAddBook, isModalMode = false }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [status, setStatus] = useState(BOOK_STATUS.TO_READ);
  const [touched, setTouched] = useState({ title: false, author: false, coverUrl: false });
  const [errors, setErrors] = useState({ title: '', author: '', coverUrl: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate cover URL uses HTTP/HTTPS and is well-formed
  const validateCoverUrl = (url) => {
    if (!url || !url.trim()) return ''; // Optional
    const trimmed = url.trim();
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return 'Please enter a valid HTTP or HTTPS image URL.';
      }
      return '';
    } catch {
      return 'Please enter a valid image URL.';
    }
  };

  const validate = (currentTitle, currentAuthor, currentCoverUrl) => {
    const errs = { title: '', author: '', coverUrl: '' };
    if (!currentTitle.trim()) {
      errs.title = 'Please enter a title';
    }
    if (!currentAuthor.trim()) {
      errs.author = 'Please enter an author';
    }
    if (currentCoverUrl && currentCoverUrl.trim()) {
      errs.coverUrl = validateCoverUrl(currentCoverUrl);
    }
    return errs;
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (touched.title) {
      setErrors((prev) => ({
        ...prev,
        title: val.trim() ? '' : 'Please enter a title',
      }));
    }
    if (isSuccess) setIsSuccess(false);
  };

  const handleAuthorChange = (e) => {
    const val = e.target.value;
    setAuthor(val);
    if (touched.author) {
      setErrors((prev) => ({
        ...prev,
        author: val.trim() ? '' : 'Please enter an author',
      }));
    }
    if (isSuccess) setIsSuccess(false);
  };

  const handleCoverUrlChange = (e) => {
    const val = e.target.value;
    setCoverUrl(val);
    if (touched.coverUrl) {
      setErrors((prev) => ({
        ...prev,
        coverUrl: validateCoverUrl(val),
      }));
    }
    if (isSuccess) setIsSuccess(false);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(title, author, coverUrl);
    setErrors(errs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, author: true, coverUrl: true });
    const errs = validate(title, author, coverUrl);
    setErrors(errs);

    if (errs.title || errs.author || errs.coverUrl) {
      return;
    }

    onAddBook({
      title: title.trim(),
      author: author.trim(),
      status,
      coverUrl: coverUrl.trim() ? coverUrl.trim() : undefined,
    });

    // Reset form
    setTitle('');
    setAuthor('');
    setCoverUrl('');
    setStatus(BOOK_STATUS.TO_READ);
    setTouched({ title: false, author: false, coverUrl: false });
    setErrors({ title: '', author: '', coverUrl: '' });
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3500);
  };

  return (
    <section className={`form-section ${isModalMode ? 'in-modal' : ''}`} aria-labelledby={!isModalMode ? 'form-heading' : undefined}>
      <div className={`form-card ${isModalMode ? 'modal-card' : ''}`}>
        {!isModalMode && (
          <div className="form-card-header">
            <div className="form-header-badge">
              <svg
                className="form-feather-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span>Log a New Title</span>
            </div>
            <h2 id="form-heading" className="form-title">
              Add to your reading shelf
            </h2>
            <p className="form-subtitle">
              Document what you have begun, what you are planning to read, or what you have completed.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="book-form">
          <div className="form-grid">
            {/* Title Field */}
            <div className={`form-group ${touched.title && errors.title ? 'has-error' : ''}`}>
              <label htmlFor="book-title" className="form-label">
                Book Title <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="book-title"
                  type="text"
                  className="form-input"
                  placeholder="e.g. The Remains of the Day"
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={() => handleBlur('title')}
                  aria-invalid={touched.title && !!errors.title}
                  aria-describedby={touched.title && errors.title ? 'book-title-error' : undefined}
                  required
                />
              </div>
              {touched.title && errors.title && (
                <p id="book-title-error" className="error-message" role="alert">
                  <svg className="error-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4.5zm0 7a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
                  </svg>
                  {errors.title}
                </p>
              )}
            </div>

            {/* Author Field */}
            <div className={`form-group ${touched.author && errors.author ? 'has-error' : ''}`}>
              <label htmlFor="book-author" className="form-label">
                Author <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="book-author"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Kazuo Ishiguro"
                  value={author}
                  onChange={handleAuthorChange}
                  onBlur={() => handleBlur('author')}
                  aria-invalid={touched.author && !!errors.author}
                  aria-describedby={touched.author && errors.author ? 'book-author-error' : undefined}
                  required
                />
              </div>
              {touched.author && errors.author && (
                <p id="book-author-error" className="error-message" role="alert">
                  <svg className="error-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4.5zm0 7a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
                  </svg>
                  {errors.author}
                </p>
              )}
            </div>

            {/* Optional Cover Image URL Field */}
            <div className={`form-group ${touched.coverUrl && errors.coverUrl ? 'has-error' : ''}`}>
              <label htmlFor="book-cover-url" className="form-label">
                Book Cover Image URL <span className="optional-tag">(Optional)</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="book-cover-url"
                  type="url"
                  className="form-input"
                  placeholder="e.g. https://example.com/cover.jpg"
                  value={coverUrl}
                  onChange={handleCoverUrlChange}
                  onBlur={() => handleBlur('coverUrl')}
                  aria-invalid={touched.coverUrl && !!errors.coverUrl}
                  aria-describedby={touched.coverUrl && errors.coverUrl ? 'book-cover-url-error' : 'book-cover-url-hint'}
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              {touched.coverUrl && errors.coverUrl ? (
                <p id="book-cover-url-error" className="error-message" role="alert">
                  <svg className="error-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4.5zm0 7a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
                  </svg>
                  {errors.coverUrl}
                </p>
              ) : (
                <span id="book-cover-url-hint" className="field-hint">
                  Direct link to image (.jpg, .png, .webp)
                </span>
              )}
            </div>

            {/* Status Field */}
            <div className="form-group">
              <label htmlFor="book-status" className="form-label">
                Initial Status
              </label>
              <div className="select-wrapper">
                <select
                  id="book-status"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="select-arrow" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <span className="field-hint">Defaults to &ldquo;To read&rdquo;</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
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
              <span>Add to Journal</span>
            </button>

            {isSuccess && (
              <div className="success-toast" role="status" aria-live="polite">
                <svg className="toast-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Book successfully added to your shelf</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
