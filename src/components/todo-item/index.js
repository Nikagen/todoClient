import React from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from './../../store';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const TodoItem = ({ task, listId }) => {
  const handleToggleComplete = () => {
    todoStore.toggleComplete(task._id, listId);
  };

  const handleDelete = () => {
    todoStore.deleteTask(task._id, listId);
  };

  return (
    <div className={styles['todo-item']}>
      <Link to={`/todolists/${listId}/tasks/${task._id}`} style={{ color: task.completed ? ' #2ecc71' : '#e74c3c' }}>
        {task.title}
      </Link>
      <button className={styles['toggle-button']} onClick={handleToggleComplete}>
        Toggle Complete
      </button>
      <button className={styles['delete-button']} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default observer(TodoItem);
