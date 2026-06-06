# URL Shortener - Full-Stack Application

A modern, full-stack URL shortening application , built with React, TypeScript, and Python FastAPI.

<img width="1884" height="895" alt="{A0A4A62C-3EC0-4C01-A5E2-4307E303ADA6}" src="https://github.com/user-attachments/assets/a3fcc381-b3d4-4a6f-8165-a865d6f14e6e" />



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

 
## ⏱️ Time Spent

**Total Development Time: 4-5 hours**

### Detailed Breakdown:

 

##  Assumptions Made

### 1. Data Storage
**Assumption**: JSON file-based storage is acceptable for this assessment

**Reasoning**:
- Quick setup without database dependencies
- Easy to inspect and version control
- Sufficient for demonstration purposes
- Allows focus on core functionality

**Production Alternative**: Would use PostgreSQL or MongoDB with proper:
- Connection pooling
- Indexing on shortCode for fast lookups
- Transaction support
- Backup and recovery

### 2. Short Code Generation
**Assumption**: 6-character random alphanumeric codes provide sufficient uniqueness

**Reasoning**:
- 62^6 = 56+ billion possible combinations
- Collision probability extremely low for assessment scale
- Short and memorable URLs

**Production Alternative**: 
- Implement collision detection with retry logic
- Allow custom short codes
- Add Base62 encoding of sequential IDs for guaranteed uniqueness

### 3. Authentication & Authorization
**Assumption**: No user authentication required

