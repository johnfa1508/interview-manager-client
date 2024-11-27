/*
import { useNavigate } from 'react-router-dom';
import { loginUserAsync } from '../../service/apiClient';
import { saveUserToLocalStorage } from '../../context/userStorage';
*/
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import Snackbar from '../../components/Snackbar';
import useSnackbar from '../../hooks/useSnackbar';
import './style.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { onLogin } = useAuth();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    setIsSubmitting(true);

    try {
      await onLogin(formData);
    } catch (error) {
      console.error('Error during login:', error);
      showSnackbar('Invalid username or password.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // TODO: Move to services folder and user RegEx for validation instead
  const validateInputs = () => {
    if (!formData.username.trim()) {
      showSnackbar('Username is required.', 'error');
      return false;
    }

    /* FIXME: Change this to a more secure password validation
    if (formData.password.length < 8) {
      showSnackbar(
        'Password must be at least 8 characters long and contain at least one number and one special character.',
        'error'
      );

      return false;
    }
    */

    return true;
  };

  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        username,
        password
      };

      const response = await loginUserAsync(payload);

      if (response?.token) {
        // Save user info and token to local storage
        if (rememberMe) {
          saveUserToLocalStorage(response); // Store token and user info
        }

        alert('Login successful!');
        navigate('/'); // Redirect to home or dashboard
      } else {
        alert(response?.message || 'Login failed! Check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  */

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back</h1>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={onChange}
              placeholder="Enter your username"
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
                onChange={onChange}
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

          <div className="options-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>

            <a href="#" className="forgot-password-link">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>

          <p className="create-account">
            <a href="/register">Create a new account</a>
          </p>
        </form>
      </div>

      {snackbar.isOpen && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
      )}
    </div>
  );
};

export default LoginPage;
