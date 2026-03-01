# API Testing Guide

Guide for testing the House Rent Management System API using Postman or similar tools.

## Base URL

```
http://localhost:5000/api
```

## Authentication Headers

```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

## Testing Scenarios

### 1. User Registration

**Endpoint**: `POST /auth/register`

**Request Body**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

**Expected Response**:

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "firstName": "John",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 2. User Login

**Endpoint**: `POST /auth/login`

**Request Body**:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response**:

```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### 3. Get Current User (Protected)

**Endpoint**: `GET /auth/current-user`

**Headers**: Must include Authorization header with token

**Expected Response**:

```json
{
  "success": true,
  "user": { ... }
}
```

### 4. Create Property (Protected)

**Endpoint**: `POST /properties`

**Request Body**:

```json
{
  "title": "Beautiful 2-bed Apartment",
  "description": "A cozy apartment in the heart of the city...",
  "propertyType": "apartment",
  "location": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "price": 2500,
  "bedrooms": 2,
  "bathrooms": 1,
  "squareFeet": 800,
  "amenities": ["wifi", "parking", "gym"],
  "availableFrom": "2024-04-01",
  "leaseTermMonths": 12
}
```

**Expected Response**:

```json
{
  "success": true,
  "message": "Property created and pending approval",
  "property": { ... }
}
```

### 5. Get All Properties (Public)

**Endpoint**: `GET /properties`

**Query Parameters** (all optional):

- `city` - Filter by city
- `minPrice` - Minimum rent price
- `maxPrice` - Maximum rent price
- `type` - Property type (apartment, house, etc.)
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms

**Example**:

```
GET /properties?city=NewYork&minPrice=2000&maxPrice=3000&bedrooms=2
```

**Expected Response**:

```json
{
  "success": true,
  "count": 5,
  "properties": [ ... ]
}
```

### 6. Get Single Property (Public)

**Endpoint**: `GET /properties/:id`

**Expected Response**:

```json
{
  "success": true,
  "property": { ... }
}
```

### 7. Create Booking (Protected)

**Endpoint**: `POST /bookings`

**Request Body**:

```json
{
  "propertyId": "property_id_here",
  "checkInDate": "2024-04-15",
  "checkOutDate": "2024-04-30",
  "numberOfGuests": 2,
  "specialRequests": "Early check-in if possible"
}
```

**Expected Response**:

```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": { ... }
}
```

### 8. Get User Bookings (Protected)

**Endpoint**: `GET /bookings/user-bookings`

**Expected Response**:

```json
{
  "success": true,
  "count": 3,
  "bookings": [ ... ]
}
```

### 9. Update Booking Status (Protected)

**Endpoint**: `PUT /bookings/:id/status`

**Request Body**:

```json
{
  "bookingStatus": "confirmed",
  "paymentStatus": "completed"
}
```

**Expected Response**:

```json
{
  "success": true,
  "message": "Booking updated successfully",
  "booking": { ... }
}
```

### 10. Get User Profile (Public)

**Endpoint**: `GET /users/:userId`

**Expected Response**:

```json
{
  "success": true,
  "user": { ... }
}
```

### 11. Update User Profile (Protected)

**Endpoint**: `PUT /users/profile/update`

**Request Body**:

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "9876543210",
  "bio": "Property enthusiast",
  "address": {
    "city": "Boston",
    "state": "MA"
  }
}
```

**Expected Response**:

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

## Admin Endpoints

### Get Pending Properties (Admin)

**Endpoint**: `GET /admin/properties/pending`

**Expected Response**:

```json
{
  "success": true,
  "count": 2,
  "properties": [ ... ]
}
```

### Approve Property (Admin)

**Endpoint**: `PUT /admin/properties/:id/approve`

**Expected Response**:

```json
{
  "success": true,
  "message": "Property approved successfully",
  "property": { ... }
}
```

### Get Dashboard Stats (Admin)

**Endpoint**: `GET /admin/dashboard/stats`

**Expected Response**:

```json
{
  "success": true,
  "stats": {
    "totalUsers": 50,
    "totalProperties": 25,
    "totalBookings": 100,
    "pendingProperties": 3,
    "approvedProperties": 22,
    "bookingsByStatus": {
      "pending": 10,
      "confirmed": 50,
      "cancelled": 5,
      "completed": 35
    }
  }
}
```

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Please provide email and password"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "Not authorized to perform this action"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Property not found"
}
```

### 500 Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Testing Workflow

1. **Register a User**
   - Call `/auth/register`
   - Save the returned token

2. **Browse Properties**
   - Call `/properties` with various filters

3. **Create a Property**
   - Use saved token
   - Call `/properties` with POST

4. **Create Admin User** (manually or via API)
   - Update role in MongoDB to "admin"

5. **Approve Property**
   - Login as admin
   - Call `/admin/properties/{id}/approve`

6. **Create Booking**
   - Use regular user token
   - Call `/bookings` with POST

7. **Update Booking Status**
   - Call `/bookings/{id}/status`

8. **Add Review**
   - Call `/bookings/{id}/review`

## Postman Tips

1. Create a collection for House Rent API
2. Add environment variable `{{base_url}}` = `http://localhost:5000/api`
3. Add environment variable `{{token}}` for holding JWT tokens
4. Use `Tests` tab to automatically save tokens:

```javascript
if (pm.response.code === 201 || pm.response.code === 200) {
  var jsonData = pm.response.json();
  if (jsonData.token) {
    pm.environment.set("token", jsonData.token);
  }
}
```

## Common Issues

- **CORS Error**: Check backend CORS_ORIGIN setting
- **Authentication Failed**: Token might be expired, re-login
- **Property Not Found**: Ensure property ID is correct
- **Database Error**: Verify MongoDB is running and connection string is correct
