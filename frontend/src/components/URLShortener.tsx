import React, { useState } from 'react';
import { createShortURL } from '../services/api';
import './URLShortener.css';

interface URLShortenerProps {
  onURLCreated: () => void;
}

const URLShortener: React.FC<URLShortenerProps> = ({ onURLCreated }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidURL(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setLoading(true);
    try {
      await createShortURL(url);
      setUrl('');
      onURLCreated();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="url-shortener-container">
      <div className="url-shortener-hero">
        <h2>Simplify your URL</h2>
        <form onSubmit={handleSubmit} className="url-form">
          <div className="input-group">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your original URL, eg. http://demos.netleanine.net/URLShortener/"
              className="url-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="shorten-button"
              disabled={loading}
            >
              {loading ? 'Shortening...' : (
                <>
                  <span>🔗</span>
                  <span>Shorten URL</span>
                </>
              )}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <p className="helper-text">
            All the Shorted URL and their analytics are public
          </p>
        </form>
      </div>
    </div>
  );
};

export default URLShortener;
