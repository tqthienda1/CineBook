import styles from './Shelf.module.scss';

const Shelf = ({ shelf }) => {
    return (
        <div className={styles.shelfWrapper}>
            <h1>{shelf.header}</h1>
            <ul className={styles.listItems}>
                {shelf.items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Shelf;
