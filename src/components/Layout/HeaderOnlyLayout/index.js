import Header from '../DefaultLayout/Header';
import styles from './HeaderOnlyLayout.module.scss';

const HeaderOnlyLayout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <>{children}</>
        </div>
    );
};

export default HeaderOnlyLayout;
