import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import SampleImg from "../../assets/images/profileImageifnotAvailable.jpg";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await api.fetchUserData(token);
        setUser(response.data);
        setNewName(response.data.name);
        setNewEmail(response.data.email);
        setError(null);
      } catch (err) {
        setError("Failed to fetch user data. Please try again later.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleEditToggle = async () => {
    if (editing) {
      try {
        const token = localStorage.getItem("token");
        await api.updateUserData(token, { name: newName, email: newEmail });
        setUser({ ...user, name: newName, email: newEmail });
      } catch (err) {
        console.error("Error updating profile:", err);
      }
    }
    setEditing(!editing);
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.updatePassword(token, {
        passwordCurrent: currentPassword,
        password: newPassword,
      });
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profileImage", file);
    try {
      const token = localStorage.getItem("token");
      const response = await api.updateProfileImage(token, formData);
      setProfileImage(response.data.user.profileImage);
    } catch (err) {
      console.error("Error updating profile image:", err);
    }
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await api.fetchPlaylists(token);
        setPlaylists(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch playlists. Please try again later.");
        console.error("Error fetching playlists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto my-8 rounded-lg shadow p-6 ">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={profileImage || SampleImg}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
          />
          <input
            type="file"
            onChange={handleProfileImageChange}
            className="w-full max-w-xs"
          />
        </div>

        {/* Profile Information Section */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Profile Information
            </h1>
            <button
              onClick={handleEditToggle}
              className={`px-4 py-2 rounded-md transition-colors ${
                editing
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {editing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              {editing ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              ) : (
                <p className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                  {user.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              {editing ? (
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              ) : (
                <p className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                  {user.email}
                </p>
              )}
            </div>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors mt-4"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Change Password
              </h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <h1>Playlists</h1>
        <ul>
          {playlists.map((playlist) => (
            <li
              key={playlist._id}
              onClick={() => navigate(`/playlist/${playlist._id}`)}
              style={{ cursor: "pointer" }}
            >
              <p>{playlist.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
