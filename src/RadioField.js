import React from 'react';
import RadioFieldOption from './RadioFieldOption';

function RadioField({
  item, handleChange, id,
}) {
  const { options } = item;

  return (
    <div role="radiogroup" key={id} className="easyform__radio">
      { item.label || item.name }
      {
        options.map((option, index) => (
          <RadioFieldOption
            isFirst={index === 0}
            item={item}
            handleChange={handleChange}
            option={option}
            key={index}
          />
        ))
      }
    </div>

  );
}

export default RadioField;
