import styles from './RememberCheckbox.module.scss';

const RememberCheckbox = () => {
    return (
        <div className={styles.rememberCheckboxWrap}>
            <input type="checkbox" className={styles.checkbox} />
            <label htmlFor={styles.checkbox}>Remember me</label>
        </div>
    );
};

export default RememberCheckbox;
