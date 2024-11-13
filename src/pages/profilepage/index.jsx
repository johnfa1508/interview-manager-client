/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Header from '../../components/header';
import NavBar from '../../components/navigation';
import './style.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: 'JohnDoe',
    email: 'john.doe@email.com',
    mobile: '+1 234 567 8900'
  });

  const [isSaving, setIsSaving] = useState(false);

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
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard-layout">
        <Header />
        <NavBar />
        <main className="dashboard-content">
          <div className="profile-container">
            <h2 className="profile-title">Profile Information</h2>
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
    </div>
  );
};

export default ProfilePage;
