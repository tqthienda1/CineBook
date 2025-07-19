import styles from './EmailInput.module.scss';

const EmailInput = () => {
    return (
        <div className={styles.emailWrap}>
            <label htmlFor={styles.emailInput}>Email</label>
            <input type="text" className={styles.emailInput} />
        </div>
    );
};

export default EmailInput;
