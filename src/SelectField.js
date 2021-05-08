import React from 'react';
import SelectFieldOption from './SelectFieldOption';

function SelectField({
  id, item, value, handleChange,
}) {
  const { options } = item;

  return (
    <>
      <label htmlFor={id} className="easyform__label">
        { item.label || item.name }
      </label>

      <select
        className="easyform__select"
        id={id}
        onChange={handleChange}
        name={item.name}
        value={value}
        {...item.attributes}
      >
        {
          options.map((option, index) => (
            <SelectFieldOption
              key={index}
              option={option}
            />
          ))
        }
      </select>

      { item.help && <p className="easyform__help">{ item.help }</p> }
    </>
  );
}

export default SelectField;
