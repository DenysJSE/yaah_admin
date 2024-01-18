import UserIcon from '../../assets/images/userlogo.jpg';
import Button from '../../components/button.tsx';
import './Profile.css';
import { useUser } from '../../components/UserUtils.ts';
import { Link } from 'react-router-dom';

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
  const { user } = useUser();

  const formattedDate = new Date(user?.created_at).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className='profile-page'>
      <div className='profile-page-card'>
        <img src={UserIcon} alt='userIcon' className='profile-page-user-icon' />
        <h1 className='profile-page-user-nickname'>{user?.nickname}</h1>
        <p className='profile-page-member-date'>Member since {formattedDate}</p>
        <Link to={`/edit-profile/${user.id}`}>
          <Button text={'Edit Profile'} />
        </Link>
      </div>
    </div>
  );
}

export default Profile;
