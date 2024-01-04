import LoginForm from './LoginForm.tsx';
import RegistrationForm from './RegistrationForm.tsx';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../../App.tsx';
import './Auth.css';

function AuthPage() {
  const [email, setEmail] = useState(' ');
  const [nickname, setNickname] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (!/^\S+@\S+\.\S+$/.test(event.target.value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (event.target.value.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);

    if (event.target.value.length < 3) {
      setNicknameError('Nickname must be at least 3 characters.');
    } else {
      setNicknameError('');
    }
  };

  const handleChangeAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'registration' : 'login');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordError) {
      toast.error(passwordError.concat());
      return;
    }

    if (emailError) {
      toast.error(emailError.concat());
      return;
    }

    if (nicknameError) {
      toast.error(nicknameError.concat())
      return
    }

    if (authMode === 'login') {
      await store.Login({ email, password });
      if (store.isAuthenticated) {
        toast.success("You login to your account successfully")
        navigate('/lessons');
        await store.getUser()
      }
    }

    if (authMode === 'registration') {
      await store.registration({ email, password, nickname });
      if (store.isAuthenticated) {
        toast.success("You registered to your account successfully")
        navigate('/lessons');
        await store.getUser()
      }
    }
  };

  return (
    <div className='auth-page'>
      {authMode === 'login' ? (
        <LoginForm
          handleAuthMode={handleChangeAuthMode}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <RegistrationForm
          handleAuthMode={handleChangeAuthMode}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleNicknameChange={handleNicknameChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default AuthPage;
