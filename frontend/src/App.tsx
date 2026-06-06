import React, { useState, useEffect } from 'react';
import './App.css';
import URLShortener from './components/URLShortener';
import URLTable from './components/URLTable';
import Statistics from './components/Statistics';
import Analytics from './components/Analytics';
import { getURLs, URL } from './services/api';

function App() {
  const [urls, setUrls] = useState<URL[]>([]);
  const [selectedUrlId, setSelectedUrlId] = useState<number | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    loadURLs();
  }, [refreshTrigger]);

  const loadURLs = async () => {
    try {
      const data = await getURLs();
      setUrls(data);
    } catch (error) {
      console.error('Error loading URLs:', error);
    }
  };

  const handleURLCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleViewAnalytics = (urlId: number) => {
    setSelectedUrlId(urlId);
  };

  const handleCloseAnalytics = () => {
    setSelectedUrlId(null);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Easy URL Shortener</h1>
      </header>
      
      <URLShortener onURLCreated={handleURLCreated} />
      
      <div className="main-content">
        <URLTable 
          urls={urls} 
          onViewAnalytics={handleViewAnalytics}
        />
        
        <Statistics />
      </div>

      {selectedUrlId && (
        <Analytics 
          urlId={selectedUrlId} 
          onClose={handleCloseAnalytics}
        />
      )}
    </div>
  );
}

export default App;
