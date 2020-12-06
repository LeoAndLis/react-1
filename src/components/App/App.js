import React, { Component } from 'react';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

export default class App extends Component {
  maxId = 100;

  state = {
    todoList: [this.createTask('Todo 1'), this.createTask('Todo 2'), this.createTask('Todo 3')],
    filter: 'All',
  };

  deleteTask = (id) => {
    this.setState(({ todoList }) => {
      const newList = todoList.filter((el) => el.id !== id);

      return {
        todoList: newList,
      };
    });
  };

  addTask = (text) => {
    const newTask = this.createTask(text);

    this.setState(({ todoList }) => {
      const newList = [...todoList, newTask];

      return {
        todoList: newList,
      };
    });
  };

  editTask = (id, label) => {
    this.setState(({ todoList }) => {
      const newList = todoList.map((task) => {
        if (task.id === id) {
          task.label = label;
        }
        return task;
      });

      return {
        todoList: newList,
      };
    });
  };

  createTask(label) {
    return {
      label,
      id: this.maxId++,
      completed: false,
      editing: false,
      date: new Date(),
    };
  }

  toggleProperty = (property, id) => {
    this.setState(({ todoList }) => {
      const newList = todoList.map((task) => {
        if (task.id === id) {
          task[property] = !task[property];
        }
        return task;
      });
      return {
        todoList: newList,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.toggleProperty('completed', id);
  };

  onToggleEditing = (id) => {
    this.toggleProperty('editing', id);
  };

  onFilterChange = (filterNewState) => {
    this.setState({
      filter: filterNewState,
    });
  };

  filterList = () => {
    const { todoList, filter } = this.state;

    switch (filter) {
      case 'Completed':
        return todoList.filter((task) => task.completed);
      case 'Active':
        return todoList.filter((task) => !task.completed);
      case 'All':
      default:
        return todoList;
    }
  };

  onDeleteCompleted = () => {
    this.setState(({ todoList }) => {
      const newList = todoList.filter((task) => !task.completed);

      return {
        todoList: newList,
      };
    });
  };

  render() {
    const { todoList, filter } = this.state;
    const tasksLeft = todoList.filter((item) => !item.completed).length;
    const filteredTodoList = this.filterList();

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdd={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={filteredTodoList}
            onEdit={this.editTask}
            onDeleted={this.deleteTask}
            onToggleEditing={this.onToggleEditing}
            onToggleCompleted={this.onToggleCompleted}
          />
          <Footer
            tasksLeft={tasksLeft}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onDeleteCompleted={this.onDeleteCompleted}
          />
        </section>
      </section>
    );
  }
}
