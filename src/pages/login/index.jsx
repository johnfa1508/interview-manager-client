/*
import { useNavigate } from 'react-router-dom';
import { loginUserAsync } from '../../service/apiClient';
import { saveUserToLocalStorage } from '../../context/userStorage';
*/
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './style.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { onLogin } = useAuth();

  // const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (event) => {
    // TODO: Implement validation
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onLogin(formData.username, formData.password);
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />

            {/* FIXME: Implement remember me */}
            <div className="options-row">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>

              {/* FIXME: Implement forgot password */}
              <a href="#" className="forgot-password-link">
                Forgot Password?
              </a>
            </div>
          </div>

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>

          <p className="create-account">
            <a href="/register">Create a new account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
