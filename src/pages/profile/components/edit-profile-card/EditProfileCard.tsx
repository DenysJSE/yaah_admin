import CloseButton from 'assets/images/close.png';
import Button from 'components/button.tsx';
import UserService from 'services/UserService.ts';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './EditProfileCard.css';
import EditProfileInput from './EditProfileInput.tsx';
import { useParams } from 'react-router-dom';
import NotFoundPage from 'pages/not-found-page/NotFoundPage.tsx';
import EditProfileRoles from './EditProfileRoles.tsx';

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  password?: string;
  coins: number;
  created_at: string;
  roles: {
    id: number;
    value: string;
    description: string;
  }[];
}

export class InitialUser {
  id = 0;
  nickname = '';
  email = '';
  password = '';
  coins = 0;
  created_at = 0;
  roles = [{
    id: 0,
    value: '',
    description: ''
  }];
}

export interface IRole {
  id: number;
  value: string;
  description: string;
}

function EditProfileCard() {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | InitialUser>(() => new InitialUser);
  const [newNickname, setNewNickname] = useState(user.nickname);
  const [userPassword, setUserPassword] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    setNewNickname(user.nickname);
  }, [user.nickname]);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        if (id) {
          const response = await UserService.getUserByID(parseInt(id));
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };
    if (id) {
      fetchUserById();
    }
  }, [id]);

  if (!id) {
    return <NotFoundPage />;
  }

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

  const handleCloseEditProfileCard = () => {
    history.back();
  };

  const handleShowPassword = (value: boolean) => {
    setIsShowPassword(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='profile-page-edit-background'>
        <div className='profile-page-edit-form'>
          <div className='profile-page-edit-form-header'>
            <h1 className='profile-page-edit-form-header-title'>Edit Profile</h1>
            <img
              src={CloseButton}
              alt='closeButton'
              className='profile-page-edit-form-header-close-button'
              onClick={handleCloseEditProfileCard}
            />
          </div>
          <div className='edit-profile-inputs'>
            <div className='edit-profile-inputs-duo'>
              <EditProfileInput
                labelHtmlFor='nickname'
                labelTitle='Nickname'
                inputType='text'
                inputID='nickname'
                inputValue={newNickname}
                inputOnChange={e => setNewNickname(e.target.value)}
              />
              <EditProfileInput
                labelHtmlFor='email'
                labelTitle='Email'
                inputType='email'
                inputID='email'
                inputValue={user.email}
                inputReadOnly={true}
              />
            </div>
            <div className='edit-profile-inputs-duo'>
              <EditProfileInput
                labelHtmlFor='password'
                labelTitle='Password'
                inputType={`${isShowPassword ? 'text' : 'password'}`}
                inputID='password'
                inputOnChange={e => setUserPassword(e.target.value)}
                inputBlockAdditionalClassName='password'
                inputAdditionalClassName='password'
                isShowPassword={isShowPassword}
                handleShowPassword={handleShowPassword}
              />
              <EditProfileInput
                labelHtmlFor='new_password'
                labelTitle='New Password'
                inputType={`${isShowPassword ? 'text' : 'password'}`}
                inputID='new_password'
                inputOnChange={e => setNewUserPassword(e.target.value)}
                inputAdditionalClassName='password'
              />
            </div>
            <hr className='edit-profile-role-hr' />
            <EditProfileRoles user={user} />
          </div>
          <hr className='edit-profile-role-hr' />
          <div className='edit-profile-button-save'>
            <Button text={'Save'} type={'submit'} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditProfileCard;
