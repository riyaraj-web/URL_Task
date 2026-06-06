import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getAnalytics, AnalyticsData } from '../services/api';
import './Analytics.css';

interface AnalyticsProps {
  urlId: number;
  onClose: () => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ urlId, onClose }) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlId]);

  const loadAnalytics = async () => {
    try {
      const analytics = await getAnalytics(urlId);
      setData(analytics);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatShortDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getChartData = () => {
    if (!data || !data.clickHistory.length) return [];

    // Group clicks by date
    const clicksByDate: { [key: string]: number } = {};
    data.clickHistory.forEach(click => {
      const date = click.clickedAt.split('T')[0];
      clicksByDate[date] = (clicksByDate[date] || 0) + 1;
    });

    // Convert to array and sort by date
    return Object.entries(clicksByDate)
      .map(([date, count]) => ({
        date: formatShortDate(date),
        clicks: count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  return (
    <div className="analytics-modal-overlay" onClick={onClose}>
      <div className="analytics-modal" onClick={(e) => e.stopPropagation()}>
        <div className="analytics-header">
          <h2>URL Analytics</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="analytics-content">
          {loading ? (
            <div className="loading">Loading analytics...</div>
          ) : data ? (
            <>
              <div className="click-stats">
                <div className="click-stats-value">{data.clickCount}</div>
                <div className="click-stats-label">Total Clicks</div>
              </div>

              <div className="analytics-info">
                <div className="info-row">
                  <span className="info-label">Original URL</span>
                  <span className="info-value">
                    <a href={data.originalUrl} target="_blank" rel="noopener noreferrer">
                      {data.originalUrl}
                    </a>
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">Short Code</span>
                  <span className="info-value">
                    <code>{data.shortCode}</code>
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">Created</span>
                  <span className="info-value">
                    {formatDate(data.createdAt)}
                  </span>
                </div>
              </div>

              {data.clickHistory.length > 0 && (
                <div className="click-history">
                  <h3>Click Activity</h3>
                  
                  <div className="history-chart">
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#666"
                          style={{ fontSize: '12px' }}
                        />
                        <YAxis 
                          stroke="#666"
                          style={{ fontSize: '12px' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            padding: '10px',
                          }}
                        />
                        <Bar 
                          dataKey="clicks" 
                          fill="#667eea"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <h4 style={{ fontSize: '16px', marginBottom: '10px', color: '#666' }}>
                      Recent Clicks ({data.clickHistory.slice(-10).length})
                    </h4>
                    <div className="history-list">
                      {data.clickHistory.slice(-10).reverse().map((click) => (
                        <div key={click.id} className="history-item">
                          <span className="history-date">
                            {formatDate(click.clickedAt)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="loading">No analytics data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
