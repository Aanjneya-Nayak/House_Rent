# Fix Render Split Deployment - Design Document

## Overview
This design addresses the deployment issues preventing registration and login functionality in the split Render deployment. The solution focuses on proper environment variable configuration and ensuring correct API communication between frontend and frontend services.

## Architecture

### Current Deployment Structure
```
┌─────────────────────────────────────┐
│  Render Static Site                 │
│  house-rent-frontend                │
│  https://house-rent-frontend        │
│         .onrender.com               │
│                                     │
│  - Serves React build files         │
│  - No server-side logic             │
└──────────────┬──────────────────────┘
               │
               │ API Calls (HTTPS)
               │
               ▼
┌─────────────────────────────────────┐
│  Render Web Service                 │
│  house-rent-api                     │
│  https://house-rent-api             │
│         .onrender.com               │
│                                     │
│  - Express.js backend               │
│  - MongoDB connection               │
│  - JWT authentication               │
└─────────────────────────────────────┘
```

## Problem Analysis

### Issue 1: Frontend Environment Configuration
**Problem**: The `frontend/.env` file contains `http://localhost:5000/api`, which is hardcoded for local development.

**Why it fails in production**:
- React build process reads `.env` file at build time
- The localhost URL gets baked into the production build
- Browser tries to connect to localhost, which doesn't exist in production

**Solution**: 
- Keep `frontend/.env` for local development only
- Configure `REACT_APP_API_URL` as environment variable in Render dashboard
- Render will inject this at build time

### Issue 2: CORS Configuration
**Problem**: Backend CORS_ORIGIN may not match the actual frontend URL.

**Why it fails**:
- Browser enforces Same-Origin Policy
- Backend must explicitly allow the frontend origin
- Mismatch causes all API requests to be blocked

**Solution**:
- Set `CORS_ORIGIN` environment variable in backend Render service
- Must match exact frontend URL including protocol and domain

### Issue 3: Environment Variable Precedence
**Problem**: `.env` files in repository override Render environment variables.

**Solution**:
- `.env` files are for local development
- Render environment variables take precedence in production
- Ensure all required variables are set in Render dashboard

## Implementation Strategy

### Phase 1: Verify Current Deployment URLs
1. Identify actual backend URL from Render dashboard
2. Identify actual frontend URL from Render dashboard
3. Document both URLs for configuration

### Phase 2: Configure Backend Environment Variables
Set the following in Render backend service (house-rent-api):
- `MONGODB_URI` - Existing MongoDB connection
- `JWT_SECRET` - Generate secure random string
- `JWT_EXPIRE=7d`
- `NODE_ENV=production`
- `CORS_ORIGIN` - Exact frontend URL
- `PORT=5000`

### Phase 3: Configure Frontend Environment Variables
Set the following in Render frontend service (house-rent-frontend):
- `REACT_APP_API_URL` - Backend URL with `/api` suffix

### Phase 4: Trigger Redeployment
1. Backend service will auto-redeploy when environment variables change
2. Frontend service will auto-redeploy when environment variables change
3. Wait for both deployments to complete

### Phase 5: Verification
1. Check backend health endpoint
2. Test registration from frontend
3. Test login from frontend
4. Verify no CORS errors in console

## Configuration Details

### Backend Environment Variables (Render Dashboard)
```
MONGODB_URI=mongodb+srv://aanjneya2428cseai15_db_user:1nygpJYf4zU1jYfL@cluster0.3nszsqd.mongodb.net/?appName=Cluster0
JWT_SECRET=[generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
JWT_EXPIRE=7d
NODE_ENV=production
CORS_ORIGIN=https://house-rent-frontend.onrender.com
PORT=5000
```

### Frontend Environment Variables (Render Dashboard)
```
REACT_APP_API_URL=https://house-rent-api.onrender.com/api
```

**Note**: Replace the URLs above with your actual Render service URLs.

## Code Changes Required

### No Code Changes Needed
The existing code is correctly structured to use environment variables:

1. **Backend CORS** (`backend/server.js`):
   ```javascript
   cors({
     origin: process.env.CORS_ORIGIN || "http://localhost:3000",
     credentials: true,
   })
   ```
   ✅ Already uses `process.env.CORS_ORIGIN`

