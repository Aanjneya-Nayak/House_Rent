# Split Deployment on Render (Proven & Fast)

Deploy backend and frontend as **2 separate services** on Render - this is the simplest and most reliable approach.

## Why This Works

- ✅ Backend: Web Service (Node.js)
- ✅ Frontend: Static Site (React)
- ✅ No build complexity
- ✅ Both deploy in parallel
- ✅ Total time: ~10-15 minutes

---

## STEP 1: Delete Old Service

1. Go to **[render.com](https://render.com)** dashboard
2. Click on **house-rent-app** service
3. Click **"Settings"** → Scroll to **"Delete Service"** → Confirm

---

## STEP 2: Deploy Backend (Separate Web Service)

### 2a. Create Web Service

1. Go to **[render.com](https://render.com)**
2. Click **"New +"** → **"Web Service"**
3. Connect **Aanjneya-Nayak/House_Rent**
4. Fill in:

| Field          | Value            |
| -------------- | ---------------- |
| Name           | `house-rent-api` |
| Environment    | `Node`           |
| Region         | `Oregon`         |
| Branch         | `main`           |
| Root Directory | `backend`        |
| Build Command  | `npm install`    |
| Start Command  | `npm start`      |

### 2b. Add Environment Variables

```
MONGODB_URI=mongodb+srv://aanjneya2428cseai15_db_user:1nygpJYf4zU1jYfL@cluster0.3nszsqd.mongodb.net/?appName=Cluster0
JWT_SECRET=9d4b155b7812590a6b21c479c6f93e9cfbf90dadfa3db92312ac84935e3d6af8
JWT_EXPIRE=7d
NODE_ENV=production
CORS_ORIGIN=https://house-rent-frontend-8uin.onrender.com
PORT=5000
```

**Note**: Your actual frontend URL is `https://house-rent-frontend-8uin.onrender.com`

### 2c. Deploy

Click **"Create Web Service"** and wait ~5 minutes.

**Save the URL** (e.g., `https://house-rent-api.onrender.com`)

---

## STEP 3: Deploy Frontend (Static Site)

### 3a. Create Static Site

1. Click **"New +"** → **"Static Site"**
2. Connect **Aanjneya-Nayak/House_Rent**
3. Fill in:

| Field             | Value                          |
| ----------------- | ------------------------------ |
| Name              | `house-rent-frontend`          |
| Branch            | `main`                         |
| Build Command     | `cd frontend && npm run build` |
| Publish Directory | `frontend/build`               |

### 3b. Add Environment Variable

```
REACT_APP_API_URL=https://house-rent-api-iz7v.onrender.com/api
```

**Note**: Your actual backend URL is `https://house-rent-api-iz7v.onrender.com`

### 3c. Deploy

Click **"Create Static Site"** and wait ~5 minutes.

---

## STEP 4: Test

### Backend API

Open: `https://house-rent-api-iz7v.onrender.com/api/health`

Expected response:

```json
{
  "success": true,
  "message": "Server is running"
}
```

### Frontend

Open: `https://house-rent-frontend-8uin.onrender.com`

You should see the House Rent homepage!

### Login Test

Use any of these:

- Admin: `admin@example.com` / `admin123`
- User: `jane@example.com` / `password123`
- Owner: `john@example.com` / `password123`

---

## 🎉 Done!

- **Frontend**: https://house-rent-frontend-8uin.onrender.com
- **Backend**: https://house-rent-api-iz7v.onrender.com/api

All future pushes to `main` auto-deploy! ✅
