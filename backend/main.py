from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime
import string
import random
import json
from pathlib import Path

app = FastAPI(title="URL Shortener API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data storage
DATA_FILE = Path("data.json")
urls_db = {}
clicks_db = []

# Models
class URLCreate(BaseModel):
    originalUrl: HttpUrl

class URLResponse(BaseModel):
    id: int
    originalUrl: str
    shortCode: str
    createdAt: str
    clickCount: int

class AnalyticsResponse(BaseModel):
    id: int
    originalUrl: str
    shortCode: str
    createdAt: str
    clickCount: int
    clickHistory: List[dict]

# Helper functions
def generate_short_code(length: int = 6) -> str:
    """Generate a random short code"""
    characters = string.ascii_letters + string.digits
    while True:
        code = ''.join(random.choices(characters, k=length))
        if code not in [url['shortCode'] for url in urls_db.values()]:
            return code

def load_data():
    """Load data from JSON file"""
    global urls_db, clicks_db
    if DATA_FILE.exists():
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
            urls_db = {int(k): v for k, v in data.get('urls', {}).items()}
            clicks_db = data.get('clicks', [])

def save_data():
    """Save data to JSON file"""
    with open(DATA_FILE, 'w') as f:
        json.dump({
            'urls': urls_db,
            'clicks': clicks_db
        }, f, indent=2)

# Load data on startup
@app.on_event("startup")
async def startup_event():
    load_data()

# API Endpoints
@app.post("/api/urls", response_model=URLResponse, status_code=status.HTTP_201_CREATED)
async def create_short_url(url_data: URLCreate):
    """Create a new short URL"""
    url_id = max(urls_db.keys(), default=0) + 1
    short_code = generate_short_code()
    
    url_entry = {
        "id": url_id,
        "originalUrl": str(url_data.originalUrl),
        "shortCode": short_code,
        "createdAt": datetime.now().isoformat(),
        "clickCount": 0
    }
    
    urls_db[url_id] = url_entry
    save_data()
    
    return url_entry

@app.get("/api/urls", response_model=List[URLResponse])
async def get_urls():
    """Get all URLs sorted by creation date (newest first)"""
    urls = sorted(urls_db.values(), key=lambda x: x['createdAt'], reverse=True)
    return urls

@app.get("/api/urls/{url_id}/analytics", response_model=AnalyticsResponse)
async def get_analytics(url_id: int):
    """Get analytics for a specific URL"""
    if url_id not in urls_db:
        raise HTTPException(status_code=404, detail="URL not found")
    
    url = urls_db[url_id]
    click_history = [click for click in clicks_db if click['urlId'] == url_id]
    
    return {
        **url,
        "clickHistory": click_history
    }

@app.get("/api/statistics")
async def get_statistics():
    """Get statistics for all URLs"""
    # Prepare data for charts
    url_clicks = {}
    url_creations = {}
    
    # Process URL creations by date
    for url in urls_db.values():
        date = url['createdAt'][:10]  # Extract date part
        url_creations[date] = url_creations.get(date, 0) + 1
    
    # Process clicks by date
    for click in clicks_db:
        date = click['clickedAt'][:10]
        url_clicks[date] = url_clicks.get(date, 0) + 1
    
    # Sort by date
    sorted_dates = sorted(set(list(url_clicks.keys()) + list(url_creations.keys())))
    
    return {
        "dates": sorted_dates,
        "clicks": [url_clicks.get(date, 0) for date in sorted_dates],
        "creations": [url_creations.get(date, 0) for date in sorted_dates]
    }

@app.get("/{short_code}")
async def redirect_url(short_code: str):
    """Redirect to original URL and increment click count"""
    # Find URL by short code
    url_entry = None
    for url in urls_db.values():
        if url['shortCode'] == short_code:
            url_entry = url
            break
    
    if not url_entry:
        raise HTTPException(status_code=404, detail="Short URL not found")
    
    # Increment click count
    url_entry['clickCount'] += 1
    
    # Record click event
    click_event = {
        "id": len(clicks_db) + 1,
        "urlId": url_entry['id'],
        "clickedAt": datetime.now().isoformat()
    }
    clicks_db.append(click_event)
    
    save_data()
    
    # Redirect to original URL
    return RedirectResponse(url=url_entry['originalUrl'], status_code=307)

@app.get("/")
async def root():
    """API health check"""
    return {
        "message": "URL Shortener API",
        "version": "1.0.0",
        "endpoints": {
            "POST /api/urls": "Create short URL",
            "GET /api/urls": "Get all URLs",
            "GET /api/urls/{id}/analytics": "Get analytics",
            "GET /api/statistics": "Get statistics",
            "GET /{shortCode}": "Redirect to original URL"
        }
    }
