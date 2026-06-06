import React, { useState, useEffect } from 'react';
import {
  ComposedChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getStatistics, StatisticsData } from '../services/api';
import './Statistics.css';

const Statistics: React.FC = () => {
  const [data, setData] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const stats = await getStatistics();
      setData(stats);
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="statistics-container">
        <h2 className="statistics-title">Statistics</h2>
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  if (!data || data.dates.length === 0) {
    return (
      <div className="statistics-container">
        <h2 className="statistics-title">Statistics</h2>
        <div className="empty-state">
          No statistics available yet. Create and share some URLs to see data here!
        </div>
      </div>
    );
  }

  const chartData = data.dates.map((date, index) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    clicks: data.clicks[index],
    creations: data.creations[index],
  }));

  const totalClicks = data.clicks.reduce((sum, val) => sum + val, 0);
  const totalCreations = data.creations.reduce((sum, val) => sum + val, 0);

  return (
    <div className="statistics-container">
      <h2 className="statistics-title">Statistics</h2>
      
      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-value">{totalClicks}</div>
          <div className="stat-label">Total Clicks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalCreations}</div>
          <div className="stat-label">URLs Created</div>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Recent Statistics of Click Counts</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={chartData}>
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
            <Legend 
              wrapperStyle={{ fontSize: '14px' }}
            />
            <Bar
              dataKey="creations"
              fill="#2196F3"
              name="URL Creations"
              radius={[4, 4, 0, 0]}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#4CAF50"
              fill="#81C784"
              fillOpacity={0.6}
              name="URL Clicks"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
