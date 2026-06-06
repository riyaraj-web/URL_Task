# URL Shortener - Full-Stack Application

A modern, full-stack URL shortening application similar to Bitly, built with React, TypeScript, and Python FastAPI.

## 📋 Project Overview

This application allows users to:
- Shorten long URLs into compact, shareable links
- View a table of recently shortened URLs
- Track click counts for each shortened URL
- View detailed analytics for individual URLs
- Visualize statistics with interactive charts
- Redirect short URLs to their original destinations

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.7
- **Language**: TypeScript 4.9.5
- **UI Library**: Custom CSS with responsive design
- **Charts**: Recharts 3.8.1
- **HTTP Client**: Axios 1.17.0
- **Testing**: Jest + React Testing Library

### Backend
- **Framework**: FastAPI 0.115.0
- **Language**: Python 3.13+
- **Server**: Uvicorn 0.32.0
- **Validation**: Pydantic 2.9.0
- **Testing**: Pytest 8.3.0
- **Data Storage**: JSON file-based persistence

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Python**: 3.13 or higher
  - Download from: https://www.python.org/downloads/
- **Node.js**: 16.x or higher
  - Download from: https://nodejs.org/
- **npm**: Comes with Node.js installation

Verify installations:
```bash
python --version
node --version
npm --version
```

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd url-shortener
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

**Generate Seed Data** (10 pre-populated URLs with click history):

```bash
python seed_data.py
```

This will create a `data.json` file with:
- 10 sample URLs with different creation dates
- 200+ click events spread over the last 30 days
- Varying click counts (5-50 per URL)

**Start the Backend Server**:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at: **http://localhost:8000**

API Documentation (Swagger): **http://localhost:8000/docs**

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm install
```

**Start the Frontend Development Server**:

```bash
npm start
```

The frontend will be available at: **http://localhost:3000**

The application will automatically open in your default browser.

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
pytest test_main.py -v
```

**Test Coverage**:
- ✅ URL creation with validation
- ✅ Invalid URL handling
- ✅ Retrieving all URLs
- ✅ URL redirect with click count increment
- ✅ Analytics data retrieval
- ✅ Statistics endpoint
- ✅ Error handling (404s, validation errors)

### Frontend Tests

```bash
cd frontend
npm test
```

Press `a` to run all tests, or `q` to quit watch mode.

## 📊 API Endpoints

### Create Short URL
```
POST /api/urls
Body: { "originalUrl": "https://example.com" }
Response: { "id", "originalUrl", "shortCode", "createdAt", "clickCount" }
```

### Get All URLs
```
GET /api/urls
Response: Array of URL objects (sorted by creation date, newest first)
```

### Get URL Analytics
```
GET /api/urls/{id}/analytics
Response: { URL data + "clickHistory": [] }
```

### Get Statistics
```
GET /api/statistics
Response: { "dates": [], "clicks": [], "creations": [] }
```

### Redirect Short URL
```
GET /{shortCode}
Response: 307 Redirect to original URL (increments click count)
```

## 🎨 Features

### Landing Page
- Clean header with "Easy URL Shortener" branding
- Blue banner section with "Simplify your URL" heading
- URL input field with validation
- "Shorten URL" button
- Helper text for user guidance

### Recent URLs Table
- Displays shortened URLs in a paginated table
- Columns: Original URL, Short URL, Created Date, Click Count, Actions
- Copy button (green) to copy short URL to clipboard
- Link button (cyan) to open short URL in new tab
- Analytics button (blue) to view detailed statistics
- Pagination with numbered pages (10 items per page)

### Analytics Modal
- Total click count display
- Original URL and short code information
- Creation date
- Click activity bar chart
- Recent clicks history list

### Statistics Dashboard
- Total clicks and URLs created summary cards
- Combined area and bar chart showing:
  - URL clicks over time (teal area chart)
  - URL creations over time (blue bar chart)

### Responsive Design
- Mobile-friendly layout
- Tablet and desktop optimized
- Touch-friendly buttons and controls

## 📁 Project Structure

