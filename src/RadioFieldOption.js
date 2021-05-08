import React from 'react';

function RadioFieldOption({
  item, option, handleChange, isFirst,
}) {
  let label;
  let value;

  if (typeof option === 'string' || typeof option === 'number') {
    label = option;
    value = option;
  } else {
    label = option.label;
    value = option.value;
  }

  const id = `${item.name}-${label}`;

  const defaultChecked = item.default ? value === item.default : isFirst;

  return (
    <>
      <label htmlFor={id} className="easyform__label easyform__label--radio">
        { label }
      </label>
      <input
        className="easyform__input easyform__input--radio"
        id={id}
        type="radio"
        name={item.name}
        value={value}
        onChange={handleChange}
        defaultChecked={defaultChecked}
      />
    </>
  );
}

export default RadioFieldOption;
