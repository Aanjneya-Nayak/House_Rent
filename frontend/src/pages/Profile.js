import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { userService } from "../services/api";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import "../styles/Profile.css";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await userService.getUserProfile(user._id);
      setProfile(res.data.user);
      setFormData({
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        phone: res.data.user.phone,
        bio: res.data.user.bio || "",
        city: res.data.user.address?.city || "",
        state: res.data.user.address?.state || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

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
    setSuccess("");

    try {
      const updateData = {
        ...formData,
        address: {
          city: formData.city,
          state: formData.state,
        },
      };
      await userService.updateProfile(updateData);
      setSuccess("Profile updated successfully");
      setEditing(false);
      fetchProfile();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Body>
              <h1 className="mb-4">My Profile</h1>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              {editing ? (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={profile?.email}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself"
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <div className="profile-info mb-4">
                    <p>
                      <strong>Name:</strong> {profile?.firstName}{" "}
                      {profile?.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {profile?.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {profile?.phone}
                    </p>
                    <p>
                      <strong>Role:</strong>{" "}
                      {profile?.role === "admin" ? "Administrator" : "User"}
                    </p>
                    {profile?.bio && (
                      <p>
                        <strong>Bio:</strong> {profile.bio}
                      </p>
                    )}
                    {profile?.address?.city && (
                      <p>
                        <strong>Location:</strong> {profile.address.city},{" "}
                        {profile.address.state}
                      </p>
                    )}
                  </div>

                  <Button variant="primary" onClick={() => setEditing(true)}>
                    Edit Profile
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
