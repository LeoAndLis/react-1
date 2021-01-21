import React, { Component } from 'react';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

export default class App extends Component {
  maxId = 100;

  state = {
    todoList: new Map(),
    filter: 'All',
  };

  componentDidMount() {
    this.setState(({ todoList: oldTodoList }) => {
      const todoList = new Map([...oldTodoList]);
      todoList
        .set(this.maxId++, this.createTask('Task 1'))
        .set(this.maxId++, this.createTask('Task 2'))
        .set(this.maxId++, this.createTask('Task 3'));
      return {
        todoList,
      };
    });
  }

  startTimer = (taskId) => {
    const { todoList } = this.state;
    const task = todoList.get(taskId);
    if (task.timerId === null) {
      const timerId = setInterval(() => this.increaseTimeSpent(taskId), 1000);
      this.setState(({ todoList: oldTodoList }) => {
        const todoList = new Map([...oldTodoList]);
        const task = todoList.get(taskId);
        task.timerId = timerId;
        todoList.set(taskId, task);

        return {
          todoList,
        };
      });
    }
  };

  increaseTimeSpent = (taskId) => {
    this.setState(({ todoList: oldTodoList }) => {
      const todoList = new Map([...oldTodoList]);
      const task = todoList.get(taskId);
      task.timeSpent += 1;
      todoList.set(taskId, task);

      return {
        todoList,
      };
    });
  };

  stopTimer = (taskId) => {
    const { todoList } = this.state;
    const task = todoList.get(taskId);
    if (task.timerId !== null) {
      clearInterval(task.timerId);
      this.setState(({ todoList: oldTodoList }) => {
        const todoList = new Map([...oldTodoList]);
        const task = todoList.get(taskId);
        task.timerId = null;
        todoList.set(taskId, task);

        return {
          todoList,
        };
      });
    }
  };

  deleteTask = (taskId) => {
    this.setState(({ todoList: oldTodoList }) => {
      const todoList = new Map([...oldTodoList]);
      const task = todoList.get(taskId);
      clearInterval(task.timerId);
      todoList.delete(taskId);
      return {
        todoList,
      };
    });
  };

  addTask = (data) => {
    const { label, min, sec } = data;
    const newTask = this.createTask(label, min, sec);

    this.setState(({ todoList: oldTodoList }) => {
      const todoList = new Map([...oldTodoList]);
      todoList.set(this.maxId++, newTask);
      return {
        todoList,
      };
    });
  };

  editTask = (id, label) => {
    this.setState(({ todoList: oldTodoList }) => {
      const todoList = new Map([...oldTodoList]);
      const task = todoList.get(id);
      task.label = label;
      todoList.set(id, task);

      return {
        todoList,
      };
    });
  };

  createTask(label, min = 0, sec = 0) {
    const timeSpent = min * 60 + +sec;
    return {
      label,
      completed: false,
      editing: false,
      date: new Date(),
      timeSpent,
      timerId: null,
    };
  }

  toggleProperty = (id, property) => {
    this.setState(({ todoList: oldTodoList }) => {
      const todoList = new Map([...oldTodoList]);
      const task = todoList.get(id);
      task[property] = !task[property];
      todoList.set(id, task);

      return {
        todoList,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.toggleProperty(id, 'completed');
  };

  onToggleEditing = (id) => {
    this.toggleProperty(id, 'editing');
  };

  onFilterChange = (filterNewState) => {
    this.setState({
      filter: filterNewState,
    });
  };

  filterList = () => {
    const { todoList: oldTodoList, filter } = this.state;
    const todoList = new Map([...oldTodoList]);

    switch (filter) {
      case 'Completed':
        todoList.forEach((task, id) => {
          if (!task.completed) {
            todoList.delete(id);
          }
        });
        return todoList;
      case 'Active':
        todoList.forEach((task, id) => {
          if (task.completed) {
            todoList.delete(id);
          }
        });
        return todoList;
      case 'All':
      default:
        return todoList;
    }
  };

  countActiveTasks = () => {
    const { todoList } = this.state;
    let tasksLeft = 0;

    todoList.forEach((task) => {
      if (!task.completed) {
        tasksLeft++;
      }
    });

    return tasksLeft;
  };

  onDeleteCompleted = () => {
    this.setState(({ todoList: oldTodoList }) => {
      const todoList = new Map([...oldTodoList]);

      todoList.forEach((task, id) => {
        if (task.completed) {
          clearInterval(task.timerId);
          todoList.delete(id);
        }
      });

      return {
        todoList,
      };
    });
  };

  render() {
    const { filter } = this.state;
    const filteredTodoList = this.filterList();
    let tasksLeft = this.countActiveTasks();

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
