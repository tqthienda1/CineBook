import styles from './EmailInput.module.scss';

const EmailInput = () => {
    return (
        <div className={styles.emailWrap}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" className={styles.emailInput} />
        </div>
    );
};

export default EmailInput;
