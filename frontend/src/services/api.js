import { apiClient } from "./apiClient";

const authService = {
  register: (data) => apiClient.post("/auth/register", data),
  login: (data) => apiClient.post("/auth/login", data),
  logout: () => apiClient.get("/auth/logout"),
  getCurrentUser: () => apiClient.get("/auth/current-user"),
};

const propertyService = {
  getProperties: (filters) => apiClient.get("/properties", { params: filters }),
  getProperty: (id) => apiClient.get(`/properties/${id}`),
  createProperty: (data) => apiClient.post("/properties", data),
  updateProperty: (id, data) => apiClient.put(`/properties/${id}`, data),
  deleteProperty: (id) => apiClient.delete(`/properties/${id}`),
  getUserProperties: (userId) => apiClient.get(`/properties/user/${userId}`),
};

const bookingService = {
  createBooking: (data) => apiClient.post("/bookings", data),
  getUserBookings: () => apiClient.get("/bookings/user-bookings"),
  getBooking: (id) => apiClient.get(`/bookings/${id}`),
  updateBookingStatus: (id, data) =>
    apiClient.put(`/bookings/${id}/status`, data),
  cancelBooking: (id) => apiClient.put(`/bookings/${id}/cancel`, {}),
  addReview: (id, data) => apiClient.post(`/bookings/${id}/review`, data),
};

const userService = {
  getUserProfile: (userId) => apiClient.get(`/users/${userId}`),
  updateProfile: (data) => apiClient.put("/users/profile/update", data),
  getAllUsers: () => apiClient.get("/users"),
  updateUserRole: (userId, role) =>
    apiClient.put(`/users/${userId}/role`, { role }),
  toggleUserStatus: (userId) => apiClient.put(`/users/${userId}/status`),
};

const adminService = {
  getPendingProperties: () => apiClient.get("/admin/properties/pending"),
  approveProperty: (id) => apiClient.put(`/admin/properties/${id}/approve`),
  rejectProperty: (id) => apiClient.put(`/admin/properties/${id}/reject`),
  getDashboardStats: () => apiClient.get("/admin/dashboard/stats"),
  getPropertyTrends: (filters) =>
    apiClient.get("/admin/analytics/trends", { params: filters }),
};

const messageService = {
  getConversations: () => apiClient.get("/messages/conversations"),
  getMessages: (userId) => apiClient.get(`/messages/${userId}`),
  sendMessage: (data) => apiClient.post("/messages", data),
};

export {
  authService,
  propertyService,
  bookingService,
  userService,
  adminService,
  messageService,
};
