import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');  // Get token from local storage
        const response = await api.fetchUserData(token);
        setUser(response.data);
        setNewName(response.data.name);
        setNewEmail(response.data.email);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user data. Please try again later.');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.updateUserData(token, { name: newName, email: newEmail });
      setUser({ ...user, name: newName, email: newEmail });
      setEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.updatePassword(token, { passwordCurrent: currentPassword, password: newPassword });
      setShowPasswordModal(false);
    } catch (err) {
      console.error('Error updating password:', err);
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const token = localStorage.getItem('token');
      const response = await api.updateProfileImage(token, formData);
      setProfileImage(response.data.user.profileImage);
    } catch (err) {
      console.error('Error updating profile image:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    (
      <div>
        <h1>Profile</h1>
        <div>
          <img src={profileImage || 'default-profile.png'} alt="Profile" />
          <input type="file" onChange={handleProfileImageChange} />
          {editing ? (
            <div>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Name"
              />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Email"
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <button onClick={handleEdit}>Edit Profile</button>
            </div>
          )}
          <button onClick={() => setShowPasswordModal(true)}>Change Password</button>
        </div>
        {showPasswordModal && (
          <div className="modal">
            <h2>Change Password</h2>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
            />
            <button onClick={handleChangePassword}>Save</button>
            <button onClick={() => setShowPasswordModal(false)}>Close</button>
          </div>
        )}
      </div>
    ))
};

export default Profile;