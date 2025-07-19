import LoginForm from '../../components/LoginForm';
import styles from './Login.module.scss';

const Login = () => {
    return (
        <div className={styles.container}>
            <img className= {styles.background} src="../../login_background.jpg" alt="" />
            <LoginForm />
        </div>
    );
};

export default Login;
