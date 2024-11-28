/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { saveUserToLocalStorage } from '../../service/loggedInUserUtils';
import useAuth from '../../hooks/useAuth';
import Snackbar from '../../components/snackbar';
import useSnackbar from '../../hooks/useSnackbar';
import './style.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    profileImage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { onRegister } = useAuth();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (event) => {
    // TODO: Implement validation
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showSnackbar('Passwords do not match!', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        mobile: formData.mobile,
        profileImage: formData.profileImage
      };

      await onRegister(payload);
    } catch (error) {
      console.error('Error during register:', error);
      showSnackbar('An error occurred. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        mobile: formData.mobile
      };

      const response = await registerUserAsync(payload);

      if (response?.id && response?.username) {
        saveUserToLocalStorage(formData); //FIXME: GET FROM BACKEND AT SOME POINT
        alert('Registration successful!');
        navigate('/');
      } else {
        alert(response?.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  */

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Create Account</h1>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Profile Image */}
          <div className="input-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>

          <Link to="/login" className="navigate-to-login">
            Already have an account?
          </Link>
        </form>
      </div>

      {snackbar.isOpen && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
      )}
    </div>
  );
};

export default RegisterPage;
