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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await fetch('http://localhost:5003/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className={styles.loginForm}>
            <img className={styles.logo} src={logo} alt="logo"></img>
            <div className={styles.description}>
                <h1 className={styles.welcome}>Welcome back</h1>
                <p className={styles.subtitle}>Enter your email and password to access your account.</p>
            </div>
            <EmailInput value={email} onChange={setEmail} />
            <PasswordInput labelContent={'Password'} />
            <div className={styles.rememberForgetWrap}>
                <RememberCheckbox />
                <ForgetPassword />
            </div>
            <LoginButton onClick={handleLogin} />
            <SeparateLine text="Or Login With" />

            <SocialLogin />
        </div>
    );
};

export default LoginForm;
