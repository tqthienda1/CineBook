import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { LuEyeOff } from 'react-icons/lu';
import styles from './PasswordInput.module.scss';
import { useState } from 'react';

const PasswordInput = () => {
    const [hide, setHide] = useState(false);

    const handleClick = () => setHide((prev) => !prev);

    return (
        <div className={styles.passwordWrap}>
            <label htmlFor="password">Password</label>
            <div id = "password" className={styles.passwordInputWrap}>
                <input type={hide ? 'text' : 'password'} className={styles.passwordInput} />
                {hide && <MdOutlineRemoveRedEye onClick={handleClick} className={styles.eye} />}
                {!hide && <LuEyeOff onClick={handleClick} className={styles.eye} />}
            </div>
        </div>
    );
};

export default PasswordInput;
