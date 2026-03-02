# Render Deployment Configuration Guide

## Your Deployment URLs
- **Frontend**: https://house-rent-frontend-8uin.onrender.com
- **Backend**: https://house-rent-api-iz7v.onrender.com

---

## STEP 1: Configure Backend Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on **house-rent-api-iz7v** (your backend service)
3. Click **"Environment"** in the left sidebar
4. Add/Update these environment variables:

### Backend Environment Variables

```
MONGODB_URI=mongodb+srv://aanjneya2428cseai15_db_user:1nygpJYf4zU1jYfL@cluster0.3nszsqd.mongodb.net/?appName=Cluster0

JWT_SECRET=9d4b155b7812590a6b21c479c6f93e9cfbf90dadfa3db92312ac84935e3d6af8

JWT_EXPIRE=7d

NODE_ENV=production

CORS_ORIGIN=https://house-rent-frontend-8uin.onrender.com

PORT=5000
```

**IMPORTANT**: 
- Copy each variable name and value exactly as shown
- No trailing slashes in CORS_ORIGIN
- Click "Save Changes" after adding all variables
- Backend will automatically redeploy (takes ~5-10 minutes)

---

## STEP 2: Configure Frontend Environment Variables

1. In Render Dashboard, click on **house-rent-frontend-8uin** (your frontend service)
2. Click **"Environment"** in the left sidebar
3. Add/Update this environment variable:

### Frontend Environment Variable

```
REACT_APP_API_URL=https://house-rent-api-iz7v.onrender.com/api
```

**IMPORTANT**:
- Must include `/api` at the end
- No trailing slash after `/api`
- Click "Save Changes"
- Frontend will automatically redeploy (takes ~5-10 minutes)

---

## STEP 3: Wait for Deployments

Both services will redeploy automatically after you save the environment variables.

**Monitor deployment status:**
1. Backend service page will show "Deploying..." then "Live"
2. Frontend service page will show "Deploying..." then "Live"
3. Wait until both show "Live" status (total ~10-15 minutes)

---

## STEP 4: Verify Backend is Working

1. Open this URL in your browser:
   ```
   https://house-rent-api-iz7v.onrender.com/api/health
   ```

2. You should see:
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

3. If you see this, backend is working! ✅

**If you see an error:**
- Check Render backend logs (Logs tab in backend service)
- Verify all environment variables are set correctly
- Try manual redeploy (Manual Deploy button)

---

## STEP 5: Verify Frontend is Working

1. Open this URL in your browser:
   ```
   https://house-rent-frontend-8uin.onrender.com
   ```

2. You should see the House Rent homepage

3. Open browser DevTools (F12) and check Console tab
   - Should be no errors
   - If you see CORS errors, double-check CORS_ORIGIN in backend

---

## STEP 6: Test Registration

1. Go to: https://house-rent-frontend-8uin.onrender.com
2. Click "Register" or navigate to registration page
3. Open browser DevTools (F12) → Network tab
4. Fill in the registration form:
   - First Name: Test
   - Last Name: User
   - Email: testuser@example.com
   - Phone: 1234567890
   - Password: password123
5. Click Submit
6. In Network tab, look for request to `/api/auth/register`
7. Check:
   - Status should be **201**
   - Response should contain `"success": true` and a `"token"`
8. You should be redirected to dashboard

**If registration fails:**
- Check Console tab for CORS errors
- Check Network tab for the exact error
- Verify REACT_APP_API_URL is set correctly in frontend
- Verify CORS_ORIGIN is set correctly in backend

---

## STEP 7: Test Login

1. Go to login page
2. Open browser DevTools (F12) → Network tab
3. Enter credentials:
   - Email: testuser@example.com (from Step 6)
   - Password: password123
4. Click Submit
5. In Network tab, look for request to `/api/auth/login`
6. Check:
   - Status should be **200**
   - Response should contain `"success": true` and a `"token"`
7. You should be redirected to dashboard

**Alternative test** (if registration didn't work):
Try these pre-seeded accounts:
- Admin: admin@example.com / admin123
- User: jane@example.com / password123
- Owner: john@example.com / password123

---

## Troubleshooting

### CORS Error in Console
**Error**: "Access to XMLHttpRequest blocked by CORS policy"

**Fix**:
1. Go to backend service in Render
2. Check CORS_ORIGIN is exactly: `https://house-rent-frontend-8uin.onrender.com`
3. No trailing slash, must be HTTPS
4. Save and wait for redeploy

### Network Error / Failed to Fetch
**Error**: API requests fail with network error

**Fix**:
1. Go to frontend service in Render
2. Check REACT_APP_API_URL is exactly: `https://house-rent-api-iz7v.onrender.com/api`
3. Must include `/api` at the end
4. Save and wait for redeploy

### 500 Internal Server Error
**Error**: API returns 500 status

**Fix**:
1. Check backend Render logs for error details
2. Verify MONGODB_URI is correct
3. Verify JWT_SECRET is set
4. Try manual redeploy of backend

### Backend Health Check Fails
**Error**: Health endpoint doesn't respond

**Fix**:
1. Check backend service is "Live" in Render
2. Check backend logs for startup errors
3. Verify all environment variables are set
4. Try manual redeploy

---

## Quick Verification Checklist

- [ ] Backend environment variables set (6 variables)
- [ ] Frontend environment variable set (1 variable)
- [ ] Both services show "Live" status
- [ ] Backend health check returns 200
- [ ] Frontend loads without console errors
- [ ] Registration works (201 status)
- [ ] Login works (200 status)
- [ ] No CORS errors in console

---

## Summary

Your configuration:
- **Backend URL**: https://house-rent-api-iz7v.onrender.com
- **Frontend URL**: https://house-rent-frontend-8uin.onrender.com
- **JWT Secret**: Generated and ready to use
- **CORS**: Configured for your frontend domain

After setting the environment variables in Render dashboard, both services will redeploy automatically and your registration/login should work!

---

## Need Help?

If you encounter issues:
1. Check the Troubleshooting section above
2. Review Render logs for both services
3. Verify all environment variables are exactly as shown
4. Ensure both services completed deployment successfully

The most common issues are:
- Typos in environment variable values
- Missing `/api` suffix in REACT_APP_API_URL
- Trailing slashes in URLs
- Wrong protocol (HTTP vs HTTPS)
