import React from 'react';

export default function Hero({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  const categories = ['All', 'Frontend', 'Algorithms', 'Database'];

  return (
    <header className="hero">
      <h1>Organize, Share &amp; Discover Clean Code</h1>
      <p>A curated developer repository for reusable hooks, SQL queries, and algorithmic patterns.</p>

      <div className="search-controls">
        <input
          type="text"
          placeholder="Search snippets by title, language, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <div className="filter-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
