import styles from './RegisterButton.module.scss';
import clsx from 'clsx';

const RegisterButton = ({ className, onClick }) => {
  return (
    <button onClick={onClick} className={clsx(styles.registerButton, className)}>
      Register
    </button>
  );
};

export default RegisterButton;
