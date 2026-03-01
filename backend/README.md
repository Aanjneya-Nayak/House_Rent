# House Rent Backend API

MERN stack backend for House Rent Management System.

## Features

- User registration and authentication with JWT
- Property listing with advanced search and filters
- Booking management system
- Admin approval workflow
- Real-time messaging between users
- Role-based access control
- MongoDB database integration

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the backend directory:

```
MONGODB_URI=mongodb://localhost:27017/houserent
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Running the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/current-user` - Get current user

### Properties

- `GET /api/properties` - Get all properties with filters
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings/user-bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/status` - Update booking status
- `POST /api/bookings/:id/review` - Add review

### Users

- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/profile/update` - Update profile

### Admin

- `GET /api/admin/properties/pending` - Get pending properties
- `PUT /api/admin/properties/:id/approve` - Approve property
- `PUT /api/admin/properties/:id/reject` - Reject property
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

### Messages

- `GET /api/messages/conversations` - Get message conversations
- `GET /api/messages/:otherUserId` - Get messages with user
- `POST /api/messages` - Send message
