import React, {Component} from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editValue: props.label,
        }
    }

    onEditChange = (e) => {
        this.setState({
            editValue: e.target.value
        })
    }

    onKeyDown = (e) => {

        if (e.key === 'Escape') {
            this.cancelEditing();
        }
        if (e.key === 'Enter') {
            const {id, onEdit, onToggleEditing} = this.props;

            onEdit(id, this.state.editValue);
            onToggleEditing(id);
        }
    }

    onBlur = () => {
        this.cancelEditing();
    }

    cancelEditing = () => {

        const {id, label, onToggleEditing} = this.props;

        onToggleEditing(id);
        this.setState({
            editValue: label,
        });
    }

    render() {
        const {label, completed, editing, date, onDeleted, onToggleEditing, onToggleCompleted} = this.props;
        const className = `${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`;
        const editTask = <input
                                type="text"
                                className="edit"
                                autoFocus
                                value={ this.state.editValue }
                                onChange={this.onEditChange}
                                onBlur={this.onBlur}
                                onKeyDown={this.onKeyDown}/>;

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
    onEdit: () => {},
    onDeleted: () => {},
    onToggleEditing: () => {},
    onToggleCompleted: () => {},
}

Task.propTypes = {
    label: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    date: PropTypes.instanceOf(Date).isRequired,
    onEdit: PropTypes.func,
    onDeleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onToggleCompleted: PropTypes.func,
}
