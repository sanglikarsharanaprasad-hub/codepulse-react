import React, { useState } from 'react';

export default function AddSnippetForm({ onAddSnippet }) {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [category, setCategory] = useState('Frontend');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length < 3 || code.trim().length < 10) {
      setError('Please provide a valid title (min 3 chars) and code snippet (min 10 chars).');
      return;
    }

    onAddSnippet({
      id: Date.now(),
      title: title.trim(),
      language,
      category,
      description: description.trim() || 'Custom user-submitted code snippet.',
      code: code.trim(),
      likes: 1,
    });

    setTitle('');
    setDescription('');
    setCode('');
    setError('');
  };

  return (
    <section id="contribute" className="form-section">
      <h2>Contribute a New Snippet</h2>
      <p>Add your reusable utility function or query to the live board.</p>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="snippet-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Snippet Title (e.g., QuickSort in C++)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="SQL">SQL</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Frontend">Frontend</option>
            <option value="Algorithms">Algorithms</option>
            <option value="Database">Database</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Short description of what this code does..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          rows="6"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">Publish Snippet</button>
      </form>
    </section>
  );
}
