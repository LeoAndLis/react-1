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

  startTimer = (taskIndex) => {
    console.log('start timer');
    const { todoList } = this.state;
    if (todoList[taskIndex].timerId === null) {
      const timerId = setInterval(() => this.increaseTimeSpent(taskIndex), 1000);
      this.setState(({ todoList: oldTodoList }) => {
        const todoList = oldTodoList;
        todoList[taskIndex].timerId = timerId;

        return { todoList };
      });
    }
  };

  increaseTimeSpent = (taskIndex) => {
    console.log(`increase timeSpent for ${taskIndex}`);
    this.setState(({ todoList: oldTodoList }) => {
      const todoList = oldTodoList;
      console.log(todoList[taskIndex].timeSpent);
      todoList[taskIndex].timeSpent += 1;
      console.log(todoList[taskIndex].timeSpent);

      return { todoList };
    });
  };

  stopTimer = (taskIndex) => {
    console.log('stop timer');
    const { todoList } = this.state;
    if (todoList[taskIndex].timerId !== null) {
      clearInterval(todoList[taskIndex].timerId);
      this.setState(({ todoList: oldTodoList }) => {
        const todoList = oldTodoList;
        todoList[taskIndex].timerId = null;

        return { todoList };
      });
    }
  };

  deleteTask = (id, taskIndex) => {
    this.setState(({ todoList }) => {
      const newList = todoList.filter((el) => {
        if (el.id === id) {
          console.log('clear interval on deleting task');
          clearInterval(el.timerId);
        }
        return el.id !== id;
      });

      return {
        todoList: newList,
      };
    });
    console.log(this.state.todoList);
  };

  addTask = (data) => {
    const { label, min, sec } = data;
    const newTask = this.createTask(label, min, sec);

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

  createTask(label, min = 0, sec = 0) {
    const timeSpent = min * 60 + +sec;
    return {
      label,
      id: this.maxId++,
      completed: false,
      editing: false,
      date: new Date(),
      timeSpent,
      timerId: null,
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
            onStartTimer={this.startTimer}
            onStopTimer={this.stopTimer}
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
