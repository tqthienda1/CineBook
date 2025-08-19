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
  const handleRouteChange = () => {
    window.scrollTo(0, 0);
  };

  return (
    <nav className={styles.header}>
      <Link style={{ display: 'flex' }} to="/">
        <img className={styles.logo} src={logo} alt="" onClick={handleRouteChange} />
      </Link>
      <ul className={styles.buttons}>
        <Link to="/aboutus" className={styles.button} onClick={handleRouteChange}>
          <li>About Us</li>
        </Link>
        <Link to="/movies" className={styles.button} onClick={handleRouteChange}>
          <li>Movies</li>
        </Link>

        <Link to="/promotions" onClick={handleRouteChange}>
          <li>Promotions</li>
        </Link>
        {!user ? (
          <>
            <Link to="/register" className={styles.button} onClick={handleRouteChange}>
              <li>Register</li>
            </Link>
            <Link to="/login">
              <LoginButton className={styles.loginButton} onClick={handleRouteChange} />
            </Link>
          </>
        ) : user.role === 'user' ? (
          <Link to="/userprofile">
            <FaUser className={styles.userIcon} onClick={handleRouteChange} />
          </Link>
        ) : user.role === 'admin' ? (
          <Link to="/admindashboard">
            <FaUser className={styles.userIcon} onClick={handleRouteChange} />
          </Link>
        ) : null}
      </ul>
    </nav>
  );
};

export default Header;
