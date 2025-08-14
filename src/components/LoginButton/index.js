import styles from './LoginButton.module.scss';
import clsx from 'clsx';

const LoginButton = ({ onClick, className }) => {
    return (
        <button onClick={onClick} className={clsx(styles.loginButton, className)}>
            Log In
        </button>
    );
};

export default LoginButton;
