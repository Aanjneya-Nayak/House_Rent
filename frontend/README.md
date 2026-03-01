# House Rent Frontend

House Rent Management System - React Frontend

## Features

- User registration and authentication
- Property browsing with advanced filters
- Property search by location, price, type, bedrooms, bathrooms
- Interactive property detail pages
- Booking management system
- User profile management
- Messaging system
- Admin dashboard

## Installation

```bash
npm install
```

## Running the Application

Development:

```bash
npm start
```

Build for production:

```bash
npm run build
```

## Configuration

The app connects to the backend API at `http://localhost:5000` by default. You can change this in `src/services/apiClient.js`.

## Project Structure

```
src/
├── components/       # Reusable React components
├── pages/           # Page components
├── services/        # API services
├── utils/           # Utility functions and context
├── styles/          # CSS styling
└── App.js           # Main app component
```

## Key Components

- **Navigation** - Top navigation bar with auth options
- **PropertyCard** - Display individual property listings
- **ProtectedRoute** - Route wrapper for authenticated routes
- **AuthContext** - Global authentication state management

## Pages

- **Home** - Landing page
- **PropertyBrowse** - Search and browse properties
- **PropertyDetail** - View property details and book
- **Dashboard** - User dashboard
- **Bookings** - Manage bookings
- **Profile** - User profile management
- **Login** - User authentication
- **Register** - New user registration
