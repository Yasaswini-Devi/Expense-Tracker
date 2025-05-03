import React, { useState, useEffect } from "react";
import { getUserDetails, updateUserDetails, uploadProfilePicture } from "../../services/UserService";
import ResetPassword from "../../components/profile/ResetPassword";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails(token);
        setUserDetails(data);
        setFormData({ name: data.username, email: data.email });
        if (data.profilePic) setProfilePic(data.profilePic);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("profilePic", file);
        const res = await uploadProfilePicture(formData, token);
        setProfilePic(res.profilePic);
        setMessage("Profile picture updated.");
      } catch (error) {
        setMessage("Failed to upload profile picture.");
      }
    }
  };

  const handleSaveDetails = async () => {
    try {
      await updateUserDetails(formData, token);
      setIsEditing(false);
      setMessage("Details updated successfully.");
    } catch {
      setMessage("Error updating details.");
    }
  };

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">User Profile</h2>
        {userDetails ? (
          <div className="row">
            {/* Profile Picture */}
            <div className="col-md-4 text-center">
              <img
                src={
                  profilePic
                    ? `http://localhost:5000${profilePic}`
                    : "https://via.placeholder.com/150"
                }
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                alt="Profile"
              />
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* User Details */}
            <div className="col-md-8">
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="form-control-plaintext">
                      {userDetails.username}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="form-control-plaintext">
                      {userDetails.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 d-flex gap-3 flex-wrap">
                {!isEditing ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Details
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={handleSaveDetails}
                    >
                      Save Changes
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => setShowReset((prev) => !prev)}
                >
                  {showReset ? "Hide Password Reset" : "Reset Password"}
                </button>
              </div>

              {showReset && (
                <div className="mt-4">
                  <ResetPassword token={token} />
                </div>
              )}

              {message && (
                <div
                  className={`alert mt-3 ${
                    message.includes("success") || message.includes("updated")
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;