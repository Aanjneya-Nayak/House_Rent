#!/bin/bash
# Build script for unified deployment
# This builds the frontend and moves it into backend's public folder

set -e

echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Moving frontend build to backend..."
rm -rf backend/public
mv frontend/build backend/public

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "✅ Build complete! Ready for deployment."
