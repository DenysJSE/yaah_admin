import './button.css'

interface ButtonInterface {
  text: string;
  isDisabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

function Button({text, isDisabled, type}: ButtonInterface) {
  return (
    <button type={type} className={`button-component ${isDisabled ? 'button-component-disable' : '' }`} disabled={isDisabled}>{text}</button>
  );
}

export default Button