import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPasswordAsync, resetPasswordAsync } from '../../service/apiClient';
import './style.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [tokenSent, setTokenSent] = useState(false);
  const navigate = useNavigate();

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await forgotPasswordAsync(email);

      if (response?.success) {
        alert('Password reset link sent to your email!');
        setTokenSent(true);
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

    try {
      const response = await resetPasswordAsync({ resetToken, newPassword });

      if (response?.success) {
        alert('Password has been reset successfully!');
        navigate('/login'); // Redirect to login page
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
          </div>

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>

          <Link to="/login" className="back-button">
            Back
          </Link>
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
