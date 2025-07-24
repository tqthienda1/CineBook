import styles from './RememberCheckbox.module.scss';

const RememberCheckbox = () => {
    return (
        <div className={styles.rememberCheckboxWrap}>
            <input id="checkbox" type="checkbox" className={styles.checkbox} />
            <label htmlFor="checkbox">Remember me</label>
        </div>
    );
};

export default RememberCheckbox;
