import React from 'react';
import Task from '../Task/Task';
import PropTypes from "prop-types";

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

TaskList.defaultProps = {
    onDeleted: () => {},
    onToggleEditing: () => {},
    onToggleCompleted: () => {},
}

TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onToggleCompleted: PropTypes.func,
}

export default TaskList;