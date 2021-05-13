import clsx from 'clsx';
import React, {
  Fragment, useMemo, useState,
} from 'react';
import BaseField from './BaseField';
import useDefaults from './hooks/useDefaults';
import RadioField from './RadioField';
import SelectField from './SelectField';

function EasyForm({
  schema,
  onSubmit,
  className,
  theme = {},
  validate = undefined,
  before: Before = null,
  after: After = null,
  submitButton = null,
}) {
  const defaults = useDefaults(schema);
  const [data, setData] = useState(defaults);
  const [errors, setErrors] = useState(null);

  function validation(items) {
    const localErrors = {};

    Array.from(items).forEach((element) => {
      if (element.validity && element.validity.valid === false) {
        localErrors[element.name] = element.validity;
        localErrors[element.name].name = element.name;
      }
    });

    if (Object.keys(localErrors).length > 0) {
      return localErrors;
    }

    return false;
  }

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

    if (validate === 'change') {
      const changeErrors = validation([target]);
      if (changeErrors) {
        setErrors(changeErrors);
      }
    }
  }

  function handleSubit(event) {
    event.preventDefault();

    const { target } = event;
    const children = target.querySelectorAll('input, textarea, select');

    if (validate === 'submit') {
      const submitErrors = validation(children);
      if (submitErrors) {
        setErrors(submitErrors);
      }
    }

    return onSubmit(data, errors);
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
              { item.label || item.name }
            </label>
            <textarea
              className={clsx('easyform__textarea', item.className)}
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
    <form onSubmit={handleSubit} className={clsx('easyform', className)} noValidate={validate !== undefined}>
      { Before && <Before data={data} errors={errors} /> }
      { fields }
      { After && <After data={data} errors={errors} /> }
      { submitButton }
      { !submitButton && (
        <button type="submit" className="easyform__submit">Submit</button>
      )}
    </form>
  );
}

export class Schema {
  constructor(schema) {
    Object.assign(this, schema);
  }
}

export default EasyForm;
