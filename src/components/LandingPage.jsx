import { useState, useEffect, useRef } from 'react';
import '../LandingPage.css';

export default function LandingPage({ onOpenLibrary }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef(null);

  // Reveal elements on scroll using Intersection Observer
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    if (!elementsToReveal.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    elementsToReveal.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="landing-page-shell">
      {/* 1. Header Navigation */}
      <header className="landing-navbar">
        <div className="landing-nav-inner">
          <div className="landing-brand">
            <div className="landing-logo-badge" aria-hidden="true">
              <img
                src="/chapter.avif"
                alt="Chapter"
                className="landing-logo-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.style.removeProperty('display');
                }}
              />
              <svg
                style={{ display: 'none' }}
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
            <span className="landing-brand-name">Chapter</span>
          </div>

          <nav className="landing-desktop-nav" aria-label="Landing Page Navigation">
            <ul className="landing-nav-links">
              <li>
                <a href="#concept" onClick={(e) => scrollToSection(e, 'concept')}>
                  The Concept
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>
                  Features
                </a>
              </li>
              <li>
                <a href="#preview" onClick={(e) => scrollToSection(e, 'preview')}>
                  Preview
                </a>
              </li>
            </ul>
            <button
              type="button"
              className="btn-primary landing-nav-cta"
              onClick={onOpenLibrary}
            >
              Open My Library
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="landing-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {isMobileMenuOpen && (
          <div className="landing-mobile-menu">
            <ul className="mobile-nav-links">
              <li>
                <a href="#concept" onClick={(e) => scrollToSection(e, 'concept')}>
                  The Concept
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>
                  Features
                </a>
              </li>
              <li>
                <a href="#preview" onClick={(e) => scrollToSection(e, 'preview')}>
                  Preview
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="btn-primary mobile-open-cta"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenLibrary();
                  }}
                >
                  Open My Library
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="landing-hero-section" aria-label="Introduction">
        <div className="landing-container hero-grid">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="hero-text-column">
            <div className="hero-eyebrow-badge animate-fade-in delay-1">
              <span className="eyebrow-accent-dot"></span>
              <span>Personal Reading Journal</span>
            </div>

            <h1 className="landing-hero-headline animate-fade-in delay-2">
              Every book begins a new chapter.
            </h1>

            <p className="landing-hero-copy animate-fade-in delay-3">
              A quieter, more thoughtful way to collect the stories you want to read, track your progress, and celebrate every finished page.
            </p>

            <div className="landing-hero-actions animate-fade-in delay-4">
              <button
                type="button"
                className="btn-primary hero-main-cta"
                onClick={onOpenLibrary}
              >
                <span>Open My Library</span>
                <svg viewBox="0 0 20 20" fill="currentColor" className="cta-arrow-icon" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </button>

              <a
                href="#features"
                className="btn-secondary-link"
                onClick={(e) => scrollToSection(e, 'features')}
              >
                Explore the Experience
              </a>
            </div>

            <div className="hero-guarantees animate-fade-in delay-5">
              <span>✦ Distraction-free</span>
              <span>✦ Local privacy</span>
              <span>✦ No algorithm feeds</span>
            </div>
          </div>

          {/* Right Column: Layered Overlapping Floating Book Covers */}
          <div className="hero-visual-column" aria-label="Visual showcase of books">
            <div className="layered-covers-stage">
              {/* Decorative Backdrop Glow */}
              <div className="stage-ambient-glow" aria-hidden="true"></div>

              {/* Book 1: Back Left */}
              <div
                className="hero-cover-wrap book-back-left"
                tabIndex="0"
                role="img"
                aria-label="Preview book cover for Klara and the Sun by Kazuo Ishiguro"
              >
                <div className="editorial-book-jacket">
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg"
                    alt="Klara and the Sun"
                    className="jacket-cover-image"
                  />
                  <div className="jacket-spine-crease"></div>
                  <div className="jacket-tag to-read-tag">To read</div>
                </div>
              </div>

              {/* Book 2: Center Front */}
              <div
                className="hero-cover-wrap book-center-front"
                tabIndex="0"
                role="img"
                aria-label="Preview book cover for Tomorrow, and Tomorrow, and Tomorrow by Gabrielle Zevin"
              >
                <div className="editorial-book-jacket">
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1636978687i/58784475.jpg"
                    alt="Tomorrow, and Tomorrow, and Tomorrow"
                    className="jacket-cover-image"
                  />
                  <div className="jacket-spine-crease"></div>
                  <div className="jacket-tag finished-tag">Finished ✓</div>
                </div>
              </div>

              {/* Book 3: Back Right */}
              <div
                className="hero-cover-wrap book-back-right"
                tabIndex="0"
                role="img"
                aria-label="Preview book cover for The Creative Act: A Way of Being by Rick Rubin"
              >
                <div className="editorial-book-jacket">
                  <img
                    src="https://m.media-amazon.com/images/I/918EkrTDaRL._AC_UF1000,1000_QL80_.jpg"
                    alt="The Creative Act"
                    className="jacket-cover-image"
                  />
                  <div className="jacket-spine-crease"></div>
                  <div className="jacket-tag reading-tag">Reading 📖</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Concept Section */}
      <section id="concept" className="landing-concept-section reveal-on-scroll">
        <div className="landing-container concept-inner">
          <div className="concept-quote-box">
            <span className="concept-eyebrow">The Philosophy</span>
            <blockquote className="concept-quote">
              &ldquo;Reading is an intimate dialogue with human thought. It deserves an environment unmarred by intrusive algorithms, social metrics, or endless distractions.&rdquo;
            </blockquote>
            <p className="concept-explanation">
              Chapter was created as a peaceful antidote to noisy digital trackers. It lives on your device, respects your rhythm, and gives your books the dignified shelf they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="landing-features-section reveal-on-scroll">
        <div className="landing-container">
          <div className="section-header-center">
            <span className="section-eyebrow">Key Features</span>
            <h2 className="section-title">Designed for readers, not algorithms.</h2>
            <p className="section-subtitle">
              Every detail is tailored to make collecting and tracking your books an effortless, calming experience.
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                  <path d="M6 6h10" />
                  <path d="M6 10h10" />
                  <line x1="12" y1="14" x2="16" y2="14" />
                </svg>
              </div>
              <h3 className="feature-title">Build Your Reading List</h3>
              <p className="feature-description">
                Catalogue the books you have in your hands or intend to read. Add titles, authors, and optional cover URLs with automatic fallbacks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="feature-title">Find Any Book</h3>
              <p className="feature-description">
                Search instantly across both title and author with case-insensitive matching and whitespace tolerance. Filters never alter your saved collection.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
              </div>
              <h3 className="feature-title">Track Your Progress</h3>
              <p className="feature-description">
                Mark books as <em>To read</em>, <em>Reading</em>, or <em>Finished</em> with one click. Real-time statistics automatically update your reading milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Library Preview Section */}
      <section id="preview" className="landing-preview-section reveal-on-scroll">
        <div className="landing-container">
          <div className="section-header-center">
            <span className="section-eyebrow">Interactive Preview</span>
            <h2 className="section-title">A look inside your personal shelf.</h2>
            <p className="section-subtitle">
              Clean dashboard view with pale-mint canvas, cover art, and quick status controls.
            </p>
          </div>

          <div className="preview-interface-card">
            <div className="preview-disclaimer-badge">
              <span>Illustrative preview only &bull; Your real library is safely saved locally</span>
            </div>

            {/* Simulated mini dashboard top bar */}
            <div className="preview-top-bar">
              <div className="preview-bar-left">
                <span className="preview-dot dot-red"></span>
                <span className="preview-dot dot-yellow"></span>
                <span className="preview-dot dot-green"></span>
                <span className="preview-bar-title">My Library (3 books)</span>
              </div>
              <button
                type="button"
                className="btn-primary preview-launch-btn"
                onClick={onOpenLibrary}
              >
                Launch Your Real Library &rarr;
              </button>
            </div>

            {/* Simulated mini cards */}
            <div className="preview-cards-grid">
              <div className="preview-mini-card">
                <div className="mini-cover-thumbnail">
                  <img
                    src="https://m.media-amazon.com/images/I/918EkrTDaRL._AC_UF1000,1000_QL80_.jpg"
                    alt="The Creative Act"
                    className="preview-mini-cover-img"
                  />
                </div>
                <div className="mini-meta">
                  <span className="mini-book-name">The Creative Act</span>
                  <span className="mini-book-author">Rick Rubin</span>
                  <span className="mini-status status-reading">Reading</span>
                </div>
              </div>

              <div className="preview-mini-card">
                <div className="mini-cover-thumbnail">
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1636978687i/58784475.jpg"
                    alt="Tomorrow, and Tomorrow, and Tomorrow"
                    className="preview-mini-cover-img"
                  />
                </div>
                <div className="mini-meta">
                  <span className="mini-book-name">Tomorrow, and Tomorrow...</span>
                  <span className="mini-book-author">Gabrielle Zevin</span>
                  <span className="mini-status status-finished">Finished</span>
                </div>
              </div>

              <div className="preview-mini-card">
                <div className="mini-cover-thumbnail">
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg"
                    alt="Klara and the Sun"
                    className="preview-mini-cover-img"
                  />
                </div>
                <div className="mini-meta">
                  <span className="mini-book-name">Klara and the Sun</span>
                  <span className="mini-book-author">Kazuo Ishiguro</span>
                  <span className="mini-status status-to-read">To read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <section className="landing-final-cta-section reveal-on-scroll">
        <div className="landing-container">
          <div className="final-cta-card">
            <div className="final-cta-content">
              <h2 className="final-cta-heading">Your next favorite book is waiting.</h2>
              <p className="final-cta-copy">
                Open Chapter now to log what is in your hands, organize what comes next, and savor every page.
              </p>
              <button
                type="button"
                className="btn-primary final-open-btn"
                onClick={onOpenLibrary}
              >
                <span>Open My Library</span>
                <svg viewBox="0 0 20 20" fill="currentColor" className="cta-arrow-icon" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="landing-footer">
        <div className="landing-container footer-content-grid">
          {/* Brand Column */}
          <div className="footer-col footer-col-brand">
            <div className="landing-brand">
              <div className="landing-logo-badge" aria-hidden="true">
                <img
                  src="/chapter.avif"
                  alt="Chapter"
                  className="landing-logo-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.style.removeProperty('display');
                  }}
                />
                <svg
                  style={{ display: 'none' }}
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
              <span className="landing-brand-name">Chapter</span>
            </div>
            <p className="footer-tagline">
              Your personal reading journal. Designed for quiet literary focus, mindful reading habits, and private book cataloguing.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-list">
              <li>
                <a href="#concept" onClick={(e) => scrollToSection(e, 'concept')}>
                  The Concept
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>
                  Key Features
                </a>
              </li>
              <li>
                <a href="#preview" onClick={(e) => scrollToSection(e, 'preview')}>
                  Interactive Preview
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-action-btn"
                  onClick={onOpenLibrary}
                >
                  Open My Library &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Creator & Links Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Created By</h4>
            <div className="footer-author-info">
              <p className="footer-author-name">Santhosh Kannan</p>
              <p className="footer-author-role">Software Developer</p>
            </div>
            <div className="footer-social-links">
              <a
                href="https://www.santhoshkannan.codes"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Santhosh Kannan's Portfolio"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>Portfolio</span>
              </a>
              <a
                href="https://www.linkedin.com/in/santhosh-kannan-r/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Santhosh Kannan's LinkedIn Profile"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="footer-icon">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62Z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/santhoshkannan-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Santhosh Kannan's GitHub Profile"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="footer-icon">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="landing-container footer-bottom-flex">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Chapter. Designed &amp; developed by <strong>Santhosh Kannan</strong>.
            </p>
            <p className="footer-sub-note">
              Distraction-free &bull; Local-first storage &bull; Built with React &amp; Vite
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
