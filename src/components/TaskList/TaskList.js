import React from 'react';
import Task from '../Task/Task';

const TaskList = ({ todos, onDeleted, onToggleEditing, onToggleCompleted}) => {
    const tasksList = todos.map((item) => {
        return <Task
            key={item.id}
            { ...item }
            onDeleted={() => onDeleted(item.id)}
            onToggleEditing={() => onToggleEditing(item.id)}
            onToggleCompleted={() => onToggleCompleted(item.id)}
        />;
    });
    return (
        <ul className="todo-list">
            { tasksList }
        </ul>
    );
}

export default TaskList;