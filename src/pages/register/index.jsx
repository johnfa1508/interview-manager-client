/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Snackbar from '../../components/Snackbar';
import useSnackbar from '../../hooks/useSnackbar';
import Stepper from '../../components/Stepper';
import ProfileImage from '../../components/ProfileImage';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
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
  const [showPassword, setShowPassword] = useState(false);

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

  const handleRegister = async () => {
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

  const stepIsValid = () => {
    // Validations

    return true;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Stepper
          header={<h2>Register account</h2>}
          onComplete={handleRegister}
          stepIsValid={stepIsValid}
        >
          {/* Step 1 */}
          <div>
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
              <label htmlFor="password">Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="show-password-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
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
          </div>

          {/* Step 2 */}
          <div>
            <div className="input-group">
              <label htmlFor="username">Username</label>
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
          </div>

          {/* Step 3 */}
          <div>
            <div className="input-group">
              <ProfileImage image={formData.profileImage} />

              <label htmlFor="profileImage">Profile Image</label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
            </div>
          </div>
        </Stepper>

        <Link to="/login" className="navigate-to-login">
          Already have an account?
        </Link>
      </div>

      {snackbar.isOpen && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
      )}
    </div>
  );
};

export default RegisterPage;
