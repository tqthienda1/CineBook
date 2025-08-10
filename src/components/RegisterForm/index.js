import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import SocialLogin from '../SocialLogin';
import SeparateLine from '../SeparateLine';
import styles from './RegisterForm.module.scss';
import logo from '../../assets/logo.png';
import RegisterButton from '../RegisterButton';
import { useState } from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        alert('Password do not match');
        return;
      }

        alert("Password do not match")
        return
      }
      
      const res = await fetch('http://localhost:5003/auth/register', {
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
    <div className={styles.registerForm}>
      <img className={styles.logo} src={logo} alt="logo"></img>
      <div className={styles.description}>
        <h1 className={styles.welcome}>Welcome to CineBook</h1>
        <p className={styles.subtitle}>Enter your email and password to create your account.</p>
      </div>
      <EmailInput value={email} onChange={setEmail} />
      <PasswordInput value={password} onChange={setPassword} labelContent={'Password'} />
      <PasswordInput value={confirmPassword} onChange={setConfirmPassword} labelContent={'Re- enter the password'} />

      <RegisterButton onClick={handleRegister} />
      <SeparateLine text="Or Register With" />

      <SocialLogin />
    </div>
  );
};

export default RegisterForm;
