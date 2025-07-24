import styles from './LoginButton.module.scss';
import clsx from 'clsx';

const LoginButton = ({ className }) => {
    return <button className={clsx(styles.loginButton, className)}>Log In</button>;
};

export default LoginButton;
