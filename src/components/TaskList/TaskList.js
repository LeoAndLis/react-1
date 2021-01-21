import React from 'react';
import Task from '../Task/Task';
import PropTypes from 'prop-types';

const TaskList = ({ todos, onEdit, onDeleted, onToggleEditing, onToggleCompleted, onStartTimer, onStopTimer }) => {
  let tasksList = [];
  todos.forEach((task, id) => {
    tasksList = [
      ...tasksList,
      <Task
        id={id}
        key={id}
        {...task}
        onEdit={onEdit}
        onDeleted={() => onDeleted(id)}
        onToggleEditing={() => onToggleEditing(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onStartTimer={() => onStartTimer(id)}
        onStopTimer={() => onStopTimer(id)}
      />,
    ];
  });

  return <ul className="todo-list">{tasksList}</ul>;
};

TaskList.defaultProps = {
  onEdit: () => {},
  onDeleted: () => {},
  onToggleEditing: () => {},
  onToggleCompleted: () => {},
  onStartTimer: () => {},
  onStopTimer: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Map).isRequired,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onStartTimer: PropTypes.func,
  onStopTimer: PropTypes.func,
};

export default TaskList;
