import LoginForm from '../../components/LoginForm';
import styles from './Login.module.scss';
import logoBackground from '../../assets/login_background.jpg';
import PopUp from '../../components/PopUp';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpContent, setPopUpContent] = useState('');
  const navigate = useNavigate();

  const handleOKClick = () => {
    if (showPopUp) {
      setShowPopUp(false);
      if (popUpContent === 'Login successfully') {
        const tokenDecoded = jwtDecode(localStorage.getItem('token'));
        if (tokenDecoded.role === 'user') {
          navigate('/');
        }
        else if (tokenDecoded.role === 'admin') {
            navigate('/admindashboard')
        }
      }
    }
  };

  const handleLoginResult = (result) => {
    setShowPopUp(true);
    setPopUpContent(result);
  };

  return (
    <div className={styles.container}>
      <img className={styles.background} src={logoBackground} alt="" />
      <LoginForm onSubmitResult={handleLoginResult} />
      {showPopUp && <PopUp content={popUpContent} onClick={handleOKClick} />}
    </div>
  );
};

export default Login;
