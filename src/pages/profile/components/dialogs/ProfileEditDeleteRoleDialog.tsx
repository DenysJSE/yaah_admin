import './ProfileEditDeleteRoleDialog.css'

interface IProfileEditDeleteRoleDialog {
  roleValue: string | null
  handleCanselDelete: () => void
  handleDeleteRole: () => void
}

function ProfileEditDeleteRoleDialog({roleValue, handleCanselDelete, handleDeleteRole}: IProfileEditDeleteRoleDialog) {
  return (
    <div className='dialog-wrapper'>
      <div className='dialog'>
        <p className='dialog-text'>Are you sure you want to delete role: {roleValue}</p>
        <div className='dialog-buttons'>
          <button className='dialog-button cancel' onClick={handleCanselDelete}>Cancel</button>
          <button className='dialog-button delete' onClick={handleDeleteRole}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditDeleteRoleDialog