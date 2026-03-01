import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";

// Styles - Global Design System
import "./styles/DesignSystem.css";
import "./styles/FormSystem.css";
import "./styles/Auth.css";
import "./styles/PostProperty.css";
import "./styles/Profile.css";
import "./styles/DashboardForms.css";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PropertyBrowse from "./pages/PropertyBrowse";
import PropertyDetail from "./pages/PropertyDetail";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import PostProperty from "./pages/PostProperty";

const AppRoutes = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<PropertyBrowse />} />
        <Route path="/property/:id" element={<PropertyDetail />} />

        {/* Auth Routes */}
        <Route
          path="/register"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-property"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PostProperty />
            </ProtectedRoute>
          }
        />

        {/* 404 - Not Found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