2. **Frontend API Client** (`frontend/src/services/apiClient.js`):
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";
   ```
   ✅ Already uses `process.env.REACT_APP_API_URL`

3. **JWT Configuration** (`backend/controllers/authController.js`):
   ```javascript
   jwt.sign({ userId, role }, process.env.JWT_SECRET, {
     expiresIn: process.env.JWT_EXPIRE || "7d",
   })
   ```
   ✅ Already uses `process.env.JWT_SECRET` and `process.env.JWT_EXPIRE`

## Testing Strategy

### Manual Testing Checklist

#### Backend Health Check
1. Open: `https://house-rent-api.onrender.com/api/health`
2. Expected response:
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

#### Frontend Access
1. Open: `https://house-rent-frontend.onrender.com`
2. Should load homepage without errors
3. Check browser console for any errors

#### Registration Test
1. Navigate to registration page
2. Fill in registration form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Phone: 1234567890
   - Password: password123
3. Submit form
4. Check browser Network tab:
   - Request URL should be `https://house-rent-api.onrender.com/api/auth/register`
   - Status should be 201
   - Response should contain token
5. Should redirect to dashboard
6. Check browser console for errors

#### Login Test
1. Navigate to login page
2. Enter credentials:
   - Email: test@example.com
   - Password: password123
3. Submit form
4. Check browser Network tab:
   - Request URL should be `https://house-rent-api.onrender.com/api/auth/login`
   - Status should be 200
   - Response should contain token
5. Should redirect to dashboard
6. Check browser console for errors

#### CORS Verification
1. Open browser DevTools
2. Go to Console tab
3. Should NOT see errors like:
   - "Access to XMLHttpRequest at '...' from origin '...' has been blocked by CORS policy"
   - "No 'Access-Control-Allow-Origin' header is present"

## Troubleshooting Guide

### Issue: CORS Error in Console
**Symptom**: "Access to XMLHttpRequest blocked by CORS policy"

**Solution**:
1. Verify `CORS_ORIGIN` in backend matches frontend URL exactly
2. Check for trailing slashes (should not have trailing slash)
3. Ensure protocol is HTTPS, not HTTP
4. Redeploy backend after changing CORS_ORIGIN

### Issue: Network Error / Failed to Fetch
**Symptom**: API requests fail with network error

**Solution**:
1. Verify `REACT_APP_API_URL` is set correctly in frontend
2. Check backend is running: visit health endpoint
3. Verify backend URL includes `/api` suffix in frontend env var
4. Redeploy frontend after changing REACT_APP_API_URL

### Issue: 401 Unauthorized
**Symptom**: Login/register returns 401 status

**Solution**:
1. Verify `JWT_SECRET` is set in backend
2. Check MongoDB connection is working
3. Verify user credentials are correct (for login)

### Issue: 500 Internal Server Error
**Symptom**: API returns 500 status

**Solution**:
1. Check Render backend logs for error details
2. Verify `MONGODB_URI` is correct and accessible
3. Verify all required environment variables are set

## Deployment Checklist

- [ ] Identify actual backend URL from Render
- [ ] Identify actual frontend URL from Render
- [ ] Generate secure JWT_SECRET
- [ ] Set all backend environment variables in Render
- [ ] Set frontend environment variable in Render
- [ ] Wait for backend redeployment
- [ ] Wait for frontend redeployment
- [ ] Test backend health endpoint
- [ ] Test frontend loads
- [ ] Test registration flow
- [ ] Test login flow
- [ ] Verify no CORS errors
- [ ] Document final URLs

## Security Considerations

1. **JWT_SECRET**: Must be a cryptographically secure random string
   - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Never commit to repository
   - Store only in Render environment variables

2. **MongoDB Credentials**: Already in connection string
   - Consider rotating if exposed in public repository
   - Use MongoDB Atlas IP whitelist for additional security

3. **CORS Configuration**: Only allow specific frontend origin
   - Never use `*` wildcard in production
   - Exact URL match required

4. **HTTPS**: Both services must use HTTPS
   - Render provides this automatically
   - Never downgrade to HTTP

## Success Metrics

1. ✅ Backend health endpoint returns 200
2. ✅ Frontend loads without console errors
3. ✅ Registration creates user and returns token
4. ✅ Login validates credentials and returns token
5. ✅ No CORS errors in browser console
6. ✅ API requests use correct production URLs
7. ✅ JWT tokens are properly generated and validated

## Rollback Plan

If issues persist after configuration:
1. Check Render logs for both services
2. Verify environment variables are saved correctly
3. Try manual redeploy of both services
4. If needed, can revert to unified deployment using `render.yaml`

## Future Improvements

1. Add health check monitoring
2. Implement proper logging service
3. Add error tracking (e.g., Sentry)
4. Set up automated testing in CI/CD
5. Add rate limiting for API endpoints
6. Implement refresh token mechanism
