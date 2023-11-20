
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from './../../store';
import styles from './index.module.scss';

const SearchTodo = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    todoStore.filteredTasks(searchText);
  };

  return (
    <div className={styles['search-todo']}>
      <input
        type="text"
        placeholder="Search by task title"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => todoStore.resetSearch()}>Reset</button>
    </div>
  );
};

export default observer(SearchTodo);
