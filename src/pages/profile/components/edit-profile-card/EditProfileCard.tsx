import { Context } from '../../../../App.tsx';
import CloseButton from '../../../../assets/images/close.png';
import HidePassword from '../../../../assets/images/hide.png';
import ShowPassword from '../../../../assets/images/show.png';
import Button from '../../../../components/button.tsx';
import { IUser } from '../../Profile.tsx';
import UserService from '../../../../services/UserService.ts';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import './EditProfileCard.css';

interface IEditProfileCard {
  user: IUser;
  handleCloseEditProfileCard: () => void;
}

function EditProfileCard({
  user,
  handleCloseEditProfileCard
}: IEditProfileCard) {
  const { store } = useContext(Context);
  const [newNickname, setNewNickname] = useState(user.nickname);
  const [userPassword, setUserPassword] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNickname !== user.nickname) {
      await handleSubmitUpdateNickname();
    }
    if (newUserPassword !== '' && userPassword !== '') {
      await handleSubmitUpdatePassword();
    }
  };

  const handleSubmitUpdatePassword = async () => {
    try {
      const userID = user.id;
      await UserService.updatePassword({
        userID,
        userPassword,
        newUserPassword
      });
      toast.success('The password was updated');
    } catch (e) {
      handleFormSubmissionError(e);
    }
  };

  const handleSubmitUpdateNickname = async () => {
    try {
      const userID = user.id;
      await UserService.updateUserNickname({ userID, newNickname });
      toast.success('The nickname was updated');
      await store.getUser();
    } catch (e) {
      handleFormSubmissionError(e);
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleFormSubmissionError = e => {
    const errorMessages = e.response?.data?.message || 'An error occurred';
    if (Array.isArray(errorMessages)) {
      errorMessages.forEach((errorMessage: string) => {
        toast.error(errorMessage);
      });
    } else {
      toast.error(errorMessages);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='profile-page-edit-background'>
        <div className='profile-page-edit-form'>
          <div className='profile-page-edit-form-header'>
            <h1 className='profile-page-edit-form-header-title'>
              Edit Profile
            </h1>
            <img
              src={CloseButton}
              alt='closeButton'
              className='profile-page-edit-form-header-close-button'
              onClick={handleCloseEditProfileCard}
            />
          </div>
          <div className='edit-profile-inputs'>
            <div className='edit-profile-input'>
              <label htmlFor='nickname' className='edit-profile-input-label'>
                Nickname
              </label>
              <input
                type='text'
                id='nickname'
                value={newNickname}
                onChange={e => setNewNickname(e.target.value)}
                className='edit-profile-input-field'
              />
            </div>
            <div className='edit-profile-input'>
              <label htmlFor='email' className='edit-profile-input-label'>
                Email
              </label>
              <input
                type='email'
                id='email'
                value={user.email}
                readOnly={true}
                className='edit-profile-input-field'
              />
            </div>
            <div className='edit-profile-input password'>
              <label htmlFor='password' className='edit-profile-input-label'>
                Password
              </label>
              <input
                type={`${isShowPassword ? 'text' : 'password'}`}
                id='password'
                className='edit-profile-input-field password'
                onChange={e => setUserPassword(e.target.value)}
              />
              {isShowPassword ? (
                <img
                  src={HidePassword}
                  alt='hide-password'
                  className='edit-profile-show-password-img'
                  onClick={() => setIsShowPassword(false)}
                />
              ) : (
                <img
                  src={ShowPassword}
                  alt='show-password'
                  className='edit-profile-show-password-img'
                  onClick={() => setIsShowPassword(true)}
                />
              )}
            </div>
            <div className='edit-profile-input'>
              <label
                htmlFor='new_password'
                className='edit-profile-input-label'
              >
                New Password
              </label>
              <input
                type={`${isShowPassword ? 'text' : 'password'}`}
                id='new_password'
                className='edit-profile-input-field'
                onChange={e => setNewUserPassword(e.target.value)}
              />
            </div>
          </div>
          <div className='edit-profile-button-save'>
            <Button text={'Save'} type={'submit'} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditProfileCard;
