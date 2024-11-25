import HeaderLogo from '../headerLogo';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage';
import { getUserFromLocalStorage } from '../../context/userStorage';

import './style.css';

export default function Header() {
  const userData = getUserFromLocalStorage();

  return (
    <header>
      <HeaderLogo textColor={'#FFFFFF'} arrowColor={'#030311'} boxColor={'#20b2aa'} />

      <Link to="/profile" className="profile-link">
        <ProfileImage image={userData?.profileImage} size="60px" />
      </Link>
    </header>
  );
}
