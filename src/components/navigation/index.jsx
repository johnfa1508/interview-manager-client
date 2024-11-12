import { FaHome } from 'react-icons/fa';
import './style.css';

export default function NavBar() {
  return (
    <nav>
      <FaHome size={'50px'} />
      <ul>
        <li>Profile</li>
        <li>Archive</li>
        <li>Logbook</li>
      </ul>
    </nav>
  );
}
