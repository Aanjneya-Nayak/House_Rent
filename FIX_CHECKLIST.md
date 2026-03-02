# Fix Deployment - Quick Checklist

## ✅ What to Do Right Now

### 1. Configure Backend Environment Variables
- [ ] Go to: https://dashboard.render.com
- [ ] Click: **house-rent-api-iz7v**
- [ ] Click: **Environment** (left sidebar)
- [ ] Add these 6 variables:

```
MONGODB_URI=mongodb+srv://aanjneya2428cseai15_db_user:1nygpJYf4zU1jYfL@cluster0.3nszsqd.mongodb.net/?appName=Cluster0
JWT_SECRET=9d4b155b7812590a6b21c479c6f93e9cfbf90dadfa3db92312ac84935e3d6af8
JWT_EXPIRE=7d
NODE_ENV=production
CORS_ORIGIN=https://house-rent-frontend-8uin.onrender.com
PORT=5000
```

- [ ] Click: **Save Changes**
- [ ] Wait for: Status changes to "Live" (~5 min)

---

### 2. Configure Frontend Environment Variable
- [ ] Go to: https://dashboard.render.com
- [ ] Click: **house-rent-frontend-8uin**
- [ ] Click: **Environment** (left sidebar)
- [ ] Add this 1 variable:

```
REACT_APP_API_URL=https://house-rent-api-iz7v.onrender.com/api
```

- [ ] Click: **Save Changes**
- [ ] Wait for: Status changes to "Live" (~5 min)

---

### 3. Test Backend
- [ ] Open: https://house-rent-api-iz7v.onrender.com/api/health
- [ ] Verify: See `{"success": true, "message": "Server is running"}`

---

### 4. Test Frontend
- [ ] Open: https://house-rent-frontend-8uin.onrender.com
- [ ] Verify: Homepage loads
- [ ] Press: F12 (open DevTools)
- [ ] Check: Console tab has no red errors

---

### 5. Test Registration
- [ ] Click: Register button
- [ ] Fill form:
  - First Name: Test
  - Last Name: User
  - Email: test@example.com
  - Phone: 1234567890
  - Password: password123
- [ ] Click: Submit
- [ ] Verify: Redirected to dashboard
- [ ] Check: No errors in console

---

### 6. Test Login
- [ ] Click: Login button
- [ ] Enter:
  - Email: test@example.com
  - Password: password123
- [ ] Click: Submit
- [ ] Verify: Redirected to dashboard
- [ ] Check: No errors in console

---

## 🎉 Success!

If all checkboxes are checked, your deployment is fixed!

Your live app: https://house-rent-frontend-8uin.onrender.com

---

## ❌ If Something Fails

See troubleshooting in: **DEPLOYMENT_CONFIGURATION.md**

Common issues:
- CORS error → Check CORS_ORIGIN matches frontend URL exactly
- Network error → Check REACT_APP_API_URL includes `/api` at end
- 500 error → Check backend logs in Render dashboard
- Health check fails → Verify all 6 backend variables are set

---

## 📚 Reference Documents

- **QUICK_FIX.md** - Fastest solution (what you're doing now)
- **RENDER_SETUP_GUIDE.md** - Visual step-by-step walkthrough
- **DEPLOYMENT_CONFIGURATION.md** - Detailed guide with troubleshooting
- **DEPLOYMENT_SUMMARY.md** - Overview of what was wrong and how to fix

---

**Time to complete: ~10 minutes**
**Difficulty: Easy (just copy-paste environment variables)**
