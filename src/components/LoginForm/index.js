import EmailInput from '../EmailInput';
import ForgetPassword from '../ForgetPassword';
import PasswordInput from '../PasswordInput';
import RememberCheckbox from '../RememberCheckbox';
import LoginButton from '../LoginButton';
import SocialLogin from '../SocialLogin';
import SeparateLine from '../SeparateLine';
import styles from './LoginForm.module.scss';
import logo from '../../assets/logo.png';

const LoginForm = () => {
    return (
        <div className={styles.loginForm}>
            <img className={styles.logo} src={logo} alt="logo"></img>
            <div className={styles.description}>
                <h1 className={styles.welcome}>Welcome back</h1>
                <p className={styles.subtitle}>Enter your email and password to access your account.</p>
            </div>
            <EmailInput />
            <PasswordInput labelContent={'Password'}/>
            <div className={styles.rememberForgetWrap}>
                <RememberCheckbox />
                <ForgetPassword />
            </div>
            <LoginButton />
            <SeparateLine text="Or Login With" />

            <SocialLogin />
        </div>
    );
};

export default LoginForm;
