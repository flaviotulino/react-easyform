import React from 'react';

function SelectFieldOption({ option }) {
  if (typeof option === 'string' || typeof option === 'number') {
    return <option value={option}>{option}</option>;
  }
  return <option value={option.value}>{option.label}</option>;
}

export default SelectFieldOption;
