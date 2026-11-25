import React, { useState } from 'react';

export default function SnippetCard({ snippet, onLike, onDelete }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="snippet-card">
      <div className="card-header">
        <div>
          <span className="badge lang-badge">{snippet.language}</span>
          <span className="badge cat-badge">{snippet.category}</span>
        </div>
        <button className="delete-btn" onClick={() => onDelete(snippet.id)} title="Delete snippet">
          &times;
        </button>
      </div>

      <h3>{snippet.title}</h3>
      <p className="card-desc">{snippet.description}</p>

      <pre className="code-block">
        <code>{snippet.code}</code>
      </pre>

      <div className="card-footer">
        <button className="like-btn" onClick={() => onLike(snippet.id)}>
          ▲ Upvote ({snippet.likes})
        </button>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
    </article>
  );
}
