import { FaHome } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';
import './style.css';

export default function NavBar() {
  const { toggleTheme } = useTheme();

  return (
    <>
      <nav>
        <FaHome size={'50px'} />

        <ul>
          <li>Profile</li>
          <li>Archive</li>
          <li>Logbook</li>
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
