
import React from 'react';
import { observer } from 'mobx-react-lite';
import TodoList from './pages/todo-list';
import { Routes, Route, NavLink } from 'react-router-dom';
import CreateTodo from './pages/create-todo';
import TodoDetails from './pages/todo-details';
import SearchTodo from './components/search-todo';
import styles from './index.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <h1><NavLink to='/'>Todo App</NavLink></h1>
      <SearchTodo />
      <nav>
        <NavLink to="/" end>Todo List</NavLink>
        <NavLink to="/create">Create Todo</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/todolists/:listId/tasks/:taskId" element={<TodoDetails />} />
      </Routes>
    </div>
  );
};

export default observer(App);
