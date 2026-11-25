import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SnippetCard from './components/SnippetCard';
import AddSnippetForm from './components/AddSnippetForm';
import Footer from './components/Footer';
import { supabase } from './supabaseClient';

export default function App() {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('snippets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching snippets:', error.message);
    } else {
      setSnippets(data || []);
    }
    setLoading(false);
  };

  const handleAddSnippet = async (newSnippet) => {
    const { data, error } = await supabase
      .from('snippets')
      .insert([
        {
          title: newSnippet.title,
          language: newSnippet.language,
          category: newSnippet.category,
          description: newSnippet.description,
          code: newSnippet.code,
          likes: 1,
        },
      ])
      .select();

    if (error) {
      console.error('Error adding snippet:', error.message);
    } else if (data && data.length > 0) {
      setSnippets([data[0], ...snippets]);
    }
  };

  const handleLike = async (id) => {
    const target = snippets.find((item) => item.id === id);
    if (!target) return;

    const updatedLikes = target.likes + 1;

    setSnippets(
      snippets.map((item) =>
        item.id === id ? { ...item, likes: updatedLikes } : item
      )
    );

    const { error } = await supabase
      .from('snippets')
      .update({ likes: updatedLikes })
      .eq('id', id);

    if (error) {
      console.error('Error updating likes:', error.message);
      fetchSnippets();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('snippets').delete().eq('id', id);

    if (error) {
      console.error('Error deleting snippet:', error.message);
    } else {
      setSnippets(snippets.filter((item) => item.id !== id));
    }
  };

  const filteredSnippets = snippets.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()));
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

        {loading ? (
          <div className="empty-state">Loading snippets from database...</div>
        ) : filteredSnippets.length === 0 ? (
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
