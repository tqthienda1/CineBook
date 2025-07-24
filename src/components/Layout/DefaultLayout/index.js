import Header from './Header';
import Footer from './Footer';
import styles from './DefaultLayout.module.scss';

const DefaultLayout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <>{children}</>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
