import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import useValidityClass from './hooks/useValidityClass';

function BaseField({
  item, handleChange, value, id,
}) {
  const ref = useRef(null);

  const valueProp = {};
  if (item.type === 'checkbox') {
    valueProp.checked = value;
  } else {
    valueProp.value = value;
  }

  const validity = useValidityClass(ref, 'easyform__input');

  return (
    <>
      <label htmlFor={id} className="easyform__label">
        {item.label || item.name}
      </label>
      <input
        ref={ref}
        className={clsx(`easyform__input easyform__input--${item.type}`, item.className, validity)}
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
