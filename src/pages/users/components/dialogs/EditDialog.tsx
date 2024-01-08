import './Dialog.css';

interface IEditDialog {
  handleHideEditDialog: () => void;
}

function EditDialog({ handleHideEditDialog }: IEditDialog) {
  return (
    <div className='dialog-wrapper'>
      <div className='dialog'>
        <p className='dialog-text'>EditDialog</p>
        <button className='dialog-button' onClick={handleHideEditDialog}>Save</button>
      </div>
    </div>
  );
}

export default EditDialog;