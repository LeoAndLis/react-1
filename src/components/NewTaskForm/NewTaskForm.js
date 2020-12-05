import React, {Component} from 'react';
import PropType from 'prop-types';

export default class NewTaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            label: ''
        }
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.props.onAdd(this.state.label);
            this.setState({
                label: ''
            });
        }
    }

    render() {
        const {label} = this.state;

        return (
            <input className="new-todo"
                   placeholder="What needs to be done?"
                   onChange={this.onLabelChange}
                   onKeyDown={this.onKeyDown}
                   value={label}/>
        );
    }
}

NewTaskForm.defaultProps = {
    onAdd: () => {},
}

NewTaskForm.propTypes = {
    onAdd: PropType.func,
}