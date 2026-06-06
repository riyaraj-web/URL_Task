import json
from datetime import datetime, timedelta
import random

def generate_seed_data():
    """Generate seed data with 10 URLs and varying click counts"""
    
    # Sample URLs matching the screenshot design
    sample_urls = [
        "https://www.codeigniter.com/items/%23heavy-url-shortener-wth-analytics-php-mysql",
        "http://www.google.com",
        "http://bit.tc",
        "https://www.codeigniter.com/items/%23heavy-url-shortener-wth-analytics-php-mysql",
        "http://google.com",
        "http://googl.com",
        "https://www.codeigniter.com/",
        "https://rb.gy/kmx0r%2",
        "https://www.codeigniter.com/",
        "https://www.youtube.com/watch?v=Qf3ln9eDSPs06A8"
    ]
    
    short_codes = ["ASGI", "USLSH", "NGIS", "USLSJI", "USLSJX", 
                   "http", "Id", "USLSH", "Mal7r", "USLSH"]
    
    urls = {}
    clicks = []
    click_id = 1
    
    # Generate URLs with different creation dates (last 30 days)
    base_date = datetime.now()
    
    for i in range(10):
        url_id = i + 1
        created_date = base_date - timedelta(days=random.randint(0, 30))
        click_count = random.randint(5, 50)
        
        urls[url_id] = {
            "id": url_id,
            "originalUrl": sample_urls[i],
            "shortCode": short_codes[i],
            "createdAt": created_date.isoformat(),
            "clickCount": click_count
        }
        
        # Generate click history for this URL
        for j in range(click_count):
            click_date = created_date + timedelta(
                days=random.randint(0, (base_date - created_date).days),
                hours=random.randint(0, 23),
                minutes=random.randint(0, 59)
            )
            
            clicks.append({
                "id": click_id,
                "urlId": url_id,
                "clickedAt": click_date.isoformat()
            })
            click_id += 1
    
    # Sort clicks by date
    clicks.sort(key=lambda x: x['clickedAt'])
    
    # Save to data.json
    data = {
        "urls": urls,
        "clicks": clicks
    }
    
    with open('data.json', 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"✓ Generated seed data:")
    print(f"  - {len(urls)} URLs")
    print(f"  - {len(clicks)} click events")
    print(f"  - Date range: {min(c['clickedAt'] for c in clicks)[:10]} to {max(c['clickedAt'] for c in clicks)[:10]}")

if __name__ == "__main__":
    generate_seed_data()
