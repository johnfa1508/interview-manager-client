import './App.css';
import Dashboard from './pages/dashboard';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/profilepage/index.jsx';
import LogbookPage from './pages/logbook/index.jsx';
import ArchivePage from './pages/archive/index.jsx';
import LoginPage from './pages/login/index.jsx';
import RegisterPage from './pages/register/index.jsx';
import AboutUs from './pages/aboutUs/index.jsx';
import ForgotPasswordPage from './pages/forgotPassword/index.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/logbook" element={<LogbookPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path = "/aboutUs" element ={<AboutUs/>} />
      </Routes> 
    </>
  );
}

export default App;
