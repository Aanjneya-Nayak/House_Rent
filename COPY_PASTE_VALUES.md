# Copy-Paste Values for Render Configuration

## Backend Environment Variables (house-rent-api-iz7v)

Copy each line below and paste into Render:

---

**Variable 1:**
```
Key: MONGODB_URI
Value: mongodb+srv://aanjneya2428cseai15_db_user:1nygpJYf4zU1jYfL@cluster0.3nszsqd.mongodb.net/?appName=Cluster0
```

---

**Variable 2:**
```
Key: JWT_SECRET
Value: 9d4b155b7812590a6b21c479c6f93e9cfbf90dadfa3db92312ac84935e3d6af8
```

---

**Variable 3:**
```
Key: JWT_EXPIRE
Value: 7d
```

---

**Variable 4:**
```
Key: NODE_ENV
Value: production
```

---

**Variable 5:**
```
Key: CORS_ORIGIN
Value: https://house-rent-frontend-8uin.onrender.com
```

---

**Variable 6:**
```
Key: PORT
Value: 5000
```

---

## Frontend Environment Variable (house-rent-frontend-8uin)

Copy the line below and paste into Render:

---

**Variable 1:**
```
Key: REACT_APP_API_URL
Value: https://house-rent-api-iz7v.onrender.com/api
```

---

## Quick Copy Format (for bulk paste if Render supports it)

### Backend:
```
MONGODB_URI=mongodb+srv://aanjneya2428cseai15_db_user:1nygpJYf4zU1jYfL@cluster0.3nszsqd.mongodb.net/?appName=Cluster0
JWT_SECRET=9d4b155b7812590a6b21c479c6f93e9cfbf90dadfa3db92312ac84935e3d6af8
JWT_EXPIRE=7d
NODE_ENV=production
CORS_ORIGIN=https://house-rent-frontend-8uin.onrender.com
PORT=5000
```

### Frontend:
```
REACT_APP_API_URL=https://house-rent-api-iz7v.onrender.com/api
```

---

## Verification URLs

After configuration, test these:

**Backend Health Check:**
```
https://house-rent-api-iz7v.onrender.com/api/health
```

**Frontend:**
```
https://house-rent-frontend-8uin.onrender.com
```

---

## Important Notes

- ⚠️ Copy values EXACTLY as shown (no extra spaces)
- ⚠️ CORS_ORIGIN has NO trailing slash
- ⚠️ REACT_APP_API_URL includes `/api` at the end
- ⚠️ JWT_SECRET is 64 characters long
- ⚠️ All URLs use HTTPS, not HTTP

---

**After pasting all values, click "Save Changes" and wait for redeployment!**
