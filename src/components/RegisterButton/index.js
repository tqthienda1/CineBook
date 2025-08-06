import styles from './RegisterButton.module.scss';
import clsx from 'clsx';

const RegisterButton = ({ className }) => {
    return <button className={clsx(styles.registerButton, className)}>Register</button>;
};

export default RegisterButton;
