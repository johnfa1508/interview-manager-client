import { FaHome } from 'react-icons/fa';
import { MdDarkMode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';
import './style.css';
import { CgProfile } from 'react-icons/cg';
import { FiArchive } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';
import { MdGroups } from 'react-icons/md';
import { FaRegSnowflake } from 'react-icons/fa';

export default function NavBar() {
  const { toggleTheme, toggleChristmas } = useTheme();

  return (
    <>
      <nav>
        <Link to="/dashboard">
          <FaHome size={'50px'} className="home-icon" />
        </Link>

        <ul>
          <Link to="/profile">
            <li>
              <CgProfile className="nav-icon" />
              Profile
            </li>
          </Link>

          <Link to="/archive">
            <li>
              <FiArchive className="nav-icon" />
              Archive
            </li>
          </Link>

          <Link to="/logbook">
            <li>
              <FaBook className="nav-icon" />
              Logbook
            </li>
          </Link>

          <Link to="/aboutUs">
            <li>
              <MdGroups className="nav-icon" />
              About us
            </li>
          </Link>
        </ul>

        <MdDarkMode className="navbar-darkmode-icon" onClick={toggleTheme} />
        <FaRegSnowflake className="xmas-icon" onClick={toggleChristmas} />
      </nav>
    </>
  );
}
