import React, { useState } from 'react';
import PropType from 'prop-types';

const NewTaskForm = ({ onAdd }) => {
  const [label, setLabel] = useState('');
  const [time, setTime] = useState({ min: '', sec: '' });

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAdd({ label, ...time });
      setLabel('');
      setTime({ min: '', sec: '' });
    }
  };

  const onMinutesChange = (e) => {
    if (!isNaN(e.target.value)) {
      setTime({ ...time, min: e.target.value });
    }
  };

  const onSecondsChange = (e) => {
    let secValue = e.target.value;
    if (!isNaN(secValue)) {
      if (+secValue > 59) {
        secValue = 59;
      }
      setTime({ ...time, sec: secValue });
    }
  };

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={(e) => setLabel(e.target.value)}
        onKeyDown={onKeyDown}
        value={label}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onMinutesChange}
        onKeyDown={onKeyDown}
        value={time.min}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecondsChange}
        onKeyDown={onKeyDown}
        value={time.sec}
      />
    </form>
  );
};

NewTaskForm.defaultProps = {
  onAdd: () => {},
};

NewTaskForm.propTypes = {
  onAdd: PropType.func,
};

export default NewTaskForm;
