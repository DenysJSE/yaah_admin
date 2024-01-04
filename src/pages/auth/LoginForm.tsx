import './Auth.css';
import 'react-toastify/dist/ReactToastify.css';

interface ILoginForm {
  handleAuthMode: () => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function LoginForm({handleAuthMode, handleEmailChange, handlePasswordChange, handleSubmit}: ILoginForm) {

  return (
    <div className='auth-form'>
      <div className='auth-form-title-subtitle'>
        <h1 className='auth-form-title'>Login</h1>
        <p className='auth-form-subtitle'>Please enter your details</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='auth-form-inputs'>
          <div className='auth-form-inputs-input'>
            <label htmlFor='auth-form-input-email' className='auth-form-input-label'>Email</label>
            <input type='email' className='auth-form-input' id='auth-form-input-email' onChange={handleEmailChange} />
          </div>
          <div className='auth-form-inputs-input'>
            <label htmlFor='auth-form-input-password' className='auth-form-input-label'>Password</label>
            <input type='password' className='auth-form-input' id='auth-form-input-password' onChange={handlePasswordChange} />
          </div>
        </div>
        <div className='auth-form-input-button'>
          <button type='submit' className={`button-component`}>Login</button>
        </div>
      </form>
      <p className='auth-form-signup'>
        Don't have an account?
        <span className='auth-form-signup-link' onClick={handleAuthMode}> Sign up</span>
      </p>
    </div>
  );
}

export default LoginForm;