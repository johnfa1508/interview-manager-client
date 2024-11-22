/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const redirectPath = localStorage.getItem('redirectPath');

      if (redirectPath) {
        localStorage.removeItem('redirectPath');
        navigate(redirectPath);
      } else {
        navigate('/login');
      }
    }
  }, [token]);

  const handleLogin = async (username, password) => {
    // FIXME: apiclient
    const res = await loginUserAsync(username, password);

    if (!res.token) {
      return navigate('/login');
    }

    localStorage.setItem('token', res.token);
    setToken(res.token);

    // TODO: decode token and fetch user data and store it in local storage
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  // FIXME: Register email, password and profile fields?
  const handleRegister = async (email, password) => {
    // FIXME: apiclient
    const res = await registerUserAsync({ email, password });
    localStorage.setItem('token', res.token);
    setToken(res.token);

    // FIXME: Path
    localStorage.setItem('redirectPath', '/dashboard');
    navigate('/dashboard');
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    if (!localStorage.getItem('redirectPath')) {
      localStorage.setItem('redirectPath', location.pathname);
    }

    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export { AuthContext, AuthProvider, ProtectedRoute };
