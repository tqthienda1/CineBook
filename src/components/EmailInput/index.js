import styles from './EmailInput.module.scss';

const EmailInput = ({value, onChange}) => {
    return (
        <div className={styles.emailWrap}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={value} onChange={(e) => onChange(e.target.value)} className={styles.emailInput} />
        </div>
    );
};

export default EmailInput;
