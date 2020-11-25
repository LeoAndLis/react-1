import React, {Component} from 'react';

export default class Task extends Component {

    toggleTask = () => {
        this.setState(({completed}) => ({completed: !completed}));
    }

    render() {
        const {id, label, completed, editing, onDeleted} = this.props;
        const className = `${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`;
        const editTask = <input type="text" className="edit" value={ label }/>;

        return (
            <li key={id} className={className}>
                <div className="view">
                    <input className="toggle" type="checkbox" onClick={this.toggleTask} defaultChecked={completed} />
                    <label>
                        <span className="description">{ label }</span>
                        <span className="created">created 17 seconds ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy" onClick={onDeleted}></button>
                </div>
                {editing ? editTask : null}
            </li>
        );
    }
}