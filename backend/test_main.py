import pytest
from fastapi.testclient import TestClient
from main import app, urls_db, clicks_db
import json

client = TestClient(app)

def setup_function():
    """Clear data before each test"""
    global urls_db, clicks_db
    urls_db.clear()
    clicks_db.clear()

def test_root_endpoint():
    """Test API health check"""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()

def test_create_short_url():
    """Test URL creation"""
    response = client.post(
        "/api/urls",
        json={"originalUrl": "https://www.example.com"}
    )
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert "shortCode" in data
    assert data["originalUrl"] == "https://www.example.com/"
    assert data["clickCount"] == 0
    assert len(data["shortCode"]) == 6

def test_create_invalid_url():
    """Test URL validation"""
    response = client.post(
        "/api/urls",
        json={"originalUrl": "not-a-valid-url"}
    )
    assert response.status_code == 422

def test_get_urls():
    """Test getting all URLs"""
    # Create some URLs
    client.post("/api/urls", json={"originalUrl": "https://www.example1.com"})
    client.post("/api/urls", json={"originalUrl": "https://www.example2.com"})
    
    response = client.get("/api/urls")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert isinstance(data, list)

def test_redirect_and_increment():
    """Test URL redirect and click count increment"""
    # Create a URL
    create_response = client.post(
        "/api/urls",
        json={"originalUrl": "https://www.example.com"}
    )
    short_code = create_response.json()["shortCode"]
    url_id = create_response.json()["id"]
    
    # Access the short URL
    response = client.get(f"/{short_code}", follow_redirects=False)
    assert response.status_code == 307
    assert "location" in response.headers
    
    # Check click count was incremented
    urls_response = client.get("/api/urls")
    urls = urls_response.json()
    url = next(u for u in urls if u["id"] == url_id)
    assert url["clickCount"] == 1
    
    # Access again
    client.get(f"/{short_code}", follow_redirects=False)
    
    # Check click count incremented again
    urls_response = client.get("/api/urls")
    urls = urls_response.json()
    url = next(u for u in urls if u["id"] == url_id)
    assert url["clickCount"] == 2

def test_redirect_invalid_code():
    """Test redirect with invalid short code"""
    response = client.get("/invalid123", follow_redirects=False)
    assert response.status_code == 404

def test_get_analytics():
    """Test analytics endpoint"""
    # Create a URL
    create_response = client.post(
        "/api/urls",
        json={"originalUrl": "https://www.example.com"}
    )
    url_id = create_response.json()["id"]
    short_code = create_response.json()["shortCode"]
    
    # Generate some clicks
    client.get(f"/{short_code}", follow_redirects=False)
    client.get(f"/{short_code}", follow_redirects=False)
    
    # Get analytics
    response = client.get(f"/api/urls/{url_id}/analytics")
    assert response.status_code == 200
    data = response.json()
    assert data["clickCount"] == 2
    assert len(data["clickHistory"]) == 2
    assert "clickedAt" in data["clickHistory"][0]

def test_get_analytics_invalid_id():
    """Test analytics with invalid URL ID"""
    response = client.get("/api/urls/99999/analytics")
    assert response.status_code == 404

def test_get_statistics():
    """Test statistics endpoint"""
    # Create URLs
    client.post("/api/urls", json={"originalUrl": "https://www.example1.com"})
    client.post("/api/urls", json={"originalUrl": "https://www.example2.com"})
    
    response = client.get("/api/statistics")
    assert response.status_code == 200
    data = response.json()
    assert "dates" in data
    assert "clicks" in data
    assert "creations" in data
    assert isinstance(data["dates"], list)
    assert isinstance(data["clicks"], list)
    assert isinstance(data["creations"], list)

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
