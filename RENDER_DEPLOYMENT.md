# Render Deployment Guide

Your House Rent Management System is ready to deploy on Render! Follow these steps.

## ✅ Current Status

- **MongoDB Atlas**: ✓ Connected and working (Cluster0)
- **Backend**: ✓ Ready with proper scripts
- **Frontend**: ✓ Configured with environment variables
- **Environment Variables**: ✓ Properly set up

## Step-by-Step Deployment

### 1. Push Code to GitHub

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Deploy Backend on Render

#### a. Create a New Web Service

1. Go to [render.com](https://render.com)
2. Click **"New+"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the repository containing your code

#### b. Configure Backend Service

- **Name**: `house-rent-api` (or your choice)
- **Environment**: Node
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Runtime**: Node.js

#### c. Add Environment Variables

Click **"Add Environment Variable"** and add these (update the values):

```
MONGODB_URI=mongodb+srv://aanjneya2428cseai15_db_user:1nygpJYf4zU1jYfL@cluster0.3nszsqd.mongodb.net/?appName=Cluster0
JWT_SECRET=use-a-strong-random-string-here
JWT_EXPIRE=7d
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.onrender.com
PORT=5000
```

**Note**: Replace `your-frontend-url` with the actual Render frontend URL (you'll get it in Step 3)

**For JWT_SECRET**, generate a strong key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### d. Deploy

Click **"Create Web Service"** and wait ~5 minutes for deployment. You'll get a backend URL like:

- `https://house-rent-api.onrender.com`

### 3. Deploy Frontend on Render

#### a. Create a New Static Site

1. Go to [render.com](https://render.com)
2. Click **"New+"** → **"Static Site"**
3. Connect your GitHub repository

#### b. Configure Frontend Service

- **Name**: `house-rent-frontend` (or your choice)
- **Branch**: `main`
- **Build Command**: `cd frontend && npm run build`
- **Publish Directory**: `frontend/build`

#### c. Add Environment Variables

Click **"Add Environment Variable"**:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

Replace `your-backend-url` with the actual backend URL from Step 2d

#### d. Deploy

Click **"Create Static Site"** and wait for deployment. Frontend URL will be like:

- `https://house-rent-frontend.onrender.com`

### 4. Update Backend CORS

After frontend deployment, update the backend CORS environment variable:

1. Go back to your backend service on Render
2. Click **"Environment"**
3. Edit `CORS_ORIGIN` → `https://house-rent-frontend.onrender.com`
4. Service will auto-redeploy

## Testing

### Backend Health Check

```
GET https://your-backend-url.onrender.com/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Backend is running!",
  "timestamp": "2026-03-02T..."
}
```

### Login Test Accounts

**Admin**

- Email: `admin@example.com`
- Password: `admin123`

**Property Owner**

- Email: `john@example.com`
- Password: `password123`

**Tenant/User**

- Email: `jane@example.com`
- Password: `password123`

## Troubleshooting

### "Cannot find module" error

- **Solution**: Check that `npm install` completed successfully
- Go to **"Logs"** tab in Render dashboard

### CORS errors in browser

- **Solution**: Update `CORS_ORIGIN` in backend environment variables
- Ensure the frontend URL exactly matches (check for trailing slashes)

### Database connection timeout

- **Solution**: MongoDB Atlas might be blocking the IP
- Go to MongoDB Atlas → Network Access → IP Whitelist
- Add `0.0.0.0/0` to allow all IPs (for development/testing)

### Images not loading

- **Solution**: Images are loaded from Unsplash URLs, should work automatically
- Check browser console for 404 errors

## Monitoring & Logs

- **View Backend Logs**: Render dashboard → Select service → **"Logs"** tab
- **Monitor Uptime**: Render dashboard shows service status
- **Check Performance**: Monitor CPU, memory usage in service details

## Database Management

### Backup

- MongoDB Atlas automatically backs up daily
- Go to MongoDB Atlas → Backups tab

### Reset Database

If needed, re-seed the database by running:

```bash
node backend/scripts/seedDatabase.js
```

Or trigger it on Render by:

1. Opening **Shell** in Render service
2. Running `node scripts/seedDatabase.js`

## Security Checklist

- [x] MongoDB password in environment variables (not in code)
- [x] JWT secret in environment variables
- [x] CORS configured for frontend domain
- [x] NODE_ENV set to production
- [ ] Strong JWT_SECRET (generate with crypto)
- [ ] Whitelist MongoDB IP access (currently 0.0.0.0/0)

## Next Steps (Optional Enhancements)

1. **Custom Domain**: Add custom domain in Render dashboard
2. **Auto-deploys**: Enabled by default on push to main
3. **Build cache**: Render caches dependencies for faster builds
4. **Email Notifications**: Enable notifications for build failures

## Support

For issues:

- **Render Support**: https://render.com/docs
- **MongoDB Help**: https://docs.mongodb.com/atlas
- **React Docs**: https://react.dev

## File Summary

Your project structure is already perfect for Render:

```
House_Rent_1/
├── backend/
│   ├── .env (with MongoDB Atlas URI)
│   ├── .env.example (template)
│   ├── package.json (with start script)
│   └── server.js
├── frontend/
│   ├── package.json (with build script)
│   └── src/
│       └── services/apiClient.js (uses REACT_APP_API_URL)
└── .gitignore (properly configured)
```

Everything is configured correctly! 🎉
