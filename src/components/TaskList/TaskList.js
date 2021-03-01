import React from 'react';
import Task from '../Task/Task';
import PropTypes from 'prop-types';

const TaskList = ({ todos, onEdit, onDeleted, onToggleEditing, onToggleCompleted, onStartTimer, onStopTimer }) => {
  let tasksList = [];
  for (let taskId in todos) {
    if (todos.hasOwnProperty(taskId)) {
      tasksList = [
        ...tasksList,
        <Task
          id={taskId}
          key={taskId}
          {...todos[taskId]}
          onEdit={onEdit}
          onDeleted={() => onDeleted(taskId)}
          onToggleEditing={() => onToggleEditing(taskId)}
          onToggleCompleted={() => onToggleCompleted(taskId)}
          onStartTimer={() => onStartTimer(taskId)}
          onStopTimer={() => onStopTimer(taskId)}
        />,
      ];
    }
  }

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
  todos: PropTypes.instanceOf(Object).isRequired,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onStartTimer: PropTypes.func,
  onStopTimer: PropTypes.func,
};

export default TaskList;
