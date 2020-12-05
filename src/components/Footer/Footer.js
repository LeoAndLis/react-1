import React from 'react';
import TaskFilter from "../TaskFilter/TaskFilter";

const Footer = ({tasksLeft, filter, onFilterChange, onDeleteCompleted}) => {
    return (
        <footer className="footer">
            <span className="todo-count">{tasksLeft} items left</span>
            <TaskFilter filter={filter}
                        onFilterChange={onFilterChange}/>
            <button className="clear-completed" onClick={() => onDeleteCompleted()}>Clear completed</button>
        </footer>
    );
}

export default Footer;