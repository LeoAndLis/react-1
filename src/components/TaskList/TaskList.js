import React from 'react';
import Task from '../Task/Task';
import PropTypes from 'prop-types';

const TaskList = ({ todos, onEdit, onDeleted, onToggleEditing, onToggleCompleted, onStartTimer, onStopTimer }) => {
  const tasksList = todos.map((task, index) => {
    return (
      <Task
        key={task.id}
        {...task}
        onEdit={onEdit}
        onDeleted={() => onDeleted(task.id, index)}
        onToggleEditing={() => onToggleEditing(task.id)}
        onToggleCompleted={() => onToggleCompleted(task.id)}
        onStartTimer={() => onStartTimer(index)}
        onStopTimer={() => onStopTimer(index)}
      />
    );
  });
  return <ul className="todo-list">{tasksList}</ul>;
};

TaskList.defaultProps = {
  onEdit: () => {},
  onDeleted: () => {},
  onToggleEditing: () => {},
  onToggleCompleted: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};

export default TaskList;
