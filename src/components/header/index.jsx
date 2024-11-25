import HeaderLogo from '../headerLogo';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage';
import useAuth from '../../hooks/useAuth';
import './style.css';

export default function Header() {
  const { loggedInUser } = useAuth();

  // TODO: Find a way to render this when updating image in profile page
  return (
    <header>
      <HeaderLogo textColor={'#FFFFFF'} arrowColor={'#030311'} boxColor={'#20b2aa'} />

      <Link to="/profile" className="profile-link">
        <ProfileImage image={loggedInUser?.profileImage} size="60px" />
      </Link>
    </header>
  );
}
