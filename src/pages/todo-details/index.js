

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import todoStore from './../../store';
import styles from './index.module.scss';

const TodoDetails = () => {
  const { listId, taskId } = useParams();
  const [task, setTask] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(task ? task.title : '');

  useEffect(() => {
    todoStore.fetchTask(listId, taskId).then((task) => {
      console.log(task);
      setTask(task);
    });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSaveTitle = () => {
    todoStore.editTask(taskId, newTitle, listId);
    closeModal();
  };

  useEffect(() => {
    setNewTitle(task ? task.title : '');
  }, [task]);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className={styles['todo-details']}>
      <h2>{task.title}</h2>
      <p>Created: {new Date().toLocaleString()}</p>

      <button onClick={openModal}>Change Title</button>

      {isModalOpen && (
        <div>
          <div>
            <input type="text" value={newTitle} onChange={handleTitleChange} />
          </div>
          <div>
            <button onClick={handleSaveTitle}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(TodoDetails);
