import RegisterForm from '../../components/RegisterForm';
import styles from './Register.module.scss';
import logoBackground from '../../assets/login_background.jpg';

const Register = () => {
  return (
    <div className={styles.container}>
      <img className={styles.background} src={logoBackground} alt="" />
      <RegisterForm />
    </div>
  );
};

export default Register;
