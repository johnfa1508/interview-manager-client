import './App.css';
import Dashboard from './pages/dashboard';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProfilePage from './pages/profilepage/index.jsx';
import LogbookPage from './pages/logbook/index.jsx';
import ArchivePage from './pages/archive/index.jsx';
import LoginPage from './pages/login/index.jsx';
import RegisterPage from './pages/register/index.jsx';
import { AuthProvider, ProtectedRoute } from './context/auth.jsx';
import AboutUs from './pages/aboutUs/index.jsx';
import useTheme from './hooks/useTheme.jsx';
import { useEffect } from 'react';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Unprotected routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Protected routes, needs token in local storage */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="logbook"
            element={
              <ProtectedRoute>
                <LogbookPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="archive"
            element={
              <ProtectedRoute>
                <ArchivePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/aboutUs"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
