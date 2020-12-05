import React, {Component} from 'react';

export default class NewTaskForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.label);
        this.setState({
            label: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input className="new-todo"
                       placeholder="What needs to be done?"
                       onChange={this.onLabelChange}
                       autoFocus
                value={this.state.label}/>
            </form>
        );
    }
}