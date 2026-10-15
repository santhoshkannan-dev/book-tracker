export default function BookCover({ title, author, coverUrl }) {
  // Generate a consistent cover accent based on the title string
  const getCoverHue = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const palettes = [
      { bg: '#254B3B', text: '#F6F3EC', spine: '#1B372B' }, // Forest
      { bg: '#3D5A45', text: '#FAF5EB', spine: '#2D4433' }, // Sage moss
      { bg: '#4A5B4E', text: '#F4F7F4', spine: '#354338' }, // Slate olive
      { bg: '#2B3E36', text: '#FDFBEE', spine: '#1C2924' }, // Deep juniper
      { bg: '#546A5D', text: '#FFFFFF', spine: '#3D4F44' }, // Muted pine
    ];
    const index = Math.abs(hash) % palettes.length;
    return palettes[index];
  };

  const palette = getCoverHue(title || 'Book');

  return (
    <div className="book-cover-container" aria-hidden="true">
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={`Cover of ${title}`}
          className="book-cover-image"
          loading="lazy"
          onError={(e) => {
            // Fallback gracefully on image load error
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div
          className="book-cover-art"
          style={{
            backgroundColor: palette.bg,
            color: palette.text,
            boxShadow: `inset 3px 0 0 ${palette.spine}, 0 6px 14px -3px rgba(23, 26, 23, 0.25)`,
          }}
        >
          <div className="cover-spine-crease"></div>
          <div className="cover-content">
            <div className="cover-ornament">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
            </div>
            <div className="cover-title-text">{title}</div>
            <div className="cover-author-text">{author}</div>
          </div>
        </div>
      )}
    </div>
  );
}
