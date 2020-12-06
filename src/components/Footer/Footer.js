import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../TaskFilter/TaskFilter';

const Footer = ({ tasksLeft, filter, onFilterChange, onDeleteCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={() => onDeleteCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  tasksLeft: 0,
  filter: 'all',
  onFilterChange: () => {},
  onDeleteCompleted: () => {},
};

Footer.propTypes = {
  tasksLeft: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onDeleteCompleted: PropTypes.func,
};

export default Footer;
