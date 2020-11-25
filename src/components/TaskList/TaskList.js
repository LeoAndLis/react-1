import React from 'react';
import Task from '../Task/Task';

const TaskList = ({ todos, onDeleted }) => {
    const tasksList = todos.map((item) => {
        return <Task
            { ...item }
            onDeleted = {() => onDeleted(item.id)}
        />;
    });
    return (
        <ul className="todo-list">
            { tasksList }
        </ul>
    );
}

export default TaskList;