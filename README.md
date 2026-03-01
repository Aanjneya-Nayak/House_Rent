# House Rent Management System - Full Stack MERN Application

A comprehensive real-estate rental platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application enables users to browse rental properties, post listings, manage bookings, and communicate with property owners through an intuitive interface.

## 🌟 Features

### For Users

- **User Authentication**: Secure registration and login with JWT
- **Property Browsing**: Advanced search and filtering capabilities
  - Filter by location, price range, property type
  - Filter by bedrooms, bathrooms, amenities
- **Property Details**: Comprehensive property information with images and amenities
- **Booking System**: Request and manage property bookings
- **User Messages**: Direct messaging with property owners
- **Profile Management**: Update personal information and preferences
- **Booking History**: Track all current and past bookings

### For Property Owners

- **Post Properties**: List rental properties with detailed information
- **Manage Listings**: Edit or delete property listings
- **View Inquiries**: See booking requests and messages
- **Property Analytics**: Track views and interest on listings

### For Administrators

- **Property Approval**: Review and approve/reject property listings
- **User Management**: Manage user accounts and roles
- **Dashboard Analytics**: View platform statistics
- **Booking Management**: Monitor all bookings on the platform
- **Market Trends**: Analyze property prices and market insights

## 📁 Project Structure

```
House_Rent_1/
├── backend/                      # Express.js backend API
│   ├── config/                  # Database configuration
│   ├── models/                  # MongoDB schemas
│   │   ├── User.js
│   │   ├── Property.js
│   │   ├── Booking.js
│   │   └── Message.js
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   ├── bookingController.js
│   │   ├── userController.js
│   │   ├── adminController.js
│   │   └── messageController.js
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   ├── propertyRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── userRoutes.js
│   │   ├── adminRoutes.js
│   │   └── messageRoutes.js
│   ├── middleware/              # Custom middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── server.js                # Main server file
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/                     # React.js frontend
│   ├── public/                  # Static files
│   │   └── index.html
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navigation.js
│   │   │   ├── PropertyCard.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/               # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── PropertyBrowse.js
│   │   │   ├── PropertyDetail.js
│   │   │   ├── Bookings.js
│   │   │   └── Profile.js
│   │   ├── services/            # API calls
│   │   │   ├── apiClient.js
│   │   │   └── api.js
│   │   ├── utils/               # Utilities
│   │   │   └── AuthContext.js
│   │   ├── styles/              # CSS files
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):

```env
MONGODB_URI=mongodb://localhost:27017/houserent
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🗄️ Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: 'user' | 'admin',
  profileImage: String,
  bio: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Properties Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  owner: ObjectId (ref: User),
  propertyType: 'apartment' | 'house' | 'condo' | 'townhouse' | 'villa',
  location: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: { latitude, longitude }
  },
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  squareFeet: Number,
  amenities: [String],
  images: [String],
  availableFrom: Date,
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'inactive',
  rating: Number,
  reviewCount: Number,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings Collection

```javascript
{
  _id: ObjectId,
  property: ObjectId (ref: Property),
  renter: ObjectId (ref: User),
  owner: ObjectId (ref: User),
  checkInDate: Date,
  checkOutDate: Date,
  numberOfGuests: Number,
  totalPrice: Number,
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded',
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed',
  rating: {
    propertyRating: Number,
    ownerRating: Number,
    review: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCryptjs for secure password storage
- **Role-Based Access Control**: Different permissions for users and admins
- **Input Validation**: Express-validator for request validation
- **CORS Configuration**: Restricted cross-origin requests
- **Environment Variables**: Sensitive data stored in .env

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/current-user` - Get current user

### Properties

- `GET /api/properties?city=...&price=...` - Browse properties with filters
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create new property (authenticated)
- `PUT /api/properties/:id` - Update property (owner/admin)
- `DELETE /api/properties/:id` - Delete property (owner/admin)

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings/user-bookings` - Get user bookings
- `PUT /api/bookings/:id/status` - Update booking status
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `POST /api/bookings/:id/review` - Add review

### Users

- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/profile/update` - Update profile

### Admin

- `GET /api/admin/properties/pending` - Get pending properties
- `PUT /api/admin/properties/:id/approve` - Approve property
- `PUT /api/admin/properties/:id/reject` - Reject property
- `GET /api/admin/dashboard/stats` - Get statistics

### Messages

- `GET /api/messages/conversations` - Get all conversations
- `GET /api/messages/:userId` - Get messages with user
- `POST /api/messages` - Send message

## 🛠️ Technologies Used

### Backend

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **BCryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

### Frontend

- **React** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Bootstrap** - CSS framework
- **React Bootstrap** - Bootstrap components
- **React Icons** - Icon library

## 📝 Development Guidelines

### Code Structure

- Controllers handle business logic
- Models define database schemas
- Routes map endpoints to controllers
- Middleware handles authentication and error handling
- Components are reusable and functional

### Best Practices

- Use environment variables for configuration
- Implement proper error handling
- Validate all user inputs
- Follow RESTful API conventions
- Use meaningful variable and function names
- Add comments for complex logic

## 🧪 Testing

To test the API:

1. Use Postman or similar tool
2. Set Authorization header with Bearer token for protected routes
3. Test all CRUD operations for each resource
4. Verify authentication and authorization

## 🐛 Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running locally or check Atlas credentials
- Verify connection string in .env

### CORS Error

- Check CORS_ORIGIN in backend .env matches frontend URL
- Clear browser cache

### Auth Token Issues

- Clear localStorage in browser
- Re-login to get new token
- Check token expiration in .env

## 📚 Additional Features to Implement

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Image upload optimization
- [ ] Advanced search with map integration
- [ ] User reviews and ratings
- [ ] Property comparison
- [ ] Wishlist feature
- [ ] Video tours
- [ ] Real-time notifications with Socket.io

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributors

- Your Name

## 📧 Support

For support, email support@houserent.com or create an issue in the repository.

## 🙏 Acknowledgments

- MongoDB for the database
- React team for the UI library
- Express.js community for the framework
