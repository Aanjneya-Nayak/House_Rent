# Unified Render Deployment (Complete App in One Service)

Deploy your entire House Rent app (frontend + backend) as a **single Web Service** on Render.

## ✅ Advantages

- **Cheaper**: 1 Web Service instead of 1 Web Service + 1 Static Site
- **Simpler**: Single deployment, no CORS complexity  
- **Faster**: Same origin, no cross-domain requests
- **Auto-builds**: Frontend builds automatically during deployment

## Step-by-Step Deployment

### Step 1: Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output (long hex string) - you'll need it in Step 3.

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Unified deployment setup"
git push origin main
```

### Step 3: Create Web Service on Render

1. Go to **[render.com](https://render.com)** and sign in
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"**
4. Select **"Aanjneya-Nayak/House_Rent"**
5. Click **"Connect"**

### Step 4: Configure Service

Fill in these values **exactly**:

| Field | Value |
|-------|-------|
| **Name** | `house-rent-app` |
| **Environment** | `Node` |
| **Region** | `Oregon` (or closest) |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Root Directory** | `backend` |

### Step 5: Add Environment Variables

Click **"Environment"** section. Add each variable below:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://aanjneya2428cseai15_db_user:1nygpJYf4zU1jYfL@cluster0.3nszsqd.mongodb.net/?appName=Cluster0` |
| `JWT_SECRET` | Paste your JWT secret from Step 1 |
| `JWT_EXPIRE` | `7d` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `https://house-rent-app.onrender.com` |
| `PORT` | `5000` |

**Click outside each input to save it.**

### Step 6: Deploy

Click **"Create Web Service"**

⏳ **Wait 12-15 minutes** for:
1. Frontend to build
2. Frontend to copy to backend
3. Backend to install and start

Watch the logs for progress.

When complete, you'll see a URL like:
```
https://house-rent-app.onrender.com
```

### Step 7: Test Your App

#### Test Backend API

Open in browser:
```
https://house-rent-app.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

#### Test Frontend

Open in browser:
```
https://house-rent-app.onrender.com
```

You should see the House Rent homepage with property listings.

#### Test Login

Click **"Login"** and use:

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

**User:**
- Email: `jane@example.com`
- Password: `password123`

## 🎉 Your App is Live!

- **Live App**: https://house-rent-app.onrender.com
- **API Endpoint**: https://house-rent-app.onrender.com/api
- **Database**: MongoDB Atlas (Cluster0)

All future pushes to `main` auto-deploy!

## How It Works

1. Render runs `npm install` in the backend folder
2. A `postinstall` script automatically:
   - Installs frontend dependencies
   - Builds the React app
   - Copies the build into `backend/public`
3. Node.js serves:
   - Static files (React app) from `backend/public`
   - API routes from `/api/...`
   - Falls back to `index.html` for React Router

## Performance Notes

- First deployment takes longer (~15 min) because it builds frontend
- Subsequent deployments are faster (~5 min) as dependencies are cached
- No CORS overhead since frontend and backend share same origin
- Cheaper monthly cost

## Troubleshooting

**Build takes too long:**
- First build installs all dependencies, subsequent builds are cached and faster
- Check logs in Render dashboard

**"Cannot find public folder":**
- Make sure postinstall script completed
- Check Render logs for build errors

**Images not showing:**
- They're from Unsplash URLs, should work automatically
- Check browser console for 404 errors

**Database connection error:**
- Verify MongoDB Atlas connection string in environment variables
- Check IP whitelist in MongoDB Atlas

## Manual Deployment (If Needed)

To deploy locally first before pushing to Render:

```bash
# Build frontend
cd frontend
npm run build

# Copy to backend
cd ../backend
rm -rf public
cp -r ../frontend/build ./public

# Test locally
npm start
```

Then visit `http://localhost:5000`

---

This unified approach is **simpler, cheaper, and faster**! 🚀
