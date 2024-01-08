import './Dialog.css';

interface IDeleteUserDialog {
  nickname: string;
  handleDeleteUser: () => void;
  handleCanselDelete: () => void;
}

function DeleteUserDialog({ nickname, handleDeleteUser, handleCanselDelete }: IDeleteUserDialog) {
  return (
    <div className='dialog-wrapper'>
      <div className='dialog'>
        <p className='dialog-text'>Are you sure you want to delete user: {nickname}</p>
        <div className='dialog-buttons'>
          <button className='dialog-button cancel' onClick={handleCanselDelete}>Cancel</button>
          <button className='dialog-button delete' onClick={handleDeleteUser}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserDialog;