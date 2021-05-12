import React from 'react';
import EasyForm from '../src/index';

function App() {
  const schema = [
    {
      type: 'text',
      name: 'test',
    },
  ];
  return <EasyForm schema={schema} />;
}

export default App;
