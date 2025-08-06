import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import SocialLogin from '../SocialLogin';
import SeparateLine from '../SeparateLine';
import styles from './RegisterForm.module.scss';
import logo from '../../assets/logo.png';
import RegisterButton from '../RegisterButton';

const RegisterForm = () => {
    return (
        <div className={styles.registerForm}>
            <img className={styles.logo} src={logo} alt="logo"></img>
            <div className={styles.description}>
                <h1 className={styles.welcome}>Welcome to CineBook</h1>
                <p className={styles.subtitle}>Enter your email and password to create your account.</p>
            </div>
            <EmailInput />
            <PasswordInput labelContent={'Enter Password'}/>
            <PasswordInput labelContent={'Enter Password again'}/>
            
            <RegisterButton />
            <SeparateLine text="Or Register With" />

            <SocialLogin />
        </div>
    );
};

export default RegisterForm;

