# Fix Render Split Deployment - Requirements

## Problem Statement
The House Rent application has been deployed to Render as split services (backend and frontend), but registration and login functionality are not working. Users cannot register new accounts or log into existing accounts.

## Root Cause Analysis

### 1. Frontend API Configuration Issue
- **Current State**: `frontend/.env` contains `REACT_APP_API_URL=http://localhost:5000/api`
- **Problem**: Frontend is trying to connect to localhost instead of the production backend URL
- **Impact**: All API calls fail because the backend is not accessible at localhost in production

### 2. CORS Configuration Mismatch
- **Current State**: Backend `CORS_ORIGIN` environment variable may not match the actual frontend URL
- **Problem**: If CORS is not configured correctly, browser blocks API requests
- **Impact**: Registration and login requests are blocked by CORS policy

### 3. Environment Variables Not Set in Render
- **Problem**: Production environment variables may not be properly configured in Render dashboard
- **Impact**: Backend may be using wrong CORS origin or frontend may be using wrong API URL

## User Stories

### US-1: As a developer, I need to configure the frontend to connect to the production backend
**Acceptance Criteria:**
- 1.1: Frontend `.env` file should NOT be committed with production URLs (security)
- 1.2: Frontend build process should use `REACT_APP_API_URL` from Render environment variables
- 1.3: API client should correctly construct requests to production backend URL
- 1.4: Console logs should show correct API URL being used

### US-2: As a developer, I need to ensure CORS is properly configured
**Acceptance Criteria:**
- 2.1: Backend CORS_ORIGIN environment variable must match the frontend URL exactly
- 2.2: CORS should allow credentials (already configured in code)
- 2.3: Preflight OPTIONS requests should succeed
- 2.4: No CORS errors should appear in browser console

### US-3: As a user, I need to be able to register a new account
**Acceptance Criteria:**
- 3.1: Registration form should submit data to production backend
- 3.2: Backend should create user in MongoDB database
- 3.3: Backend should return JWT token upon successful registration
- 3.4: Frontend should store token and redirect to dashboard
- 3.5: Registration should work without any console errors

### US-4: As a user, I need to be able to login to my account
**Acceptance Criteria:**
- 4.1: Login form should submit credentials to production backend
- 4.2: Backend should validate credentials against MongoDB
- 4.3: Backend should return JWT token upon successful login
- 4.4: Frontend should store token and redirect to dashboard
- 4.5: Login should work without any console errors

## Technical Requirements

### TR-1: Environment Variable Configuration
- Backend Render service must have:
  - `MONGODB_URI` - MongoDB connection string
  - `JWT_SECRET` - Secret key for JWT signing
  - `JWT_EXPIRE` - Token expiration (e.g., "7d")
  - `NODE_ENV=production`
  - `CORS_ORIGIN` - Exact frontend URL (e.g., `https://house-rent-frontend.onrender.com`)
  - `PORT=5000`

- Frontend Render service must have:
  - `REACT_APP_API_URL` - Backend API URL (e.g., `https://house-rent-api.onrender.com/api`)

### TR-2: Build Configuration
- Frontend build command must be: `cd frontend && npm install && npm run build`
- Frontend publish directory must be: `frontend/build`
- Backend build command must be: `npm install`
- Backend start command must be: `npm start`

### TR-3: Network Configuration
- Backend must be accessible via HTTPS
- Frontend must be accessible via HTTPS
- Health check endpoint `/api/health` must return 200 status

## Success Criteria

1. Users can successfully register new accounts from the production frontend
2. Users can successfully login with existing credentials from the production frontend
3. No CORS errors appear in browser console
4. JWT tokens are properly generated and stored
5. API requests show correct production URLs in network tab
6. Both services remain deployed and accessible after fixes

## Out of Scope

- Database migration or seeding
- UI/UX improvements
- Performance optimization
- Additional feature development
- Local development environment fixes
