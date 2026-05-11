import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function SearchBar({ onSearch, isLoading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Amazon or Flipkart product URL here..."
          className="w-full px-6 py-4 rounded-full border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none shadow-sm text-lg pr-32 transition-all duration-300"
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="absolute right-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-2.5 flex items-center gap-2 font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-3">
        Try pasting any product link to see sentiment insights instantly.
      </p>
    </div>
  );
}
