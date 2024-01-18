import './ModalWindow.css'

interface IDialogMessage {
  handleCansel: () => void
  handleDoAction: (arg?: any) => void
  cancelText: string
  doActionText: string
  modalWindowTitle: string
  modalWindowText: string
}

function ModalWindow({handleCansel, handleDoAction, cancelText, doActionText, modalWindowTitle, modalWindowText}: IDialogMessage) {
  return (
    <div className='modal-wrapper'>
      <div className='modal'>
        <h1 className='modal-title'>{modalWindowTitle}</h1>
        <p className='modal-content-text'>{modalWindowText}</p>
        <div className='modal-buttons'>
          <button className='modal-button cancel' onClick={handleCansel}>{cancelText}</button>
          <button className='modal-button do-action' onClick={() => handleDoAction}>{doActionText}</button>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow