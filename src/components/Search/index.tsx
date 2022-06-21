import { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { filterSelector } from '../../redux/filter/selectors';
import { setSearch } from '../../redux/filter/slice';
import debounce from 'lodash.debounce';
import styles from './styles.module.scss';
import { useAppDispath } from '../../redux/store';

function Search() {
  const dispatch = useAppDispath();
  const { search } = useSelector(filterSelector);
  const [value, setValue] = useState(search);
  const fireSearch = useCallback(
    debounce((value: string) => dispatch(setSearch(value)), 300),
    [],
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const setSearchValue = (value: string) => {
    setValue(value);
    fireSearch(value);
  };

  const onClear = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg className={styles.icon} height="48" viewBox="0 0 48 48" width="48">
        <path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
        <path d="M0 0h48v48H0z" fill="none" />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        value={value}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Поиск пиццы..."
      />
      {search && (
        <svg className={styles.clearIcon} onClick={() => onClear()} viewBox="0 0 24 24">
          <path d="M12,4c-4.419,0-8,3.582-8,8s3.581,8,8,8s8-3.582,8-8S16.419,4,12,4z M15.707,14.293c0.391,0.391,0.391,1.023,0,1.414  C15.512,15.902,15.256,16,15,16s-0.512-0.098-0.707-0.293L12,13.414l-2.293,2.293C9.512,15.902,9.256,16,9,16  s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L10.586,12L8.293,9.707c-0.391-0.391-0.391-1.023,0-1.414  s1.023-0.391,1.414,0L12,10.586l2.293-2.293c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L13.414,12L15.707,14.293z" />
        </svg>
      )}
    </div>
  );
}

export default Search;
