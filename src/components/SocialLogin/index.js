import styles from './SocialLogin.module.scss';

const SocialLogin = () => {
    return (
        <div className={styles.socialButtonWrap}>
            <button className={styles.googleButton}>
                <img className={styles.googleLogo} src="../../google_icon.svg" alt="google logo" />
                Google
            </button>

            <button className={styles.facebookButton}>
                <img className={styles.facebookLogo} src="../../facebook_icon.svg" alt="facebook logo" />
                Facebook
            </button>
        </div>
    );
};

export default SocialLogin;
