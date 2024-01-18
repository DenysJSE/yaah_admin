import CloseButton from '../../../../assets/images/close.png';
import DeleteIcon from '../../../../assets/images/bin.png';
import Button from '../../../../components/button.tsx';
import UserService from '../../../../services/UserService.ts';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './EditProfileCard.css';
import EditProfileInput from './EditProfileInput.tsx';
import ModalWindow from '../../../../components/ModalWindow.tsx';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../../../not-found-page/NotFoundPage.tsx';

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  password?: string
  coins: number;
  created_at: string
  roles: {
    id: number;
    value: string;
    description: string;
  }[];
}

class InitialUser {
  id = 0
  nickname = ''
  email = ''
  password = ''
  coins = 0
  created_at = 0
  roles = [{
    id: 0,
    value: '',
    description: ''
  }]
}

export interface IRole {
  id: number
  value: string
  description: string
}

function EditProfileCard() {
  const { id } = useParams();

  const [user, setUser] = useState<IUser | InitialUser>(() => new InitialUser);
  const [newNickname, setNewNickname] = useState(user.nickname);
  const [userPassword, setUserPassword] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [clickedRoleValue, setClickedRoleValue] = useState<string | null>(null);
  const [roleID, setRoleID] = useState<number>(0)

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
      fetchUserById()
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

  const handleShowDialog = (role: IRole) => {
    setIsShowDialog(true)
    setClickedRoleValue(role.value);
    setRoleID(role.id)
  }

  const handleHideDialog = () => {
    setIsShowDialog(false)
    setClickedRoleValue(null);
  }

  const handleCloseEditProfileCard = () => {
    history.back();
  };

  const handleShowPassword = (value: boolean) => {
    setIsShowPassword(value);
  };

  const handleDeleteRole = async (roleID: number)=> {
    try {
      const userString: string | null = localStorage.getItem('user');

      if (userString) {
        const user: IUser = JSON.parse(userString);
        const userID = user.id
        await UserService.deleteUserRole(userID, roleID)
        window.location.reload()
      }
    } catch (e) {
      console.log(e);
    }
  }

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
            <hr className='edit-profile-role-hr'/>
            <div className='edit-profile-inputs-roles'>
              <h2 className='profile-page-edit-form-header-title'>Roles:</h2>
              <div className='edit-profile-inputs-roles-wrapper'>
                {user.roles.map(role => (
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
                  modalWindowText={'Are you sure about it? If it will be done, there are no turning back!'}
                />
                // <ProfileEditDeleteRoleDialog
                //   roleValue={clickedRoleValue}
                //   handleCanselDelete={handleHideDialog}
                //   handleDeleteRole={() => handleDeleteRole(roleID)}
                // />
              }
            </div>
          </div>
          <hr className='edit-profile-role-hr'/>
          <div className='edit-profile-button-save'>
            <Button text={'Save'} type={'submit'} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditProfileCard;
