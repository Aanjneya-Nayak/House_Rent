import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "../styles/Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Join HouseRent</h1>

        <div className="auth-card__body">
          {error && (
            <Alert variant="danger" className="alert-danger">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <div className="auth-form-row">
              <Form.Group className="form-group">
                <Form.Label className="form-label">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label className="form-label">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="btn-form btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Form>

          <div className="form-text-muted">
            Already have an account? <a href="/login">Log in here</a>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            By registering, you agree to our <a href="/">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
