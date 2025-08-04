import { FaUser } from 'react-icons/fa';
import styles from './Header.module.scss';
import LoginButton from '../../../LoginButton';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.png';

const Header = () => {
    return (
        <nav className={styles.header}>
            <Link style={{ display: 'flex' }} to="/">
                <img className={styles.logo} src={logo} alt="" />
            </Link>
            <ul className={styles.buttons}>
                <li>Movies</li>
                <li>Cinemas</li>
                <li>Promotions</li>
                <li>Sign In</li>
                <Link to="/login">
                    <LoginButton className={styles.loginButton} />
                </Link>
                <Link to="/userprofile">
                    <FaUser className={styles.userIcon}/>
                </Link>
            </ul>
        </nav>
    );
};

export default Header;
