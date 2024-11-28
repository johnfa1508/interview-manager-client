import { FaHome } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';
import './style.css';
import { Link } from 'react-router-dom';
import { MdDarkMode } from 'react-icons/md';

export default function NavBar() {
  const { toggleTheme } = useTheme();

  return (
    <>
      <nav>
        <Link to="/dashboard">
          <FaHome size={'50px'} />
        </Link>

        <ul>
          <Link to="/profile">
            <li>Profile</li>
          </Link>

          <Link to="/archive">
            <li>Archive</li>
          </Link>

          <Link to="/logbook">
            <li>Logbook</li>
          </Link>

          <Link to="/aboutUs">
            <li>About Us</li>
          </Link>
        </ul>

        <MdDarkMode className="navbar-icon" onClick={toggleTheme} />
      </nav>
    </>
  );
}
