import React from 'react';
import EasyForm from '../src/index';

function ErrorBox({ errors }) {
  if (!errors) return false;

  if (errors.test) {
    if (errors.test.valueMissing) {
      return <div>test is required</div>;
    }
  }
  console.log(errors);
  return false;
}
function App() {
  const schema = [
    {
      type: 'text',
      name: 'test',
      attributes: {
        required: true,
      },
    },
  ];

  return (
    <EasyForm
      validate="change"
      schema={schema}
      before={ErrorBox}
    />
  );
}

export default App;
