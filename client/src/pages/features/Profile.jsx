import React, { useState, useEffect } from "react";
import { getUserDetails, updateUserDetails, resetPassword } from "../../services/UserService";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails(token);
        setUserDetails(data);
        setFormData({ name: data.username, email: data.email });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [token]);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle password field change
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // Handle saving user details after editing
  const handleSaveDetails = async () => {
    try {
      await updateUserDetails(formData, token);
      setIsEditing(false);
      setMessage("Details updated successfully.");
    } catch (error) {
      setMessage("Error updating details.");
    }
  };

  // Handle password reset
  const handleResetPassword = async () => {
    try {
      await resetPassword(newPassword, token);
      setMessage("Password reset successfully.");
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <Container className="card my-5">
      {userDetails ? (
        <>
          <Row>
            <Col>
              <h2 className="text-center">User Profile</h2>
              <div className="mt-4">
                <h4>Name: {isEditing ? (
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    userDetails.username
                  )}
                </h4>
                <h4>Email: {isEditing ? (
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    userDetails.email
                  )}
                </h4>
              </div>
              <div className="mt-4">
                {!isEditing ? (
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Edit Details
                  </Button>
                ) : (
                  <Button variant="success" onClick={handleSaveDetails}>
                    Save Changes
                  </Button>
                )}
                <Button
                  variant={isEditing ? "secondary" : "danger"}
                  className="ml-2"
                  onClick={() => setIsEditing(false)}
                >
                  {isEditing ? "Cancel" : "Reset Password"}
                </Button>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              {isEditing ? (
                <>
                  <h4>Reset Password</h4>
                  <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                    />
                  </Form.Group>
                  <Button variant="danger" onClick={handleResetPassword}>
                    Reset Password
                  </Button>
                </>
              ) : null}
            </Col>
          </Row>

          {message && (
            <Row className="mt-4">
              <Col>
                <Alert variant={message.includes("successfully") ? "success" : "danger"}>
                  {message}
                </Alert>
              </Col>
            </Row>
          )}
        </>
      ) : (
        <Row>
          <Col className="text-center">
            <p>Loading user details...</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;
