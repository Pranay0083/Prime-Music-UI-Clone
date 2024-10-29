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

  // All useEffects and handlers remain the same
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
        const token = localStorage.getItem("token");
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-lg font-medium text-gray-300">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-red-900 text-red-200 px-6 py-4 rounded-lg shadow-sm">
        Error: {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 pt-32">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={profileImage || SampleImg}
                alt="profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-gray-700 shadow-md"
              />
              <input
                type="file"
                onChange={handleProfileImageChange}
                className="mt-4 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600"
              />
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-200">
                Profile Information
              </h1>
              <button
                onClick={handleEditToggle}
                className={`px-5 py-2 rounded-lg font-medium shadow-sm transition-all duration-200 ${
                  editing
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {editing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-200"
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-gray-200">
                    {user.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                {editing ? (
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-200"
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-gray-200">
                    {user.email}
                  </p>
                )}
              </div>

              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-5 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-sm"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Playlists Section */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <h2 className="text-xl font-bold text-gray-200 mb-6">Your Playlists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                onClick={() => navigate(`/playlist/${playlist._id}`)}
                className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-200 border border-gray-600 hover:border-blue-500"
              >
                <p className="font-medium text-gray-200">{playlist.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-200">
                  Change Password
                </h2>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-200"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-200"
                    placeholder="Enter new password"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="px-5 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Save Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;