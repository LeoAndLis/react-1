import React from 'react';
import PropTypes from 'prop-types';

const TaskFilter = ({ filter, onFilterChange }) => {
  const buttons = [{ label: 'All' }, { label: 'Active' }, { label: 'Completed' }];

  return (
    <ul className="filters">
      {buttons.map((button) => {
        return (
          <li key={button.label}>
            <button className={filter === button.label ? 'selected' : ''} onClick={() => onFilterChange(button.label)}>
              {button.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

TaskFilter.defaultProps = {
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func,
};

export default TaskFilter;
