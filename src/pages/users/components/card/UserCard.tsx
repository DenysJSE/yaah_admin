import './UserCard.css';
import UserService from 'services/UserService.ts';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalWindow from 'components/ModalWindow.tsx';
import editIcon from 'assets/images/edit.png'
import deleteIcon from 'assets/images/delete.png'

interface IUser {
  id: number;
  nickname: string;
  email: string;
  roles: {
    id: number
    value: string
    description: string
  }[];
}

interface IUserData {
  user: IUser;
  setPath: (path: string) => void;
}

function UserCard({ user, setPath }: IUserData) {
  const [isShowDeleteUserDialog, setIsShowDeleteUserDialog] = useState(false);

  async function handleDeleteUser() {
    try {
      const scrollPosition = window.scrollY;
      await UserService.deleteUser(user.id);
      alert('The user was deleted successfully');
      window.location.reload();
      sessionStorage.setItem('scrollPosition', scrollPosition.toString());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const storedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (storedScrollPosition) {
      window.scrollTo(0, parseInt(storedScrollPosition, 10));
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);

  const handleShowDeleteUserDialog = () => {
    setIsShowDeleteUserDialog(true);
  };

  const handleCanselDelete = () => {
    setIsShowDeleteUserDialog(false);
  };

  return (
    <div className='user-card'>
      <div className='user-card-content'>
        <div className='user-card-info'>
          <p className='user-card-id'><b>ID:</b> {user.id}</p>
          <p className='user-card-nickname'><b>Nickname:</b> {user.nickname}</p>
          <p className='user-card-email'><b>Email:</b> {user.email}</p>
          <div className='user-card-role-value'>
            <b>Roles:</b>
            {user.roles.map(role => (
              <p key={role.id}>
                {role.value}
              </p>
            ))}
          </div>
        </div>
        <div className='user-card-buttons'>
          <Link to={`/edit-profile/${user.id}`} className='link' onClick={() => setPath('users')}>
            <button className='user-card-button edit'>
              <img src={editIcon} alt='edit-user-img' className='user-card-button-icon' />
              Edit
            </button>
          </Link>
          <button className='user-card-button delete' onClick={handleShowDeleteUserDialog}>
            <img src={deleteIcon} alt='delete-user-img' className='user-card-button-icon' />
            Delete
          </button>
        </div>
        {isShowDeleteUserDialog &&
          <ModalWindow
            handleCansel={handleCanselDelete}
            handleDoAction={handleDeleteUser}
            cancelText={'Cancel'}
            doActionText={'Delete user'}
            modalWindowTitle={'You are trying to delete the user'}
            modalWindowText={'Are you sure you want to delete this user. If you do that the user can not know the reason and will need to register again from start'}
          />
        }
      </div>
    </div>
  );
}

export default UserCard;