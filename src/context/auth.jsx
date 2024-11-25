/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { loginUserAsync, registerUserAsync, getUserByIdAsync } from '../service/apiClient';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
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
    const res = await loginUserAsync(username, password);

    if (!res.token) {
      return navigate('/login');
    }

    localStorage.setItem('token', res.token);
    setToken(res.token);

    const user = await getUserByIdAsync(jwtDecode(res.token).UserId);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setLoggedInUser(user);

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
    loggedInUser,
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
