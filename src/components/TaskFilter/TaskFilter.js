import React from 'react';

const TaskFilter = ({filter, onFilterChange}) => {

    const buttons = [
        {label: 'All'},
        {label: 'Active'},
        {label: 'Completed'},
    ]

    return (
        <ul className="filters">
            {buttons.map((button) => {
                return (
                    <li>
                        <button className={filter === button.label ? "selected":''}
                                onClick={() => onFilterChange(button.label)}>
                            {button.label}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default TaskFilter;