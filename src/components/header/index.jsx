import HeaderLogo from '../headerLogo';
//import { CgProfile } from 'react-icons/cg';
import ProfileImage from '../ProfileImage';

import './style.css';

export default function Header() {
  return (
    <header>
      <HeaderLogo textColor={'#FFFFFF'} arrowColor={'#030311'} boxColor={'#20b2aa'} />
      <ProfileImage size="60px" />
    </header>
  );
}
