import styles from './Dropdown.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';

const Dropdown = ({ defaultValue, content }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultValue);

    const handleClick = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    const handleChoose = (item) => {
        setValue(item);
        setOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <div onClick={handleClick} className={styles.dropdownButton}>
                <div>{value}</div>
                <IoIosArrowDown className={styles.arrow} />
            </div>
            {open && (
                <div className={styles.dropdownContent}>
                    <ul>
                        {content.map((item, index) => (
                            <li onClick={() => handleChoose(item)} key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
