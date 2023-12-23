import UserLogo from '../../assets/images/userlogo.jpg'
import ProfilePopUp from '../../layouts/profile-popup-menu/ProfilePopUp.tsx';
import { useState } from 'react';
import './Header.css';


function Header() {
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const handleProfileHover = () => {
    setIsProfileVisible(true);
  };

  const handleProfileLeave = () => {
    setIsProfileVisible(false);
  };

  return (
    <header className='header'>
      <div className='header-content-center'>
        <div className='header-user-info'>
          <div
            className='header-user-info-div user'
            onMouseEnter={handleProfileHover}
            onMouseLeave={handleProfileLeave}
          >
          <img src={UserLogo} alt='userLogo' className='header-user-logo' onClick={() => setIsProfileVisible(!isProfileVisible)} />
          </div>
          {isProfileVisible && (
            <div
              onMouseEnter={handleProfileHover}
              onMouseLeave={handleProfileLeave}
            >
              <ProfilePopUp setIsProfileVisible={setIsProfileVisible} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;