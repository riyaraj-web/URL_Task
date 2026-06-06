import React, { useState } from 'react';
import { URL, getShortURL } from '../services/api';
import './URLTable.css';

interface URLTableProps {
  urls: URL[];
  onViewAnalytics: (urlId: number) => void;
}

const URLTable: React.FC<URLTableProps> = ({ urls, onViewAnalytics }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(urls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUrls = urls.slice(startIndex, endIndex);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${dayOfWeek} ${day}${suffix} ${month}, ${year}`;
  };

  const handleCopy = async (shortCode: string, id: number) => {
    const shortUrl = getShortURL(shortCode);
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOpenShortUrl = (shortCode: string) => {
    const shortUrl = getShortURL(shortCode);
    window.open(shortUrl, '_blank');
  };

  const truncateUrl = (url: string, maxLength: number = 50): string => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  return (
    <div className="url-table-container">
      <h2 className="table-title">Recent URLs</h2>
      
      <div className="table-wrapper">
        <table className="url-table">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Created</th>
              <th>Clicks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUrls.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-state">
                  No URLs yet. Create your first shortened URL above!
                </td>
              </tr>
            ) : (
              currentUrls.map((url) => (
                <tr key={url.id}>
                  <td className="original-url" title={url.originalUrl}>
                    <a 
                      href={url.originalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {truncateUrl(url.originalUrl)}
                    </a>
                  </td>
                  <td className="short-url">
                    <code>{url.shortCode}</code>
                  </td>
                  <td>{formatDate(url.createdAt)}</td>
                  <td className="click-count">
                    <span className="badge">{url.clickCount}</span>
                  </td>
                  <td className="actions">
                    <button
                      className="action-button copy-button"
                      onClick={() => handleCopy(url.shortCode, url.id)}
                      title="Copy short URL"
                    >
                      {copiedId === url.id ? '✓' : '📋'}
                    </button>
                    <button
                      className="action-button info-button"
                      onClick={() => handleOpenShortUrl(url.shortCode)}
                      title="Open short URL"
                    >
                      🔗
                    </button>
                    <button
                      className="action-button analytics-button"
                      onClick={() => onViewAnalytics(url.id)}
                      title="View analytics"
                    >
                      📊 Analytics
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-arrow"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            &#8249;
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page < 10 ? `0${page}` : page}
            </button>
          ))}
          
          <button
            className="pagination-arrow"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
};

export default URLTable;
