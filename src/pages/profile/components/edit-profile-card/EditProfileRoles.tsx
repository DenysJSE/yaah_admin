import './EditProfileCard.css'
import DeleteIcon from '../../../../assets/images/bin.png';
import ModalWindow from '../../../../components/ModalWindow.tsx';
import { useState } from 'react';
import { IRole, IUser } from './EditProfileCard.tsx';
import UserService from '../../../../services/UserService.ts';

interface IUserRoles {
  userRoles: IRole[]
}

function EditProfileRoles({userRoles}: IUserRoles) {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [clickedRoleValue, setClickedRoleValue] = useState<string | null>(null);
  const [roleID, setRoleID] = useState<number>(0);

  const handleShowDialog = (role: IRole) => {
    setIsShowDialog(true);
    setClickedRoleValue(role.value);
    setRoleID(role.id);
  };

  const handleHideDialog = () => {
    setIsShowDialog(false);
    setClickedRoleValue(null);
  };

  const handleDeleteRole = async (roleID: number) => {
    try {
      const userString: string | null = localStorage.getItem('user');
      if (userString) {
        const user: IUser = JSON.parse(userString);
        const userID = user.id;
        await UserService.deleteUserRole(userID, roleID);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='edit-profile-inputs-roles'>
      <h2 className='profile-page-edit-form-header-title'>Roles:</h2>
      <div className='edit-profile-inputs-roles-wrapper'>
        {userRoles.map(role => (
          <div className='edit-profile-inputs-roles-user-role' key={role.id}>
            <input
              type='email'
              value={role.value}
              readOnly={true}
              className='edit-profile-input-field roles'
            />
            <div className='edit-profile-inputs-roles-delete-button'>
              <img
                src={DeleteIcon}
                alt='delete-icon'
                className='edit-profile-inputs-roles-delete-icon'
                onClick={() => handleShowDialog(role)}
              />
            </div>
          </div>
        ))}
      </div>
      <button className='edit-profile-role-add-role-button'>Add role</button>
      {isShowDialog &&
        <ModalWindow
          handleCansel={handleHideDialog}
          handleDoAction={() => handleDeleteRole(roleID)}
          cancelText={'Cancel'}
          doActionText={'Delete role'}
          modalWindowTitle={`You are trying to delete ${clickedRoleValue} role`}
          modalWindowText={'Are you sure about it? If it will be done, there is no way back!'}
        />
      }
    </div>
  );
}

export default EditProfileRoles