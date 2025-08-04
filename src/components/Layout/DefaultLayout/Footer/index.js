import styles from './Footer.module.scss';
import logo from '../../../../assets/logo.png';
import SeparateLine from '../../../SeparateLine';
import Shelf from '../../../Shelf';
import { FaFacebook } from 'react-icons/fa6';
import { FaFacebookMessenger } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';

const accountShelf = {
    header: 'ACCOUNT',
    items: ['Sign in', 'Sign up', 'Membership'],
};

const moviesShelf = {
    header: 'MOVIES',
    items: ['Now showing', 'Coming soon'],
};

const cinebookShelf = {
    header: 'CINEBOOK',
    items: ['About us', 'Contact'],
};

const venuesShelf = {
    header: 'VENUES',
    items: ['All theaters', 'CineBook Quoc Thanh (HCMC)', 'CineBook Hai Ba Trung (HCMC)'],
};

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerDetails}>
                <div className={styles.branding}>
                    <img className={styles.logo} src={logo} alt="" />
                    <div className={styles.slogan}>
                        your gateway to <span style={{ color: '#fb2b2b' }}>cinematic wonders</span>.
                    </div>

                    <div className={styles.brandingButtonWrapper}>
                        <div className={styles.button}>book tickets</div>
                        <div className={styles.button}>food & beverage</div>
                    </div>
                </div>

                <Shelf shelf={accountShelf} />
                <Shelf shelf={moviesShelf} />
                <Shelf shelf={cinebookShelf} />
                <Shelf shelf={venuesShelf} />
            </div>
            <SeparateLine />
            <div className={styles.socialMediaWrapper}>
                <FaFacebook />
                <FaFacebookMessenger />
                <FaInstagram />
                <FaYoutube />
                <FaTiktok />
            </div>
            <p style={{ width: '100%', textAlign: 'center' }}>© Copyright. All Right Reserved</p>
        </div>
    );
};

export default Footer;
