# Render Setup Guide - Visual Walkthrough

## Overview
Your app is deployed but not working because environment variables need to be configured in Render dashboard.

```
┌─────────────────────────────────────────┐
│  Frontend (Static Site)                 │
│  house-rent-frontend-8uin               │
│  https://house-rent-frontend-8uin       │
│         .onrender.com                   │
│                                         │
│  Needs: REACT_APP_API_URL               │
└──────────────┬──────────────────────────┘
               │
               │ API Calls
               │
               ▼
┌─────────────────────────────────────────┐
│  Backend (Web Service)                  │
│  house-rent-api-iz7v                    │
│  https://house-rent-api-iz7v            │
│         .onrender.com                   │
│                                         │
│  Needs: 6 environment variables         │
└─────────────────────────────────────────┘
```

---

## Step-by-Step Instructions

### STEP 1: Open Render Dashboard
1. Go to: https://dashboard.render.com
2. Log in with your account
3. You should see both services listed

---

### STEP 2: Configure Backend (house-rent-api-iz7v)

#### 2.1: Navigate to Backend Service
- Click on **house-rent-api-iz7v** in your dashboard

#### 2.2: Open Environment Settings
- In the left sidebar, click **"Environment"**

#### 2.3: Add Environment Variables
Click **"Add Environment Variable"** and add each of these:

**Variable 1:**
- Key: `MONGODB_URI`
- Value: `mongodb+srv://aanjneya2428cseai15_db_user:1nygpJYf4zU1jYfL@cluster0.3nszsqd.mongodb.net/?appName=Cluster0`

**Variable 2:**
- Key: `JWT_SECRET`
- Value: `9d4b155b7812590a6b21c479c6f93e9cfbf90dadfa3db92312ac84935e3d6af8`

**Variable 3:**
- Key: `JWT_EXPIRE`
- Value: `7d`

**Variable 4:**
- Key: `NODE_ENV`
- Value: `production`

**Variable 5:**
- Key: `CORS_ORIGIN`
- Value: `https://house-rent-frontend-8uin.onrender.com`

**Variable 6:**
- Key: `PORT`
- Value: `5000`

#### 2.4: Save Changes
- Click **"Save Changes"** button
- Render will automatically start redeploying your backend
- Wait for deployment to complete (status will change from "Deploying" to "Live")
- This takes about 5-10 minutes

---

### STEP 3: Configure Frontend (house-rent-frontend-8uin)

#### 3.1: Navigate to Frontend Service
- Go back to dashboard
- Click on **house-rent-frontend-8uin**

#### 3.2: Open Environment Settings
- In the left sidebar, click **"Environment"**

#### 3.3: Add Environment Variable
Click **"Add Environment Variable"** and add:

**Variable 1:**
- Key: `REACT_APP_API_URL`
- Value: `https://house-rent-api-iz7v.onrender.com/api`

#### 3.4: Save Changes
- Click **"Save Changes"** button
- Render will automatically start redeploying your frontend
- Wait for deployment to complete (status will change from "Deploying" to "Live")
- This takes about 5-10 minutes

---

### STEP 4: Verify Everything Works

#### 4.1: Test Backend Health
1. Open a new browser tab
2. Go to: `https://house-rent-api-iz7v.onrender.com/api/health`
3. You should see:
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```
4. ✅ If you see this, backend is working!

#### 4.2: Test Frontend
1. Open a new browser tab
2. Go to: `https://house-rent-frontend-8uin.onrender.com`
3. You should see the House Rent homepage
4. Press F12 to open DevTools
5. Check the Console tab - should be no red errors
6. ✅ If homepage loads, frontend is working!

#### 4.3: Test Registration
1. On the frontend, click "Register" or go to registration page
2. Fill in the form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Phone: 1234567890
   - Password: password123
3. Click Submit
4. You should be redirected to the dashboard
5. ✅ If registration works, everything is fixed!

#### 4.4: Test Login
1. Go to login page
2. Enter:
   - Email: test@example.com
   - Password: password123
3. Click Submit
4. You should be redirected to the dashboard
5. ✅ If login works, you're all set!

---

## Common Issues and Fixes

### Issue 1: CORS Error in Browser Console
**Symptom**: Console shows "blocked by CORS policy"

**Fix**:
1. Go to backend service → Environment
2. Check `CORS_ORIGIN` is exactly: `https://house-rent-frontend-8uin.onrender.com`
3. No trailing slash!
4. Save and wait for redeploy

### Issue 2: Network Error / Cannot Connect
**Symptom**: API requests fail with network error

**Fix**:
1. Go to frontend service → Environment
2. Check `REACT_APP_API_URL` is exactly: `https://house-rent-api-iz7v.onrender.com/api`
3. Must include `/api` at the end!
4. Save and wait for redeploy

### Issue 3: Backend Health Check Fails
**Symptom**: Health endpoint doesn't respond or shows error

**Fix**:
1. Go to backend service → Logs tab
2. Look for error messages
3. Verify all 6 environment variables are set correctly
4. Try clicking "Manual Deploy" button

### Issue 4: 500 Internal Server Error
**Symptom**: API returns 500 status code

**Fix**:
1. Check backend Logs for detailed error
2. Verify `MONGODB_URI` is correct
3. Verify `JWT_SECRET` is set
4. Check database is accessible

---

## Checklist

Before testing, verify:
- [ ] Backend has 6 environment variables set
- [ ] Frontend has 1 environment variable set
- [ ] Both services show "Live" status (not "Deploying")
- [ ] Backend health check returns JSON response
- [ ] Frontend homepage loads without errors

After testing, verify:
- [ ] Registration creates new user successfully
- [ ] Login authenticates user successfully
- [ ] No CORS errors in browser console
- [ ] User is redirected to dashboard after login/register

---

## Important Notes

1. **Environment variables are set in Render dashboard, not in code**
   - The `.env` files in your repository are for local development only
   - Production uses Render's environment variables

2. **Automatic redeployment**
   - When you save environment variables, Render automatically redeploys
   - You don't need to manually trigger deployment
   - Wait for "Live" status before testing

3. **CORS is strict**
   - `CORS_ORIGIN` must match frontend URL exactly
   - No trailing slashes
   - Must use HTTPS, not HTTP

4. **API URL must include /api**
   - Frontend needs: `https://house-rent-api-iz7v.onrender.com/api`
   - Not just: `https://house-rent-api-iz7v.onrender.com`

---

## Success!

Once all tests pass, your app is fully deployed and working! 🎉

Your live URLs:
- **Frontend**: https://house-rent-frontend-8uin.onrender.com
- **Backend API**: https://house-rent-api-iz7v.onrender.com/api

Share the frontend URL with users to access your app!
