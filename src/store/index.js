import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class TodoStore {
  lists = [];
  resultLists = [];
  server = 'http://localhost:4000'

  constructor() {
    makeAutoObservable(this);
    this.fetchLists();
  }

  async fetchLists() {
    try {
      const response = await axios.get(`${this.server}/api/lists`);
      this.lists = response.data;
      this.resultLists = response.data;
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  }

  async fetchTask(listId, taskId) {
    try {
      const response = await axios.get(`${this.server}/api/lists/${listId}/tasks/${taskId}`);
      console.log(JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  }

  async addTask(task, listId, listTitle) {
    try {
      const existingList = this.lists.find((list) => list._id === listId);

      if (existingList && listId) {
        const response = await axios.post(`${this.server}/api/lists/${listId}/tasks`, { task });
        this.updateLists(response.data);
      } else {
        const response = await axios.post(`${this.server}/api/lists`, {
          title: `List ${listTitle}`,
          tasks: [task],
        });
        this.updateLists(response.data);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  async deleteTask(taskId, listId) {
    try {
      await axios.delete(`${this.server}/api/lists/${listId}/tasks/${taskId}`);
      this.updateLists();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  async editTask(taskId, newTitle, listId) {
    try {
      await axios.put(`${this.server}/api/lists/${listId}/tasks/${taskId}`, { newTitle });
      this.updateLists();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  }

  async toggleComplete(taskId, listId) {
    try {
      console.log(taskId)
      console.log(listId)
      await axios.put(`${this.server}/api/lists/${listId}/tasks/${taskId}/toggle-complete`);
      this.updateLists();
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  }


  async editListTitle(listId, newTitle) {
    try {
      await axios.put(`${this.server}/api/lists/${listId}`, { newTitle });
      this.updateLists();
    } catch (error) {
      console.error('Error editing list title:', error);
    }
  }

  async resetSearch() {
    this.resultLists = this.lists;
  }

  async filteredTasks(searchText) {
    const filteredTasks = [];
    this.lists?.forEach((list) => {
      const filteredList = {
        _id: list._id,
        title: list.title,
        tasks: list.tasks.filter((task) =>
          task.title.toLowerCase().includes(searchText.toLowerCase())
        ),
      };
      if (filteredList.tasks.length > 0) {
        filteredTasks.push(filteredList);
      }
    });
    console.log(filteredTasks)
    this.resultLists = filteredTasks;
    return this.resultLists;
  }

  updateLists(updatedList = null) {
    if (updatedList) {
      this.lists = this.lists.map((list) =>
        list._id === updatedList._id ? updatedList : list
      );
    } else {
      this.fetchLists();
    }
  }
}

const todoStore = new TodoStore();
export default todoStore;
