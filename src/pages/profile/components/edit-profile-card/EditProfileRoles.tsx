import './EditProfileCard.css'

import { useEffect, useState } from 'react';

import AddRoleModal from './add-role-modal/AddRoleModal.tsx';
import { IRole} from './EditProfileCard.tsx';
import DeleteIcon from 'assets/images/bin.png';
import ModalWindow from 'components/ModalWindow.tsx';
import { IUser } from 'pages/profile/Profile.tsx';
import UserService from 'services/UserService.ts';
import RolesService from 'services/RolesService.ts';

interface IUserRoles {
  user: IUser
}

function EditProfileRoles({user}: IUserRoles) {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [clickedRoleValue, setClickedRoleValue] = useState<string | null>(null);
  const [roleID, setRoleID] = useState<number>(0);
  const [roles, setRoles] = useState<IRole[] | null>(null);
  const [isAddRoleModal, setIsAddRoleModal] = useState(false)

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await RolesService.getAllRoles()
      setRoles(response.data)
    }
    fetchRoles()
  }, []);

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

  const handleShowAddRoleModal = () => {
    setIsAddRoleModal(true)
  }

  const handleCloseAddRoleModal = () => {
    setIsAddRoleModal(false)
  }

  return (
    <div className='edit-profile-inputs-roles'>
      <h2 className='profile-page-edit-form-header-title'>Roles:</h2>
      <div className='edit-profile-inputs-roles-wrapper'>
        {user.roles.map(role => (
          <div className='edit-profile-inputs-roles-user-role' key={role.id}>
            <input
              type='text'
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
      <button className='edit-profile-role-add-role-button' onClick={handleShowAddRoleModal}>Add role</button>
      {isAddRoleModal &&
        <AddRoleModal
          handleCloseAddRoleModal={handleCloseAddRoleModal}
          roles={roles}
          user={user}
        />
      }
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