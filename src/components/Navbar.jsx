import React from 'react';

export default function Navbar({ totalSnippets }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="logo-icon">&lt;/&gt;</span>
        <span className="brand-name">CodePulse</span>
      </div>
      <div className="nav-links">
        <a href="#explore">Explore</a>
        <a href="#contribute">Add Snippet</a>
        <span className="snippet-counter">{totalSnippets} Snippets</span>
      </div>
    </nav>
  );
}
