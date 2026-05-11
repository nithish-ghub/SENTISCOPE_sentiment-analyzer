import React, { useState } from 'react';
import axios from 'axios';
import { Activity } from 'lucide-react';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';
import ReviewList from './components/ReviewList';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (url) => {
    setLoading(true);
    setError('');
    setData(null);
    
    try {
      // Assuming backend runs on 5000
      const response = await axios.post('http://localhost:5000/api/search', { url });
      
      // We also need to fetch the reviews, or backend can return them directly.
      // Wait, in app.py we saved them but didn't return them in the /api/search response.
      // Let's fetch them using the product_id.
      const productId = response.data.product.product_id;
      const reviewsResponse = await axios.get(`http://localhost:5000/api/products/${productId}/reviews`);
      
      setData(reviewsResponse.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'An error occurred while analyzing the product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              SentimentAnalyzer
            </h1>
          </div>
          <nav className="flex gap-4 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">History</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Understand Product <span className="text-indigo-600">Sentiment</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Instantly analyze customer reviews from Amazon and Flipkart. Get AI-powered insights to make better purchasing or business decisions.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center max-w-3xl mx-auto">
            {error}
          </div>
        )}

        {data && (
          <div className="mt-12">
            <Dashboard data={data} />
            <ReviewList reviews={data.reviews} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
