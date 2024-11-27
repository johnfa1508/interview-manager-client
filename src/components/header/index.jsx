import HeaderLogo from '../headerLogo';
import useAuth from '../../hooks/useAuth';
import ProfileDropdown from '../profileDropdown';
import './style.css';

export default function Header() {
  const { loggedInUser, onLogout } = useAuth();

  const handleLogout = () => {
    onLogout();
  };

  return (
    <header>
      <HeaderLogo textColor={'#FFFFFF'} arrowColor={'#030311'} boxColor={'#20b2aa'} />
      <ProfileDropdown image={loggedInUser?.profileImage} onLogout={handleLogout} />
    </header>
  );
}
