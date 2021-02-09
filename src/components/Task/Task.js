import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import formatTimeSpent from '../../helpers/FormatTimeSpent';
import classNames from 'classnames';

const Task = ({
  completed,
  date,
  editing,
  label,
  id,
  timeSpent,
  onDeleted,
  onEdit,
  onToggleEditing,
  onToggleCompleted,
  onStartTimer,
  onStopTimer,
}) => {
  const [editValue, setEditValue] = useState(label);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      cancelEditing();
    }
    if (e.key === 'Enter') {
      onEdit(id, editValue);
      onToggleEditing(id);
    }
  };

  const cancelEditing = () => {
    onToggleEditing(id);
    setEditValue(label);
  };

  const editTask = (
    <input
      type="text"
      className="edit"
      autoFocus
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onBlur={cancelEditing}
      onKeyDown={onKeyDown}
    />
  );

  const formattedTimeSpent = formatTimeSpent(timeSpent);

  return (
    <li className={classNames({ completed: completed }, { editing: editing })}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={completed} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={onStartTimer} />
            <button className="icon icon-pause" onClick={onStopTimer} />
            <span className="time-spent">{formattedTimeSpent}</span>
          </span>
          <span className="created">created {formatDistanceToNow(date, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEditing} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {editing ? editTask : null}
    </li>
  );
};

Task.defaultProps = {
  completed: false,
  editing: false,
  date: new Date(),
  onEdit: () => {},
  onDeleted: () => {},
  onToggleEditing: () => {},
  onToggleCompleted: () => {},
  onStartTimer: () => {},
  onStopTimer: () => {},
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  date: PropTypes.instanceOf(Date).isRequired,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onStartTimer: PropTypes.func,
  onStopTimer: PropTypes.func,
};

export default Task;
