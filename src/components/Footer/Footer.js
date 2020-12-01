import React from 'react';
import TaskFilter from "../TaskFilter/TaskFilter";

const Footer = ({tasksLeft}) => {
    return (
        <footer className="footer">
            <span className="todo-count">{tasksLeft} items left</span>
            <TaskFilter />
            <button className="clear-completed">Clear completed</button>
        </footer>
    );
}

export default Footer;