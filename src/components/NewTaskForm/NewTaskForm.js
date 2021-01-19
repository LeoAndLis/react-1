import React, { Component } from 'react';
import PropType from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      min: '',
      sec: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onKeyDown = (e) => {
    const { label, min, sec } = this.state;
    if (e.key === 'Enter') {
      this.props.onAdd({ label, min, sec });
      this.setState({
        label: '',
        min: '',
        sec: '',
      });
    }
  };

  onMinutesChange = (e) => {
    if (!isNaN(e.target.value)) {
      this.setState({
        min: e.target.value,
      });
    }
  };

  onSecondsChange = (e) => {
    let secValue = e.target.value;
    if (!isNaN(secValue)) {
      if (+secValue > 59) {
        secValue = 59;
      }
      this.setState({
        sec: secValue,
      });
    }
  };

  render() {
    const { label, min, sec } = this.state;

    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          onKeyDown={this.onKeyDown}
          value={label}
        />
        <input className="new-todo-form__timer" placeholder="Min" onChange={this.onMinutesChange} value={min} />
        <input className="new-todo-form__timer" placeholder="Sec" onChange={this.onSecondsChange} value={sec} />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onAdd: () => {},
};

NewTaskForm.propTypes = {
  onAdd: PropType.func,
};
