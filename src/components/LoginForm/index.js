import EmailInput from '../EmailInput';
import ForgetPassword from '../ForgetPassword';
import PasswordInput from '../PasswordInput';
import RememberCheckbox from '../RememberCheckbox';
import LoginButton from '../LoginButton';
import SocialLogin from '../SocialLogin';
import SeparateLine from '../SeparateLine';
import styles from './LoginForm.module.scss';
import logo from '../../assets/logo.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';

const LoginForm = ({ onSubmitResult }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        onSubmitResult('Cannot leave email or password blank');
        setEmail('');
        setPassword('');
        return;
      }

      const res = await fetch('http://localhost:5003/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      setEmail('');
      setPassword('');
      const data = await res.json();
      if (res.status === 409 || res.status === 401) {
        onSubmitResult('Please check your email or password again');
        return;
      } else if (res.status === 500) {
        onSubmitResult('Server error');
        return;
      } else if (res.status === 200) {
        setUser(jwtDecode(data.token));
        localStorage.setItem('token', data.token);
        onSubmitResult('Login successfully');
        return;
      }
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
      <PasswordInput value={password} onChange={setPassword} labelContent={'Password'} />
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
