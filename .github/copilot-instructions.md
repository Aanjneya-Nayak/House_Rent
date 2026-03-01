<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# House Rent Management System - Project Guidelines

## Project Overview
Full-stack MERN application for rental property management with user authentication, property listings, bookings, and admin moderation.

## Architecture
- **Backend**: Express.js REST API with MongoDB
- **Frontend**: React.js with Bootstrap
- **Database**: MongoDB with Mongoose ODM

## Directory Structure
- `/backend` - Server-side application
- `/frontend` - Client-side application

## Backend Development

### Models
Located in `/backend/models/`:
- User.js - User schema with authentication
- Property.js - Property listings
- Booking.js - Booking records
- Message.js - User messages

### Controllers
Located in `/backend/controllers/`:
- authController - Authentication logic
- propertyController - Property CRUD operations
- bookingController - Booking management
- userController - User profiles
- adminController - Admin operations
- messageController - Messaging system

### Routes
Located in `/backend/routes/`:
- authRoutes - Authentication endpoints
- propertyRoutes - Property endpoints
- bookingRoutes - Booking endpoints
- userRoutes - User endpoints
- adminRoutes - Admin endpoints
- messageRoutes - Message endpoints

### Middleware
Located in `/backend/middleware/`:
- auth.js - JWT verification and role-based access
- errorHandler.js - Error handling and async wrappers

## Frontend Development

### Components
Located in `/frontend/src/components/`:
- Navigation.js - Navigation bar
- PropertyCard.js - Property listing card
- ProtectedRoute.js - Route protection wrapper

### Pages
Located in `/frontend/src/pages/`:
- Home.js - Landing page
- Login.js - Login form
- Register.js - Registration form
- Dashboard.js - User dashboard
- PropertyBrowse.js - Property search
- PropertyDetail.js - Property details
- Bookings.js - Booking management
- Profile.js - User profile

### Services
Located in `/frontend/src/services/`:
- apiClient.js - Axios configuration with interceptors
- api.js - API service functions

### Utilities
Located in `/frontend/src/utils/`:
- AuthContext.js - Authentication context provider

## Key Implementation Details

### Authentication Flow
1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent in Authorization header for protected routes
5. Token verified in middleware

### Property Workflow
1. User creates property (pending status)
2. Admin reviews and approves
3. Property becomes visible to all users
4. Users can book approved properties

### Booking Workflow
1. User requests booking with dates
2. Booking created in database
3. Owner receives notification
4. Owner can confirm/reject
5. After checkout, user can leave review

## Code Conventions

### Naming
- Controllers: PascalCase (e.g., authController)
- Functions: camelCase (e.g., getProperties)
- Constants: UPPER_SNAKE_CASE
- Components: PascalCase (e.g., PropertyCard)

### API Responses
```javascript
Success: { success: true, message: "...", data: {...} }
Error: { success: false, message: "..." }
```

### Error Handling
- Use try-catch in controllers
- Return appropriate HTTP status codes
- Include error messages for debugging

## Environment Variables

### Backend (.env)
```
MONGODB_URI=connection_string
JWT_SECRET=secret_key
JWT_EXPIRE=7d
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Database Indexing
- Location and status queries indexed
- Owner and user queries indexed
- Booking status queries indexed

## Security Considerations
- Passwords hashed with bcryptjs
- JWT for stateless authentication
- Role-based access control (RBAC)
- Input validation on all endpoints
- CORS configured for frontend URL

## Testing Checklist
- [ ] User registration/login
- [ ] Property CRUD operations
- [ ] Property search with filters
- [ ] Booking creation and cancellation
- [ ] Admin property approval
- [ ] User profile updates
- [ ] Message sending/receiving
- [ ] Role-based access control
- [ ] Error handling

## Performance Optimization
- MongoDB indexes for frequent queries
- Pagination for large result sets
- JWT token expiration
- Image optimization recommendations
- API response caching

## Deployment Notes
- Set NODE_ENV=production
- Use environment variables for secrets
- Enable HTTPS
- Configure proper CORS origins
- Set up MongoDB Atlas or self-hosted instance

## Common API Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

This document should be referenced when adding features or maintaining the codebase.
