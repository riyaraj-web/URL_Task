# 🚀 Quick Start Guide - URL Shortener

## ✅ Project is Now Running!

Both the backend and frontend servers are currently active and ready to use.

---

## 🌐 Access the Application

### Frontend (User Interface)
**URL**: http://localhost:3000

Open your web browser and navigate to:
```
http://localhost:3000
```

The application will open automatically showing:
- Blue banner with "Simplify your URL" heading
- URL input field
- Recent URLs table with 10 pre-loaded URLs
- Statistics dashboard with charts

### Backend API (REST API)
**URL**: http://localhost:8000

#### API Documentation (Swagger UI)
```
http://localhost:8000/docs
```

#### Alternative API Docs (ReDoc)
```
http://localhost:8000/redoc
```

---

## 📊 Pre-loaded Data

The application comes with **10 sample URLs** already loaded:

1. https://www.codeigniter.com/items/%23heavy-url-shortener-wth-analytics-php-mysql
2. http://www.google.com
3. http://bit.tc
4. https://www.codeigniter.com/items/%23heavy-url-shortener-wth-analytics-php-mysql
5. http://google.com
6. http://googl.com
7. https://www.codeigniter.com/
8. https://rb.gy/kmx0r%2
9. https://www.codeigniter.com/
10. https://www.youtube.com/watch?v=Qf3ln9eDSPs06A8

**Total Click Events**: 319 clicks spread over 30 days

---

## 🎯 How to Use the Application

### 1. Shorten a URL

1. Enter a long URL in the input field (e.g., `https://www.example.com`)
2. Click the **"Shorten URL"** button
3. Your new shortened URL will appear at the top of the Recent URLs table

### 2. Copy Short URL

1. Find your URL in the Recent URLs table
2. Click the **green 📎 button** to copy the short URL to clipboard
3. You'll see a ✓ checkmark confirming the copy

### 3. Open Short URL

1. Click the **cyan 🔗 button** to open the short URL in a new tab
2. You'll be redirected to the original URL
3. The click count will automatically increment

### 4. View Analytics

1. Click the **blue "📊 Analytics"** button for any URL
2. A modal will open showing:
   - Total click count
   - Original URL and short code
   - Creation date
   - Click activity bar chart
   - Recent clicks history

### 5. View Statistics

Scroll down to see the **Statistics Dashboard** showing:
- Total clicks across all URLs
- Total URLs created
- Interactive chart with:
  - Teal area: URL clicks over time
  - Blue bars: URL creations over time

### 6. Navigate Pages

- Use the pagination controls at the bottom of the table
- Click numbered pages (01, 02, etc.) to navigate
- Use ◁ and ▷ arrows to move between pages

---

## 🔧 Currently Running Processes

### Backend Server
- **Status**: ✅ Running
- **Process**: Uvicorn FastAPI server
- **Port**: 8000
- **Reload**: Enabled (auto-reloads on code changes)
- **Data File**: `backend/data.json`

### Frontend Server
- **Status**: ✅ Running
- **Process**: React development server (webpack)
- **Port**: 3000
- **Hot Reload**: Enabled (auto-refreshes on code changes)

---

## 📝 Testing the Application

### Try These Actions:

1. **Create a new short URL**
   ```
   URL: https://github.com
   ```

2. **Copy and paste the short URL** in a new browser tab
   - Example: http://localhost:8000/ASGI
   - Watch the click count increment!

3. **View analytics** for a URL with many clicks
   - Look for URLs with high click counts (badge number)
   - Click "📊 Analytics" to see the detailed view

4. **Check the statistics chart**
   - Scroll to the bottom
   - See the activity over the last 30 days

---

## 🛑 Stopping the Servers

If you need to stop the servers:

### Option 1: Stop Individual Processes
- Press `Ctrl+C` in the terminal running the backend
- Press `Ctrl+C` in the terminal running the frontend

### Option 2: Kill Processes
```bash
# On Windows (PowerShell)
Get-Process | Where-Object {$_.ProcessName -like "*python*" -or $_.ProcessName -like "*node*"} | Stop-Process
```

---

## 🔄 Restarting the Servers

### Backend
```bash
cd url-shortener/backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd url-shortener/frontend
npm start
```

---

## 🐛 Troubleshooting

### Frontend won't load?
1. Check if the backend is running: http://localhost:8000
2. Clear browser cache and refresh
3. Check browser console for errors (F12)

### Backend API not responding?
1. Verify the process is running
2. Check if port 8000 is available
3. Look for errors in the terminal

### Port already in use?
```bash
# Windows: Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Data not showing?
1. Regenerate seed data:
   ```bash
   cd url-shortener/backend
   python seed_data.py
   ```
2. Restart the backend server

---

## 📱 Mobile Testing

The application is responsive! Test on mobile:

1. Find your network IP: `http://192.168.29.151:3000`
2. Open on your phone's browser
3. Ensure phone is on same WiFi network

---

## 🎨 UI Features Implemented

- ✅ Blue gradient hero section
- ✅ White input with placeholder
- ✅ Cyan "Shorten URL" button with icon
- ✅ Bordered table with hover effects
- ✅ Green copy button (📎)
- ✅ Cyan link button (🔗)
- ✅ Blue analytics button (📊)
- ✅ Numbered pagination (01, 02, 03...)
- ✅ Statistics cards with gradient
- ✅ Combined area + bar chart
- ✅ Responsive mobile layout

---

## 📚 Next Steps

1. **Explore the API**: Visit http://localhost:8000/docs
2. **Read the README**: See `README.md` for full documentation
3. **Check Test Results**: Review `TEST_RESULTS.md`
4. **Try the Features**: Create, copy, and analyze URLs!

---

## 🎉 Enjoy Your URL Shortener!

The application is fully functional and ready to use. Start shortening those long URLs! 🚀

---

**Need Help?**
- Check `README.md` for detailed documentation
- Review `TEST_RESULTS.md` for test coverage
- Inspect `backend/data.json` to see data structure
