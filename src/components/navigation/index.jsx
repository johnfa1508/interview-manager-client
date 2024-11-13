import { FaHome } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';
import './style.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const { toggleTheme } = useTheme();

  return (
    <>
      <nav>
        <FaHome size={'50px'} />

        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/archive">Archive</Link>
          </li>
          <li>
            <Link to="/logbook">Logbook</Link>
          </li>
        </ul>

        <div className="toggle-container">
          <input
            type="checkbox"
            id="check"
            className="toggle"
            onChange={toggleTheme}
            checked={localStorage.getItem('theme') === 'dark'}
          />
          <label htmlFor="check">Dark Mode</label>
        </div>
      </nav>
    </>
  );
}
