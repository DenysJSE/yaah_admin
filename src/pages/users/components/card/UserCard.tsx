import './UserCard.css';
import UserService from '../../../../services/UserService.ts';
import { useEffect, useState } from 'react';
import EditProfileCard from '../../../profile/components/edit-profile-card/EditProfileCard.tsx';
import DeleteUserDialog from '../dialogs/DeleteUserDialog.tsx';

interface IUser {
  id: number
  nickname: string
  email: string
  coins: number
  roles: {
    id: number;
    value: string;
    description: string;
  }[]
}

interface IUserData {
  user: IUser
  id: number;
  nickname: string;
  email: string;
  roleValue: {
    id: number
    value: string
    description: string
  }[];
}

function UserCard({user, id, nickname, email, roleValue }: IUserData) {
  const [isShowEditDialog, setIsShowEditDialog] = useState(false);
  const [isShowDeleteUserDialog, setIsShowDeleteUserDialog] = useState(false);

  async function handleDeleteUser() {
    try {
      const scrollPosition = window.scrollY;
      await UserService.deleteUser(id)
      window.location.reload()
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

  const handleShowEditDialog = () => {
    setIsShowEditDialog(true)
  }

  const handleHideEditDialog = () => {
    setIsShowEditDialog(false)
  }

  const handleShowDeleteUserDialog = () => {
    setIsShowDeleteUserDialog(true)
  }

  const handleCanselDelete = () => {
    setIsShowDeleteUserDialog(false)
  }

  return (
    <div className='user-card'>
      <div className='user-card-content'>
        <div className='user-card-info'>
            <p className='user-card-id'>ID: {id}</p>
            <p className='user-card-nickname'>Nickname: {nickname}</p>
          <p className='user-card-email'>Email: {email}</p>
          <div className='user-card-role-value'>
            Roles:
            {roleValue.map(role => (
              <p key={role.id}>
                {role.value}
              </p>
            ))}
          </div>
        </div>
        <div className='user-card-buttons'>
          <button className='user-card-button edit' onClick={handleShowEditDialog}>Edit</button>
          {isShowEditDialog &&
            <EditProfileCard user={user} handleCloseEditProfileCard={handleHideEditDialog} />
          }
          <button className='user-card-button delete' onClick={handleShowDeleteUserDialog}>Delete</button>
        </div>
        {isShowDeleteUserDialog &&
          <DeleteUserDialog
            nickname={nickname}
            handleDeleteUser={handleDeleteUser}
            handleCanselDelete={handleCanselDelete}
          />
        }
      </div>
    </div>
  );
}

export default UserCard;