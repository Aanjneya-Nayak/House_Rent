import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";
import "../styles/Navigation.css";

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="navbar-custom">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} className="brand-logo">
          <FaHome className="me-2" />
          HouseRent
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate("/properties")}>
              Browse Properties
            </Nav.Link>

            {isAuthenticated ? (
              <>
                <Nav.Link onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Nav.Link>

                <Nav.Link onClick={() => navigate("/messages")}>
                  Messages
                </Nav.Link>

                <Dropdown className="d-inline ms-2">
                  <Dropdown.Toggle variant="link" id="dropdown-user">
                    <FaUser className="me-2" />
                    {user?.firstName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item onClick={() => navigate("/profile")}>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/my-properties")}>
                      My Properties
                    </Dropdown.Item>
                    {user?.role === "admin" && (
                      <>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          onClick={() => navigate("/admin/dashboard")}
                        >
                          Admin Panel
                        </Dropdown.Item>
                      </>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                <Nav.Link onClick={() => navigate("/register")}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
