import HidePassword from '../../../../assets/images/hide.png';
import ShowPassword from '../../../../assets/images/show.png';
import * as React from 'react';
import './EditProfileCard.css';

interface IEditProfileInput {
  labelHtmlFor: string;
  labelTitle: string;
  inputType: string;
  inputID: string;
  inputValue?: string;
  inputReadOnly?: boolean;
  inputOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputAdditionalClassName?: string;
  inputBlockAdditionalClassName?: string;
  isShowPassword?: boolean;
  handleShowPassword?: (value: boolean) => void | undefined;
}

function EditProfileInput({
  labelHtmlFor,
  labelTitle,
  inputType,
  inputID,
  inputValue,
  inputReadOnly,
  inputOnChange,
  inputBlockAdditionalClassName,
  inputAdditionalClassName,
  isShowPassword,
  handleShowPassword
}: IEditProfileInput) {
  return (
    <div className={`edit-profile-input ${inputBlockAdditionalClassName}`}>
      <label htmlFor={labelHtmlFor} className='edit-profile-input-label'>
        {labelTitle}
      </label>
      <input
        type={inputType}
        id={inputID}
        value={inputValue}
        readOnly={inputReadOnly}
        onChange={inputOnChange}
        className={`edit-profile-input-field ${inputAdditionalClassName}`}
      />
      {inputID === 'password' && (
        <>
          {isShowPassword ? (
            <img
              src={HidePassword}
              alt='hide-password'
              className='edit-profile-show-password-img'
              onClick={() => handleShowPassword && handleShowPassword(false)}
            />
          ) : (
            <img
              src={ShowPassword}
              alt='show-password'
              className='edit-profile-show-password-img'
              onClick={() => handleShowPassword && handleShowPassword(true)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default EditProfileInput;