```
url-shortener/
├── backend/
│   ├── main.py              # FastAPI application with all endpoints
│   ├── requirements.txt     # Python dependencies
│   ├── seed_data.py         # Script to generate test data
│   ├── test_main.py         # Backend test suite
│   └── data.json            # JSON data storage (generated)
│
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── URLShortener.tsx     # URL input form
│   │   │   ├── URLTable.tsx         # URLs table with pagination
│   │   │   ├── Analytics.tsx        # Analytics modal
│   │   │   ├── Statistics.tsx       # Statistics dashboard
│   │   │   └── *.css                # Component styles
│   │   ├── services/
│   │   │   └── api.ts       # API client functions
│   │   ├── App.tsx          # Main application component
│   │   └── index.tsx        # Application entry point
│   ├── package.json         # Node dependencies
│   └── tsconfig.json        # TypeScript configuration
│
└── README.md               # This file
```

## 🔧 Configuration

### Backend Configuration
- **Host**: 0.0.0.0 (accessible from network)
- **Port**: 8000
- **CORS**: Enabled for all origins (development mode)
- **Data File**: data.json (in backend directory)

### Frontend Configuration
- **API URL**: http://localhost:8000 (can be changed via REACT_APP_API_URL env variable)
- **Port**: 3000 (default React port)

To use a different backend URL:
```bash
REACT_APP_API_URL=http://your-api-url npm start
```

## 🤔 Assumptions & Tradeoffs

### Data Storage
- **Assumption**: Used JSON file storage for simplicity and quick setup
- **Tradeoff**: Not suitable for production; would use PostgreSQL/MongoDB for real deployment
- **Benefit**: No database setup required, easy to version control seed data

### Short Code Generation
- **Assumption**: 6-character random alphanumeric codes provide sufficient uniqueness
- **Tradeoff**: Possible collisions at very high scale (62^6 = 56B combinations)
- **Benefit**: Short, clean URLs that are easy to share

### Authentication
- **Assumption**: No authentication required for this assessment
- **Tradeoff**: In production, would need user accounts and URL ownership
- **Benefit**: Simplified implementation focusing on core functionality

### Frontend State Management
- **Assumption**: React's useState is sufficient for this application size
- **Tradeoff**: For larger apps, would use Redux or Context API
- **Benefit**: Simpler code, easier to understand

### Testing
- **Assumption**: Basic test coverage for main functionality
- **Tradeoff**: More comprehensive integration and E2E tests would be ideal
- **Benefit**: Demonstrates testing capability without over-engineering

### Design Implementation
- **Assumption**: Closely matched provided UI mockup with custom CSS
- **Tradeoff**: Could use Material-UI or Ant Design for faster development
- **Benefit**: Full control over styling, smaller bundle size, exact design match

## 📝 Additional Notes

### Click Tracking
- Each access to a short URL increments the click count
- Click events are stored with timestamps
- Click history is available in the analytics view

### URL Validation
- Frontend validates URLs using JavaScript URL constructor
- Backend validates with Pydantic's HttpUrl type
- Only HTTPS and HTTP URLs are accepted

### Date Formatting
- Dates are displayed in human-readable format: "Tuesday 28th February, 2017"
- Consistent formatting across the application

## 🐛 Known Issues

- None currently identified

## 🚀 Future Enhancements

- User authentication and authorization
- Custom short code selection
- QR code generation
- URL expiration dates
- Password-protected URLs
- Geographic click analytics
- Link preview metadata
- API rate limiting
- Database integration (PostgreSQL)
- Docker containerization
- CI/CD pipeline
- Production deployment configuration

## 📸 Screenshots

*Screenshots showing the UI matching the provided design would be included here after deployment*

## ⏱️ Time Spent

Estimated development time: 4-5 hours
- Backend API development: 1.5 hours
- Frontend UI implementation: 2 hours
- Testing and refinement: 1 hour
- Documentation: 0.5 hours

## 📄 License

This project is created for assessment purposes.

## 👤 Author

[Your Name]
- Repository: [GitHub URL]
- Time: [Date Created]

---

**Note**: This application is designed for development and assessment purposes. For production use, additional security measures, proper database integration, and scalability considerations would be required.
