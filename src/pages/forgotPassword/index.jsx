import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordAsync, resetPasswordAsync } from '../../service/apiClient';
import './style.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [tokenSent, setTokenSent] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateEmail(email)) {
      setErrors({ email: 'Invalid email address' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await forgotPasswordAsync(email);

      if (response?.success) {
        alert('Password reset link sent to your email!');
        setTokenSent(true);
        setErrors({});
      } else {
        alert(response?.message || 'Failed to send password reset link. Please try again.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsResetting(true);

    if (!resetToken) {
      setErrors({ resetToken: 'Reset token is required' });
      setIsResetting(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setErrors({ newPassword: 'Password must be at least 8 characters long and contain at least one number and one special character.' });
      setIsResetting(false);
      return;
    }

    try {
      const response = await resetPasswordAsync({ resetToken, newPassword });

      if (response?.success) {
        alert('Password has been reset successfully!');
        navigate('/login'); // Redirect to login page
        setErrors({});
      } else {
        alert(response?.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSendResetLink}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {tokenSent && (
          <form onSubmit={handleResetPassword}>
            <div className="input-group">
              <label htmlFor="resetToken">Reset Token</label>
              <input
                type="text"
                id="resetToken"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                placeholder="Enter the reset token"
                required
              />
              {errors.resetToken && <p className="error-message">{errors.resetToken}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
              {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
            </div>
            <button type="submit" className="login-button" disabled={isResetting}>
              {isResetting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;