# Architecture & Configuration Diagram

## Current Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                      │
│                                                             │
│  https://house-rent-frontend-8uin.onrender.com             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 1. User clicks "Register" or "Login"
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Static Site)                   │
│                  house-rent-frontend-8uin                   │
│                                                             │
│  React App reads environment variable:                      │
│  ┌────────────────────────────────────────────────────┐    │
│  │ REACT_APP_API_URL =                                │    │
│  │ https://house-rent-api-iz7v.onrender.com/api       │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  Uses this URL to make API calls                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 2. POST /api/auth/register
                       │    or POST /api/auth/login
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Web Service)                    │
│                    house-rent-api-iz7v                      │
│                                                             │
│  Express.js checks CORS:                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │ CORS_ORIGIN =                                      │    │
│  │ https://house-rent-frontend-8uin.onrender.com      │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  If CORS matches, processes request:                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │ JWT_SECRET = 9d4b155b7812590a6b21c479c6f93e9c...   │    │
│  │ (used to sign authentication tokens)               │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  Connects to database:                                      │
│  ┌────────────────────────────────────────────────────┐    │
│  │ MONGODB_URI = mongodb+srv://...                    │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 3. Returns JWT token
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                      │
│                                                             │
│  Stores token in localStorage                               │
│  Redirects to dashboard                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## What Was Broken

```
❌ BEFORE FIX:

Frontend tries to call:
http://localhost:5000/api  ← WRONG! Localhost doesn't exist in production

Backend CORS allows:
http://localhost:3000  ← WRONG! Doesn't match production frontend URL

Backend JWT_SECRET:
undefined  ← WRONG! Can't generate tokens without secret
```

---

## What Gets Fixed

```
✅ AFTER FIX:

Frontend calls:
https://house-rent-api-iz7v.onrender.com/api  ← CORRECT! Production backend

Backend CORS allows:
https://house-rent-frontend-8uin.onrender.com  ← CORRECT! Matches frontend

Backend JWT_SECRET:
9d4b155b7812590a6b21c479c6f93e9c...  ← CORRECT! Can generate tokens
```

---

## Configuration Flow

```
Step 1: Configure Backend
┌─────────────────────────────────────┐
│  Render Dashboard                   │
│  → house-rent-api-iz7v              │
│  → Environment                      │
│  → Add 6 variables                  │
│  → Save Changes                     │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Render automatically redeploys     │
│  Backend with new environment vars  │
│  (takes ~5 minutes)                 │
└─────────────────────────────────────┘

Step 2: Configure Frontend
┌─────────────────────────────────────┐
│  Render Dashboard                   │
│  → house-rent-frontend-8uin         │
│  → Environment                      │
│  → Add 1 variable                   │
│  → Save Changes                     │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Render automatically redeploys     │
│  Frontend with new environment var  │
│  (takes ~5 minutes)                 │
└─────────────────────────────────────┘

Step 3: Test
┌─────────────────────────────────────┐
│  User visits frontend               │
│  → Clicks Register                  │
│  → Frontend calls backend API       │
│  → Backend checks CORS ✅           │
│  → Backend creates user ✅          │
│  → Backend generates JWT ✅         │
│  → Returns token to frontend ✅     │
│  → User redirected to dashboard ✅  │
└─────────────────────────────────────┘
```

---

## Environment Variable Dependencies

```
Frontend depends on:
┌──────────────────────────────────┐
│ REACT_APP_API_URL                │
│ ↓                                │
│ Points to backend API endpoint   │
└──────────────────────────────────┘

Backend depends on:
┌──────────────────────────────────┐
│ CORS_ORIGIN                      │
│ ↓                                │
│ Must match frontend URL exactly  │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│ JWT_SECRET                       │
│ ↓                                │
│ Used to sign authentication      │
│ tokens for login/register        │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│ MONGODB_URI                      │
│ ↓                                │
│ Connects to database to store    │
│ and retrieve user data           │
└──────────────────────────────────┘
```

---

## Request Flow (After Fix)

```
1. User Registration Flow:

Browser                Frontend              Backend              Database
  |                       |                     |                     |
  |--Register Form------->|                     |                     |
  |                       |                     |                     |
  |                       |--POST /api/auth/--->|                     |
  |                       |   register          |                     |
  |                       |   (with user data)  |                     |
  |                       |                     |                     |
  |                       |                     |--Check CORS-------->|
  |                       |                     |  (matches? ✅)      |
  |                       |                     |                     |
  |                       |                     |--Create User------->|
  |                       |                     |                     |
  |                       |                     |<--User Created------|
  |                       |                     |                     |
  |                       |                     |--Generate JWT------>|
  |                       |                     |  (using JWT_SECRET) |
  |                       |                     |                     |
  |                       |<--Return Token------|                     |
  |                       |   {token: "..."}    |                     |
  |                       |                     |                     |
  |<--Store Token---------|                     |                     |
  |   Redirect Dashboard  |                     |                     |
  |                       |                     |                     |
```

---

## Security Flow

```
CORS Protection:
┌─────────────────────────────────────────────────────────┐
│ Browser sends request with Origin header:               │
│ Origin: https://house-rent-frontend-8uin.onrender.com   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│ Backend checks CORS_ORIGIN environment variable:        │
│ CORS_ORIGIN: https://house-rent-frontend-8uin...        │
│                                                          │
│ If match: ✅ Allow request                              │
│ If no match: ❌ Block request (CORS error)              │
└─────────────────────────────────────────────────────────┘

JWT Authentication:
┌─────────────────────────────────────────────────────────┐
│ User logs in with email/password                        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│ Backend validates credentials against database          │
│ If valid: Generate JWT token using JWT_SECRET           │
│                                                          │
│ Token = sign({userId, role}, JWT_SECRET, {exp: 7d})    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│ Frontend stores token in localStorage                   │
│ Includes token in all future API requests:              │
│ Authorization: Bearer <token>                           │
└─────────────────────────────────────────────────────────┘
```

---

## Why This Fix Works

1. **Frontend knows where to send requests**
   - `REACT_APP_API_URL` tells React where the backend is
   - Without it, frontend tries localhost (doesn't exist in production)

2. **Backend allows frontend requests**
   - `CORS_ORIGIN` tells Express which origin to trust
   - Without it, browser blocks all API calls (security feature)

3. **Backend can generate authentication tokens**
   - `JWT_SECRET` is used to cryptographically sign tokens
   - Without it, login/register can't create valid tokens

4. **Backend can access database**
   - `MONGODB_URI` connects to MongoDB Atlas
   - Without it, can't store or retrieve user data

---

## Summary

```
Configuration Location: Render Dashboard (not in code)
Time to Configure: ~5 minutes
Time to Deploy: ~10 minutes (automatic)
Code Changes Required: None ✅
Total Time to Fix: ~15 minutes
```

**Start configuring: [COPY_PASTE_VALUES.md](COPY_PASTE_VALUES.md)**
