import { FaUser } from 'react-icons/fa';
import styles from './Header.module.scss';
import LoginButton from '../../../LoginButton';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.png';
import RegisterButton from '../../../RegisterButton';

const Header = () => {
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
        <li>Promotions</li>
        <Link to="/register" className={styles.button}>
          <li>Register</li>
        </Link>
        <Link to="/login">
          <LoginButton className={styles.loginButton} />
        </Link>
        <Link to="/userprofile">
          <FaUser className={styles.userIcon} />
        </Link>
        <Link to="/admindashboard">
          <FaUser className={styles.userIcon} />
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
