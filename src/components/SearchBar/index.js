import styles from './SearchBar.module.scss';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchBar = () => {
    return (
        <div className={styles.searchBarWrapper}>
            <div className={styles.searchInputWrapper}>
                <label className={styles.searchLabel} htmlFor="searchBar">
                    SEARCH
                </label>
                <input className={styles.searchInput} id="searchBar" placeholder="Enter movie name" type="text" />
                <FaMagnifyingGlass className={styles.magnifyingGlass} />
            </div>
        </div>
    );
};

export default SearchBar;