**Reasoning**:
- Assessment focuses on core URL shortening functionality
- Simplifies development and testing
- Public access model (like bit.ly's basic tier)

**Production Alternative**:
- JWT-based authentication
- User accounts with URL ownership
- API keys for programmatic access
- Role-based access control

### 4. URL Validation
**Assumption**: Basic HTTP/HTTPS URL format validation is sufficient

**Reasoning**:
- Prevents common user input errors
- Validates URL structure
- Adequate for trusted users

**Production Alternative**:
- DNS verification to ensure URL resolves
- Blacklist/whitelist checking
- Malicious URL detection
- Content-type verification
- SSL certificate validation

### 5. Analytics Granularity
**Assumption**: Click timestamps and basic statistics are adequate

**Reasoning**:
- Provides meaningful insights
- Demonstrates analytics capability
- Sufficient for assessment requirements

**Production Alternative**:
- Geographic location (IP geolocation)
- Device type and browser detection
- Referrer source tracking
- User agent analysis
- Conversion funnel tracking

### 6. CORS Configuration
**Assumption**: Open CORS policy (allow_origins=["*"]) acceptable for development

**Reasoning**:
- Simplifies local development
- No deployment domain known yet
- Standard practice for development mode

**Production Alternative**:
- Restrict to specific allowed origins
- Configure per environment
- Implement CSRF protection

### 7. Error Handling
**Assumption**: Basic HTTP status codes and messages are adequate

**Reasoning**:
- Covers main error scenarios (404, 422, 500)
- User-friendly error messages
- Sufficient for assessment

**Production Alternative**:
- Detailed error codes and categories
- Structured error responses
- Logging to external service (Sentry, DataDog)
- User-actionable error messages

### 8. Scalability Requirements
**Assumption**: Application designed for demonstration, not high-traffic production

**Reasoning**:
- Assessment scope
- Time constraints
- Focus on correctness over optimization

**Production Alternative**:
- Database with read replicas
- Redis caching layer
- CDN for static assets
- Load balancing
- Horizontal scaling with Docker/Kubernetes

---

## ⚖️ Tradeoffs Made

### 1. JSON File Storage vs Database

**Decision**: JSON file storage

**Benefits**:
- ✅ Zero external dependencies
- ✅ Simple setup (no DB installation)
- ✅ Easy to inspect data
- ✅ Version control friendly
- ✅ Fast development

**Drawbacks**:
- ❌ Not suitable for concurrent writes
- ❌ Slow for large datasets
- ❌ No query optimization
- ❌ Manual data integrity management

**Why this tradeoff**:
- Assessment environment
- Focus on functionality over scalability
- Easy for reviewers to test without DB setup

**Production choice**: PostgreSQL with:
- ACID transactions
- Indexed queries
- Connection pooling
- Proper backup strategy

---

### 2. Custom CSS vs UI Component Library

**Decision**: Custom CSS

**Benefits**:
- ✅ Exact design match to mockup
- ✅ Full styling control
- ✅ Smaller bundle size (~200KB vs ~500KB+)
- ✅ No framework lock-in
- ✅ Better for assessment (shows CSS skills)

**Drawbacks**:
- ❌ More time for responsive design
- ❌ Manual accessibility features
- ❌ No pre-built complex components

**Why this tradeoff**:
- Design accuracy is 40% of evaluation
- Demonstrates CSS proficiency
- Better performance

**Production choice**: Could use Tailwind CSS for:
- Faster development
- Consistent design system
- Utility-first approach

---

### 3. React State vs Redux

**Decision**: React useState/useEffect

**Benefits**:
- ✅ Simpler code structure
- ✅ Easier to understand
- ✅ No boilerplate
- ✅ Adequate for app complexity

**Drawbacks**:
- ❌ Prop drilling in some cases
- ❌ Less structured state updates
- ❌ No time-travel debugging

**Why this tradeoff**:
- Application state is relatively simple
- Only 5 components
- Faster development

**Production choice**: Would use Redux or Zustand if:
- Adding user management
- Complex multi-step workflows
- Need for state persistence

---

### 4. Client-Side Pagination vs Server-Side

**Decision**: Client-side pagination

**Benefits**:
- ✅ Faster page transitions (no API call)
- ✅ Simpler backend
- ✅ Better UX for small datasets

**Drawbacks**:
- ❌ All data loaded upfront
- ❌ Not scalable for 1000s of URLs
- ❌ Larger initial payload

**Why this tradeoff**:
- Seed data is only 10 URLs
- Demonstrates pagination concept
- Better demo experience (instant response)

**Production choice**: Server-side pagination with:
- `limit` and `offset` parameters
- Cursor-based for large datasets
- Virtual scrolling for performance

---

### 5. Synchronous File I/O

**Decision**: Synchronous JSON read/write

**Benefits**:
- ✅ Simpler code
- ✅ Data consistency guaranteed
- ✅ Easier error handling

**Drawbacks**:
- ❌ Blocks event loop
- ❌ Not suitable for high concurrency

**Why this tradeoff**:
- Assessment scale (low concurrent users)
- Code clarity over performance
- FastAPI handles async at framework level

**Production choice**: 
- Async database operations
- Background job queues for heavy tasks
- Connection pooling

---

### 6. Testing Coverage

**Decision**: 9 core backend tests, basic frontend tests

**Benefits**:
- ✅ Covers critical paths
- ✅ Fast test execution (~2.5s)
- ✅ Demonstrates testing approach

**Drawbacks**:
- ❌ Not exhaustive
- ❌ Limited edge cases
- ❌ No E2E tests

**Why this tradeoff**:
- Time constraints (5 hour target)
- Assessment requires "test results" not 100% coverage
- Focus on functionality over test quantity

**Production choice**:
- 80%+ code coverage
- E2E tests with Cypress/Playwright
- Integration tests
- Performance tests
- Security tests

---

### 7. Hot Reload Development Mode

**Decision**: Running dev servers (not production builds)

**Benefits**:
- ✅ Excellent developer experience
- ✅ Fast iteration
- ✅ Source maps for debugging

**Drawbacks**:
- ❌ Larger bundle size
- ❌ Slower initial load
- ❌ Not optimized

**Why this tradeoff**:
- Assessment review environment
- Easier for evaluators to modify code
- Standard for development

**Production choice**:
- Optimized production builds
- Code splitting
- Asset minification
- CDN delivery

---

### 8. Single-Page Application (No Routing)

**Decision**: Modal-based navigation (no React Router)

**Benefits**:
- ✅ Simpler architecture
- ✅ Faster development
- ✅ Smaller bundle size

**Drawbacks**:
- ❌ No deep linking to analytics
- ❌ No browser back button support
- ❌ Not bookmarkable

**Why this tradeoff**:
- Assessment scope (simple UI)
- All features accessible from main page
- Focus on core functionality

**Production choice**:
- React Router for SPA routing
- Deep linking support
- SEO optimization with SSR



## 📝 Additional Notes

### What Went Well
- Exact UI match to design mockup
- Clean, maintainable code structure
- Comprehensive documentation
- All features working as expected
- Good test coverage for time spent


### Key Technical Decisions
1. FastAPI for modern async Python backend
2. Recharts for declarative chart components
3. Axios for HTTP client (better error handling than fetch)
4. JSON storage for simplicity
5. Component-based architecture for reusability

---

## 🚀 How to Run

### Quick Start
```bash
# Backend
cd backend
pip install -r requirements.txt
python seed_data.py
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm start
```

### Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Run Tests
```bash
cd backend
pytest test_main.py -v
```

---

 
