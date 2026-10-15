export default function Header() {
  return (
    <header className="chapter-header">
      <nav className="chapter-nav" aria-label="Main Navigation">
        <div className="chapter-brand">
          <div className="brand-icon-wrapper" aria-hidden="true">
            <svg
              className="brand-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
              <path d="M6 14h6" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">Chapter</span>
            <span className="brand-subtitle">Your personal reading journal</span>
          </div>
        </div>
        <div className="nav-accent-badge">
          <span className="accent-dot"></span>
          <span>Reading Journal</span>
        </div>
      </nav>

      <section className="chapter-hero">
        <div className="hero-content">
          <span className="hero-eyebrow">A sanctuary for pages & thoughts</span>
          <h1 className="hero-heading">A little more reading, a little more you.</h1>
          <p className="hero-subtext">
            Curate your shelf, track your everyday rhythm, and celebrate every finished page in one thoughtful space.
          </p>
        </div>
      </section>
    </header>
  );
}
