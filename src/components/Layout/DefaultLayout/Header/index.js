import { FaUser } from 'react-icons/fa';
import styles from './Header.module.scss';
import LoginButton from '../../../LoginButton';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.png';
import RegisterButton from '../../../RegisterButton';
import { useContext } from 'react';
import { AuthContext } from '../../../../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <nav className={styles.header}>
      <Link style={{ display: 'flex' }} to="/">
        <img className={styles.logo} src={logo} alt="" />
      </Link>
      <ul className={styles.buttons}>
        <Link to="/aboutus" className={styles.button}>
          <li>About Us</li>
        </Link>
        <Link to="/movies" className={styles.button}>
          <li>Movies</li>
        </Link>

        <Link to="/promotions">
          <li>Promotions</li>
        </Link>
        {!user ? (
          <>
            <Link to="/register" className={styles.button}>
              <li>Register</li>
            </Link>
            <Link to="/login">
              <LoginButton className={styles.loginButton} />
            </Link>
          </>
        ) : user.role === 'user' ? (
          <Link to="/userprofile">
            <FaUser className={styles.userIcon} />
          </Link>
        ) : user.role === 'admin' ? (
          <Link to="/admindashboard">
            <FaUser className={styles.userIcon} />
          </Link>
        ) : null}
      </ul>
    </nav>
  );
};

export default Header;
