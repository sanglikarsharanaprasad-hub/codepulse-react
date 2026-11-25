import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SnippetCard from './components/SnippetCard';
import AddSnippetForm from './components/AddSnippetForm';
import Footer from './components/Footer';
import { initialSnippets } from './data/initialSnippets';

export default function App() {
  const [snippets, setSnippets] = useState(initialSnippets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAddSnippet = (newSnippet) => {
    setSnippets([newSnippet, ...snippets]);
  };

  const handleLike = (id) => {
    setSnippets(
      snippets.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleDelete = (id) => {
    setSnippets(snippets.filter((item) => item.id !== id));
  };

  const filteredSnippets = snippets.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-wrapper">
      <Navbar totalSnippets={snippets.length} />

      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main id="explore" className="main-container">
        <div className="section-header">
          <h2>Available Snippets ({filteredSnippets.length})</h2>
        </div>

        {filteredSnippets.length === 0 ? (
          <div className="empty-state">
            No snippets match your current filter. Try clearing your search or adding a new snippet below!
          </div>
        ) : (
          <div className="snippets-grid">
            {filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onLike={handleLike}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <AddSnippetForm onAddSnippet={handleAddSnippet} />
      </main>

      <Footer />
    </div>
  );
}
