

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import todoStore from './../../store';
import styles from './index.module.scss';

const CreateTodo = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newListTitle, setNewListTitle] = useState('');
  const [listId, setListId] = useState('');
  const navigate = useNavigate();

  const handleCreateTask = () => {
    if (newTaskTitle.trim() !== '') {
      todoStore.addTask(
        {
          id: Date.now(),
          title: newTaskTitle,
          completed: false,
        },
        listId,
        newListTitle
      );
      setNewTaskTitle('');
      navigate('/');
    }
  };

  const handleListChange = (selectedListId) => {
    setListId(selectedListId);
  };

  return (
    <div className={styles['create-todo']}>
      <h2>Create New Todo</h2>
      <span>Input title task</span>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <span>Input title list</span>
      <input
        type="text"
        value={newListTitle}
        onChange={(e) => setNewListTitle(e.target.value)}
      />
      {todoStore?.resultLists?.map((list) => (
        <h3 key={list._id} onClick={() => handleListChange(list._id)}>
          {list.title}
        </h3>
      ))}
      <button onClick={handleCreateTask}>Create Todo</button>
    </div>
  );
};

export default observer(CreateTodo);
