import React, {Component} from 'react';
import { formatDistanceToNow } from 'date-fns'

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