import React, {Component} from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
    render() {
        const {label, completed, editing, date, onDeleted, onToggleEditing, onToggleCompleted} = this.props;
        const className = `${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`;
        const editTask = <input type="text" className="edit" value={ label }/>;

        return (
            <li className={className}>
                <div className="view">
                    <input className="toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={completed} />
                    <label>
                        <span className="description">{ label }</span>
                        <span className="created">created {formatDistanceToNow(date, {includeSeconds: true})} ago</span>
                    </label>
                    <button className="icon icon-edit" onClick={onToggleEditing}></button>
                    <button className="icon icon-destroy" onClick={onDeleted}></button>
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
    onDeleted: () => {},
    onToggleEditing: () => {},
    onToggleCompleted: () => {},
}

Task.propTypes = {
    label: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    date: PropTypes.instanceOf(Date).isRequired,
    onDeleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onToggleCompleted: PropTypes.func,
}
