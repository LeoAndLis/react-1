import React from 'react';
import Task from '../Task/Task';

const TaskList = ({ todos, onDeleted, onToggleEditing, onToggleCompleted}) => {
    const tasksList = todos.map((task) => {
        return <Task
            key={task.id}
            { ...task }
            onDeleted={() => onDeleted(task.id)}
            onToggleEditing={() => onToggleEditing(task.id)}
            onToggleCompleted={() => onToggleCompleted(task.id)}
        />;
    });
    return (
        <ul className="todo-list">
            { tasksList }
        </ul>
    );
}

export default TaskList;