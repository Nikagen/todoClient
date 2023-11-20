import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import TodoItem from '../../components/todo-item';
import todoStore from '../../store';
import styles from './index.module.scss';

const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [selectedListId, setSelectedListId] = useState(null);

  const openModal = (listId, currentTitle) => {
    setSelectedListId(listId);
    setNewListTitle(currentTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedListId(null);
    setNewListTitle('');
    setIsModalOpen(false);
  };

  const handleTitleChange = (e) => {
    setNewListTitle(e.target.value);
  };

  const handleSaveTitle = () => {
    todoStore.editListTitle(selectedListId, newListTitle);
    closeModal();
  };

  return (
    <div className={styles['todo-list']}>
      {todoStore.resultLists?.map((list) => {
        return (
          <div key={`${list._id} ${list._id}`} className={styles['list-item']}>
            <h3>
              {list.title}
              <button className={styles['change-title-button']} onClick={() => openModal(list._id, list.title)}>
                Change Title
              </button>
            </h3>
            {list.tasks.map((task) => {
              console.log(task);
              return <TodoItem key={`asdasdasd_ ${task._id}`} task={task} listId={list._id} />;
            })}
          </div>
        );
      })}

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles['modal-content']}>
            <h2>Change List Title</h2>
            <div>
              <label>New Title:</label>
              <input type="text" className={styles['title-input']} onChange={handleTitleChange} />
            </div>
            <div>
              <button className={styles['save-button']} onClick={handleSaveTitle}>
                Save
              </button>
              <button className={styles['save-button']} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(TodoList);
