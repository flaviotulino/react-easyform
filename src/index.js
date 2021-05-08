import React, { Fragment, useMemo, useState } from 'react';
import BaseField from './BaseField';
import useDefaults from './hooks/useDefaults';
import RadioField from './RadioField';
import SelectField from './SelectField';

function EasyForm({
  schema,
  onSubmit,
  onErrors,
  noValidate = false,
  children: submitButton = null,
  theme = {},
}) {
  const defaults = useDefaults(schema);
  const [data, setData] = useState(defaults);
  const [errors, setErrors] = useState(null);

  function handleChange(event) {
    const { target } = event;

    let value = null;

    switch (target.type) {
      case 'checkbox':
        value = target.checked;
        break;

      case 'number':
        value = parseInt(target.value);
        break;

      default:
        value = target.value;
    }

    setData({
      ...data,
      [target.name]: value,
    });
  }

  function handleSubit(event) {
    event.preventDefault();

    const { target } = event;
    const children = target.querySelectorAll('input, textarea, select');

    if (noValidate) {
      const localErrors = {};

      Array.from(children).forEach((element) => {
        if (element.validity && element.validity.valid === false) {
          localErrors[element.name] = element.validity;
        }
      });

      if (Object.keys(localErrors).length > 0) {
        setErrors(localErrors);
        if (typeof onErrors === 'function') {
          return onErrors(errors);
        }
      } else {
        setErrors(null);
      }
    }

    return onSubmit(data);
  }

  const fields = useMemo(() => schema.map((item) => {
    const id = item.id || `easyform-${item.name}`;

    if (item.component && typeof item.component === 'function') {
      return (
        <Fragment key={id}>
          {
            item.component({
              id,
              item,
              data,
              errors,
              onChange: handleChange,
            })
          }
        </Fragment>
      );
    }

    if (theme[item.type] && typeof theme[item.type] === 'function') {
      return (
        <Fragment key={id}>
          {
            theme[item.type]({
              id,
              item,
              data,
              errors,
              onChange: handleChange,
            })
          }
        </Fragment>
      );
    }

    switch (item.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'checkbox':
        return (
          <BaseField
            key={id}
            id={id}
            item={item}
            value={data[item.name]}
            handleChange={handleChange}
          />
        );

      case 'textarea':
        return (
          <Fragment key={id}>
            <label htmlFor={id} className="easyform__label">
              { item.name }
            </label>
            <textarea
              className="easyform__textarea"
              id={id}
              name={item.name}
              value={data[item.name]}
              onChange={handleChange}
              {...item.attributes}
            />
            { item.help && <p className="easyform__help">{ item.help }</p> }
          </Fragment>
        );

      case 'select':
        return (
          <SelectField
            key={id}
            id={id}
            item={item}
            value={data[item.name]}
            handleChange={handleChange}
          />
        );

      case 'radio':
        return (
          <RadioField
            key={id}
            id={id}
            item={item}
            handleChange={handleChange}
          />
        );

      default:
        return false;
    }
  }), [schema, data]);

  return (
    <form onSubmit={handleSubit} className="easyform" noValidate={noValidate}>
      { fields }
      { submitButton }
      { !submitButton && (
        <button type="submit" className="easyform__submit">Submit</button>
      )}
    </form>
  );
}

export default EasyForm;
