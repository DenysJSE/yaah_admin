import './AddRoleModal.css';
import { IRole } from 'pages/profile/components/edit-profile-card/EditProfileCard.tsx';
import { IUser } from 'pages/profile/Profile.tsx';
import { useState } from 'react';
import UserService from 'services/UserService.ts';

interface IAddRoleModal {
  handleCloseAddRoleModal: () => void;
  roles: IRole[] | null;
  user: IUser
}

function AddRoleModal({ handleCloseAddRoleModal, roles, user }: IAddRoleModal) {
  const [clickedRole, setClickedRole] = useState('');

  const addRoleForUser = async () => {
    const userID = user.id
    const value = clickedRole
    console.log(value);
    await UserService.addRole({ userID, value })
  }

  return (
    <div className='add-role-modal'>
      <div className='add-role-modal-window'>
        <h2 className='add-role-modal-window-title'>Add role</h2>
        <div className='add-role-modal-window-content'>
          <h4 className='add-role-modal-window-content-title'>Which role you want to add for this user?</h4>
          {roles?.map(role =>
            <div key={role.id} onClick={() => setClickedRole(role.value)}>
              <input
                type='text'
                value={role.value}
                readOnly
                className='add-role-modal-window-content-role-input'
              />
            </div>
          )}
        </div>
        <div className='add-role-modal-window-buttons'>
          <button className='add-role-modal-window-button cancel' onClick={handleCloseAddRoleModal}>Cancel</button>
          <button className='add-role-modal-window-button add-role' onClick={addRoleForUser}>Add role</button>
        </div>
      </div>
    </div>
  );
}

export default AddRoleModal;