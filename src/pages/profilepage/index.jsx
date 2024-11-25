/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Header from '../../components/header';
import NavBar from '../../components/navigation';
import ProfileImage from '../../components/ProfileImage'; 
import { getUserFromLocalStorage, updateUserInLocalStorage } from '../../context/userStorage';
import './style.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState(null); 

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        mobile: user.mobile
      });
      if (user.profileImage) {
        setImage(user.profileImage); 
      } else {
        setImage(null); 
      }
    }
  }, []);

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
      // Save updated user data to localStorage
      const updatedUser = { ...formData, profileImage: image };
      updateUserInLocalStorage(updatedUser); // Update localStorage with new data

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
        setImage(reader.result); // Store the image as a base64 string
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

          <ProfileImage image={image} size="140px" />

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
