import { useMemo } from 'react';

function useDefaults(schema) {
  return useMemo(() => {
    const output = {};
    schema.forEach((item) => {
      if (item.default) {
        output[item.name] = item.default;
      } else if (item.options) {
        /* eslint-disable-next-line */
        output[item.name] = item.options[0];
      } else if (item.type === 'checkbox') {
        output[item.name] = false;
      } else {
        output[item.name] = '';
      }
    });
    return output;
  }, [schema]);
}

export default useDefaults;
