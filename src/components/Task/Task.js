import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import formatTimeSpent from '../../helpers/FormatTimeSpent';

export default class Task extends Component {
  timerId = null;

  constructor(props) {
    super(props);
    this.state = {
      editValue: props.label,
      timeSpent: props.timeSpent,
    };
  }

  startTimer = () => {
    if (this.timerId === null) {
      this.timerId = setInterval(this.increaseTimeSpent, 1000);
    }
  };

  stopTimer = () => {
    this.deleteInterval();
  };

  deleteInterval = () => {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
    }
  };

  componentWillUnmount() {
    this.deleteInterval();
  }

  increaseTimeSpent = () => {
    this.setState(({ timeSpent }) => {
      const newTimeSpent = timeSpent + 1;
      return { timeSpent: newTimeSpent };
    });
  };

  onEditChange = (e) => {
    this.setState({
      editValue: e.target.value,
    });
  };

  onKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.cancelEditing();
    }
    if (e.key === 'Enter') {
      const { id, onEdit, onToggleEditing } = this.props;

      onEdit(id, this.state.editValue);
      onToggleEditing(id);
    }
  };

  onBlur = () => {
    this.cancelEditing();
  };

  cancelEditing = () => {
    const { id, label, onToggleEditing } = this.props;

    onToggleEditing(id);
    this.setState({
      editValue: label,
    });
  };

  render() {
    const { editValue, timeSpent } = this.state;
    const { label, completed, editing, date, onDeleted, onToggleEditing, onToggleCompleted } = this.props;
    const className = `${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`;
    const editTask = (
      <input
        type="text"
        className="edit"
        autoFocus
        value={editValue}
        onChange={this.onEditChange}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
      />
    );

    const formattedTimeSpent = formatTimeSpent(timeSpent);

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={completed} />
          <label>
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.startTimer} />
              <button className="icon icon-pause" onClick={this.stopTimer} />
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
  }
}

Task.defaultProps = {
  completed: false,
  editing: false,
  date: new Date(),
  onEdit: () => {},
  onDeleted: () => {},
  onToggleEditing: () => {},
  onToggleCompleted: () => {},
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  date: PropTypes.instanceOf(Date).isRequired,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};
