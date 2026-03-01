# Setup Instructions

Quick setup guide for the House Rent Management System.

## Prerequisites

- Node.js and npm installed
- MongoDB installed locally or Atlas account
- Git installed

## Installation Steps

### 1. Clone or Navigate to Project

```bash
cd House_Rent_1
```

### 2. Install All Dependencies

```bash
npm run install-all
```

Or manually:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
cd ..
```

### 3. Configure Environment Files

**Backend (.env)**

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```
MONGODB_URI=mongodb://localhost:27017/houserent
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Frontend** (optional):

```bash
# Create .env in frontend directory if needed
echo "REACT_APP_API_URL=http://localhost:5000/api" > frontend/.env
```

### 4. Start the Application

**Option A: Run Both Services Concurrently** (requires concurrently)

```bash
npm run dev
```

**Option B: Run Services in Separate Terminals**

Terminal 1 - Backend:

```bash
npm run backend
```

Terminal 2 - Frontend:

```bash
npm run frontend
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## First Time Setup

### 1. Register a User

- Go to http://localhost:3000/register
- Create an account

### 2. Login

- Go to http://localhost:3000/login
- Use your credentials

### 3. Post a Property

- Navigate to Dashboard
- Click "Post Property"
- Fill in property details
- Submit (property will be pending admin approval)

### 4. Admin Operations

- Create another user account with admin role (manually in MongoDB or via API)
- Login with admin account
- Go to admin dashboard
- Approve pending properties

### 5. Test Booking

- Switch to regular user account
- Browse properties
- Click on a property
- Enter dates and request booking

## Useful Commands

```bash
# Install all dependencies
npm run install-all

# Run development servers
npm run dev

# Run only backend
npm run backend

# Run only frontend
npm run frontend

# Build for production
npm run build

# Start production backend
npm start
```

## MongoDB Setup (Local)

### Windows

```powershell
# Using chocolatey
choco install mongodb

# Start MongoDB
mongod
```

### Mac

```bash
# Using Homebrew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

### Linux

```bash
# Ubuntu/Debian
sudo apt install mongodb

# Start MongoDB
sudo systemctl start mongodb
```

### MongoDB Connection

```bash
# Open MongoDB shell
mongo

# Or with newer versions
mongosh

# Create database
use houserent
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

### MongoDB Connection Error

- Ensure MongoDB is running (`mongod` for standalone, or service running)
- Check `MONGODB_URI` in `.env` matches your setup
- Default: `mongodb://localhost:27017/houserent`

### CORS Errors

- Verify `CORS_ORIGIN` in backend `.env` matches frontend URL
- Default: `http://localhost:3000`

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Or for specific module
npm install package-name
```

## Documentation

- [Full README](./README.md) - Comprehensive documentation
- [Backend README](./backend/README.md) - API endpoints and setup
- [Frontend README](./frontend/README.md) - Frontend structure and components
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment instructions

## Next Steps

1. Explore the codebase
2. Read the [README.md](./README.md) for detailed documentation
3. Check [Backend README](./backend/README.md) for API endpoints
4. Review [Frontend README](./frontend/README.md) for component structure
5. Test all features
6. Customize for your needs
7. Deploy to production using [Deployment Guide](./DEPLOYMENT.md)

## Support

For issues or questions:

1. Check troubleshooting section above
2. Review documentation files
3. Check error logs in console
4. MongoDB logs for database issues

Good luck with your House Rent Management System! 🏠
