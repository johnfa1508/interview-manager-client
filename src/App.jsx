import './App.css';
import Dashboard from './pages/dashboard';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/profilepage/index.jsx';
import LogbookPage from './pages/logbook/index.jsx';
import ArchivePage from './pages/archive/index.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/logbook" element={<LogbookPage />} />
      </Routes>
    </>
  );
}

export default App;
