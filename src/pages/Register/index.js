import RegisterForm from '../../components/RegisterForm';
import styles from './Register.module.scss';
import logoBackground from '../../assets/login_background.jpg';
import PopUp from '../../components/PopUp';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpContent, setPopUpContent] = useState('');

  const handleOKClick = () => {
    if (showPopUp) {
      setShowPopUp(false);
    }
  };

  const handleRegisterResult = (result) => {
    setShowPopUp(true);
    setPopUpContent(result);
  };

  return (
    <div className={styles.container}>
      <img className={styles.background} src={logoBackground} alt="" />
      <RegisterForm onSubmitResult={handleRegisterResult} />
      {showPopUp && <PopUp onClick={handleOKClick} content={popUpContent} />}
    </div>
  );
};

export default Register;
