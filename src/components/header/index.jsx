import HeaderLogo from '../headerLogo';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage';

import './style.css';

export default function Header() {
  return (
    <header>
      <HeaderLogo textColor={'#FFFFFF'} arrowColor={'#030311'} boxColor={'#20b2aa'} />

      <Link to="/profile" className="profile-link">
        <ProfileImage size="60px" />
      </Link>
    </header>
  );
}
