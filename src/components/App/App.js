import React, { useState, useEffect } from 'react';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

let maxId = 100;

const App = () => {
  const [todoList, setTodoList] = useState(null);
  const [filter, setFilter] = useState('All');

  const createTask = (label, min = 0, sec = 0) => {
    const timeSpent = min * 60 + +sec;
    return {
      label,
      completed: false,
      editing: false,
      date: new Date(),
      timeSpent,
      timerId: null,
    };
  };

  useEffect(
    () =>
      setTodoList({
        [maxId++]: createTask('Task 1'),
        [maxId++]: createTask('Task 2'),
        [maxId++]: createTask('Task 3'),
      }),
    []
  );

  const startTimer = (taskId) => {
    const task = todoList[taskId];
    if (task.timerId === null) {
      const timerId = setInterval(() => increaseTimeSpent(taskId), 1000);
      const newTodoList = { ...todoList };
      newTodoList[taskId].timerId = timerId;
      setTodoList(newTodoList);
    }
  };

  const increaseTimeSpent = (taskId) => {
    const newTodoList = { ...todoList };
    newTodoList[taskId].timeSpent += 1;
    setTodoList((todoList) => {
      return {
        ...todoList,
        [taskId]: newTodoList[taskId],
      };
    });
  };

  const stopTimer = (taskId) => {
    const task = todoList[taskId];
    if (task.timerId !== null) {
      clearInterval(task.timerId);
      const newTodoList = { ...todoList };
      newTodoList[taskId].timerId = null;
      setTodoList((todoList) => {
        return {
          ...todoList,
          [taskId]: newTodoList[taskId],
        };
      });
    }
  };

  const deleteTask = (taskId) => {
    const newTodoList = { ...todoList };
    if (newTodoList[taskId].timerId) {
      stopTimer(taskId);
    }
    delete newTodoList[taskId];
    setTodoList({ ...newTodoList });
  };

  const addTask = (data) => {
    const { label, min, sec } = data;
    if (label.length > 0) {
      const newTask = createTask(label, min, sec);
      setTodoList({
        ...todoList,
        [maxId++]: newTask,
      });
    }
  };

  const editTask = (taskId, label) => {
    const newTodoList = { ...todoList };
    newTodoList[taskId].label = label;
    setTodoList(newTodoList);
  };

  const toggleProperty = (taskId, property) => {
    const newTodoList = { ...todoList };
    newTodoList[taskId][property] = !newTodoList[taskId][property];
    setTodoList(newTodoList);
  };

  const onToggleCompleted = (id) => {
    toggleProperty(id, 'completed');
  };

  const onToggleEditing = (id) => {
    toggleProperty(id, 'editing');
  };

  const onFilterChange = (filterNewState) => {
    setFilter(filterNewState);
  };

  const filterList = () => {
    const newTodoList = { ...todoList };

    switch (filter) {
      case 'Completed':
        for (let taskId in newTodoList) {
          if (newTodoList.hasOwnProperty(taskId) && !newTodoList[taskId].completed) {
            delete newTodoList[taskId];
          }
        }
        return newTodoList;
      case 'Active':
        for (let taskId in newTodoList) {
          if (newTodoList.hasOwnProperty(taskId) && newTodoList[taskId].completed) {
            delete newTodoList[taskId];
          }
        }
        return newTodoList;
      case 'All':
      default:
        return newTodoList;
    }
  };

  const countActiveTasks = () => {
    let tasksLeft = 0;

    for (let taskId in todoList) {
      if (todoList.hasOwnProperty(taskId) && !todoList[taskId].completed) {
        tasksLeft++;
      }
    }

    return tasksLeft;
  };

  const onDeleteCompleted = () => {
    const newTodoList = { ...todoList };

    for (let taskId in newTodoList) {
      if (newTodoList.hasOwnProperty(taskId) && newTodoList[taskId].completed) {
        clearInterval(newTodoList[taskId].timerId);
        delete newTodoList[taskId];
      }
    }

    setTodoList(newTodoList);
  };

  const filteredTodoList = filterList();
  let tasksLeft = countActiveTasks();

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdd={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={filteredTodoList}
          onEdit={editTask}
          onDeleted={deleteTask}
          onToggleEditing={onToggleEditing}
          onToggleCompleted={onToggleCompleted}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
        <Footer
          tasksLeft={tasksLeft}
          filter={filter}
          onFilterChange={onFilterChange}
          onDeleteCompleted={onDeleteCompleted}
        />
      </section>
    </section>
  );
};

export default App;
