# Quick Fix for Render Deployment

## The Problem
Registration and login don't work because environment variables aren't configured in Render.

## The Solution (5 Minutes)

### 1. Backend Environment Variables
Go to: https://dashboard.render.com → **house-rent-api-iz7v** → **Environment**

Add these 6 variables:
```
MONGODB_URI=mongodb+srv://aanjneya2428cseai15_db_user:1nygpJYf4zU1jYfL@cluster0.3nszsqd.mongodb.net/?appName=Cluster0
JWT_SECRET=9d4b155b7812590a6b21c479c6f93e9cfbf90dadfa3db92312ac84935e3d6af8
JWT_EXPIRE=7d
NODE_ENV=production
CORS_ORIGIN=https://house-rent-frontend-8uin.onrender.com
PORT=5000
```

Click **Save Changes** → Wait for redeploy (~5 min)

### 2. Frontend Environment Variable
Go to: https://dashboard.render.com → **house-rent-frontend-8uin** → **Environment**

Add this 1 variable:
```
REACT_APP_API_URL=https://house-rent-api-iz7v.onrender.com/api
```

Click **Save Changes** → Wait for redeploy (~5 min)

### 3. Test
1. Open: https://house-rent-api-iz7v.onrender.com/api/health
   - Should see: `{"success": true, "message": "Server is running"}`

2. Open: https://house-rent-frontend-8uin.onrender.com
   - Try registering a new account
   - Should work! ✅

## That's It!
Your app should now work. See `DEPLOYMENT_CONFIGURATION.md` for detailed troubleshooting.
