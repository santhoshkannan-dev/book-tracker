export default function StatsCards({ stats }) {
  const { total = 0, toRead = 0, reading = 0, finished = 0 } = stats || {};

  const statItems = [
    {
      id: 'stat-all',
      label: 'All Books',
      count: total,
      meta: 'In your shelf',
      badgeClass: 'badge-all',
      dotColor: 'var(--color-charcoal-muted)',
    },
    {
      id: 'stat-to-read',
      label: 'To Read',
      count: toRead,
      meta: 'Awaiting discovery',
      badgeClass: 'badge-to-read',
      dotColor: 'var(--color-gold)',
    },
    {
      id: 'stat-reading',
      label: 'Reading',
      count: reading,
      meta: 'Currently open',
      badgeClass: 'badge-reading',
      dotColor: 'var(--color-forest)',
    },
    {
      id: 'stat-finished',
      label: 'Finished',
      count: finished,
      meta: 'Completed journey',
      badgeClass: 'badge-finished',
      dotColor: 'var(--color-charcoal)',
    },
  ];

  return (
    <section className="stats-section" aria-label="Reading Statistics">
      <div className="stats-grid">
        {statItems.map((item) => (
          <div key={item.id} className={`stat-card ${item.badgeClass}`}>
            <div className="stat-card-header">
              <span className="stat-dot" style={{ backgroundColor: item.dotColor }} aria-hidden="true"></span>
              <span className="stat-label">{item.label}</span>
            </div>
            <div className="stat-number">{item.count}</div>
            <div className="stat-meta">{item.meta}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
