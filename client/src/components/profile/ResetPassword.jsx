import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { resetPassword } from "../../services/UserService";

const ResetPassword = ({ token }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
      if (message) {
        const timer = setTimeout(() => {
          setMessage("");
        }, 3000); // hide after 3 seconds
    
        return () => clearTimeout(timer); // cleanup on unmount or message change
      }
    }, [message])

  const handleSubmit = async () => {
    try {
      await resetPassword(currentPassword, newPassword, token);
      setMessage("Password reset successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div>
      <h4>Reset Password</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="danger" onClick={handleSubmit}>
          Reset Password
        </Button>
      </Form>
      {message && (
        <Alert className="mt-3" variant={message.includes("successfully") ? "success" : "danger"}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default ResetPassword;
