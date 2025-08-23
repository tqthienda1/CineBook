import { useState } from 'react';
import styles from './SearchBar.module.scss';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchBar = ({ handleSearchSubmit }) => {
  const [value, setValue] = useState();

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchInputWrapper}>
        <label className={styles.searchLabel} htmlFor="searchBar">
          SEARCH
        </label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit(value);
            }
          }}
          className={styles.searchInput}
          id="searchBar"
          placeholder="Enter movie name"
          type="text"
        />
        <FaMagnifyingGlass className={styles.magnifyingGlass} onClick={() => handleSearchSubmit(value)} />
      </div>
    </div>
  );
};

export default SearchBar;
