import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface URL {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  clickCount: number;
}

export interface AnalyticsData {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  clickCount: number;
  clickHistory: Array<{
    id: number;
    urlId: number;
    clickedAt: string;
  }>;
}

export interface StatisticsData {
  dates: string[];
  clicks: number[];
  creations: number[];
}

export const createShortURL = async (originalUrl: string): Promise<URL> => {
  const response = await api.post('/api/urls', { originalUrl });
  return response.data;
};

export const getURLs = async (): Promise<URL[]> => {
  const response = await api.get('/api/urls');
  return response.data;
};

export const getAnalytics = async (urlId: number): Promise<AnalyticsData> => {
  const response = await api.get(`/api/urls/${urlId}/analytics`);
  return response.data;
};

export const getStatistics = async (): Promise<StatisticsData> => {
  const response = await api.get('/api/statistics');
  return response.data;
};

export const getShortURL = (shortCode: string): string => {
  return `${API_BASE_URL}/${shortCode}`;
};
