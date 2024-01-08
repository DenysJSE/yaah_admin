import UserIcon from '../../assets/images/userlogo.jpg';
import Button from '../../components/button.tsx';
import EditProfileCard from './components/edit-profile-card/EditProfileCard.tsx';
import { useState } from 'react';
import './Profile.css';

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  coins: number;
  roles: {
    id: number;
    value: string;
    description: string;
  }[];
}

function Profile() {
  const [isShownEditProfile, setIsShownEditProfile] = useState(false);

  const userData = localStorage.getItem('user');
  const user: IUser = userData ? JSON.parse(userData) : null;

  const handleShowEditProfile = () => {
    setIsShownEditProfile(true);
  };

  const handleCloseEditProfileCard = () => {
    setIsShownEditProfile(false);
  };

  return (
    <div className='profile-page'>
      <div className='profile-page-card'>
        <img src={UserIcon} alt='userIcon' className='profile-page-user-icon' />
        <h1 className='profile-page-user-nickname'>{user.nickname}</h1>
        <p className='profile-page-member-date'>Member since 2023</p>
        <div onClick={handleShowEditProfile}>
          <Button text={'Edit Profile'} />
        </div>
      </div>
      {isShownEditProfile && (
        <EditProfileCard
          user={user}
          handleCloseEditProfileCard={handleCloseEditProfileCard}
        />
      )}
    </div>
  );
}

export default Profile;
