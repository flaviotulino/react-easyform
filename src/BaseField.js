import React, { Fragment } from 'react';

function BaseField({
  item, handleChange, value, id,
}) {
  const valueProp = {};
  if (item.type === 'checkbox') {
    valueProp.checked = value;
  } else {
    valueProp.value = value;
  }

  return (
    <>
      <label htmlFor={id} className="easyform__label">
        {item.label || item.name}
      </label>
      <input
        className={`easyform__input easyform__input--${item.type}`}
        id={id}
        type={item.type}
        name={item.name}
        {...valueProp}
        onChange={handleChange}
        {...item.attributes}
      />
      { item.help && <p className="easyform__help">{item.help}</p> }
    </>
  );
}
export default BaseField;