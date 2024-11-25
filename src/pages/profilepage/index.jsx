/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Header from '../../components/header';
import NavBar from '../../components/navigation';
import ProfileImage from '../../components/ProfileImage';
// import { getUserFromLocalStorage, updateUserInLocalStorage } from '../../context/userStorage';
import { updateUserInLocalStorage } from '../../service/loggedInUserUtils';
import useAuth from '../../hooks/useAuth';
import './style.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    profileImage: null
  });

  const [isSaving, setIsSaving] = useState(false);
  // const [image, setImage] = useState(null);
  const { loggedInUser } = useAuth();

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    setFormData({
      username: loggedInUser.username,
      email: loggedInUser.email,
      mobile: loggedInUser.mobile,
      profileImage: loggedInUser.profileImage
    });
  }, [loggedInUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      updateUserInLocalStorage(formData); // Update localStorage with new data
      // TODO: Update user data in the backend

      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          profileImage: reader.result
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dashboard-layout">
      <Header />
      <NavBar />
      <main className="dashboard-content">
        <div className="profile-container">
          <h2 className="profile-title">Profile Information</h2>

          <ProfileImage image={formData.profileImage} size="140px" />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload-button"
          />

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
            </div>
            <button type="submit" disabled={isSaving} className="save-button">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
