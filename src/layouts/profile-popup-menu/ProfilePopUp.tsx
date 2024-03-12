import './ProfilePopUp.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import LogoutIcon from 'assets/images/logout.png'
import ProfileIcon from 'assets/images/user.png'

interface ProfilePopUp {
  setIsProfileVisible: (isProfileVisible: boolean) => void;
}

function ProfilePopUp({ setIsProfileVisible }: ProfilePopUp) {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token'));
  
  const handlePopUpClose = () => {
    setIsProfileVisible(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
    handlePopUpClose()
  }

  return (
    <div className='profile-pop-up'>
      <Link to={'/profile'} className='link'>
        <div
          className='profile-pop-up-link ppu-profile'
          onClick={handlePopUpClose}
        >
          <img src={ProfileIcon} alt='profileIcon' className='profile-pop-up-image' />
          <p className='profile-pop-up-title pput-profile'>My Profile</p>
        </div>
      </Link>
      <Link to={'/'} className='link'>
        <div
          className='profile-pop-up-link ppu-logout'
          onClick={handleLogout}
        >
          <img src={LogoutIcon} alt='logout' className='profile-pop-up-image' />
          <p className='profile-pop-up-title pput-logout'>{isLogged ? 'Logout' : 'Login'}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProfilePopUp;
