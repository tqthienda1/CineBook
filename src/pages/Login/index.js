import LoginForm from '../../components/LoginForm';
import styles from './Login.module.scss';
import logoBackground from '../../assets/login_background.jpg';

const Login = () => {
    return (
        <div className={styles.container}>
            <img className={styles.background} src={logoBackground} alt="" />
            <LoginForm />
        </div>
    );
};

export default Login;
