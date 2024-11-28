import { FaHome } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';
import './style.css';
import { Link } from 'react-router-dom';
import { MdDarkMode } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FiArchive } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';
import { MdGroups } from 'react-icons/md';

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
      </nav>
    </>
  );
}
