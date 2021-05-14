# React EasyForm Builder
Build forms with schemas... easy ones!

## Motivation
A lot of libraries out there to generate forms rely on JSON Schema; although it is a 
standard, it is a bit complicated to use. And verbose.

## Prerequisites
You must have React installed. 

## Usage
```javascript
import EasyForm from 'react-easyform-builder';

function App() {
  // ... code ...
  const schema = [
    // the schema
  ];

  function onSubmit(data) {
    // do something with the data from the form
  }

  return (
    <EasyForm schema={schema} onSubmit={onSubmit} />
  )
}
```

### Schema
The schema property accepts an Array of Objects, with each Object shaped like this:

```javascript
{
  // mandatory, defines the type of the input
  type: 'text',               
  
  // mandatory, defines the name of the input
  name: 'name',               
  
  // optional, shows a label next to the input
  label: 'First name',

  // optional, shows help text next to the input
  help: 'Provide your first name here',

  // optional, sets a default value
  default: 'a default value', 

  // optional, classes to add to the element
  className: 'input',
  
  // optional, any HTML5 valid attribute
  attributes: {
    // for example
    required: true,
    pattern: /pattern/,
  }
}
```

#### Types
- text
- email
- password
- textarea
- checkbox
- select 
- radio

##### Select and Radio
These two types accepts another field in the config:

```javascript
{
  type: 'select',
  name: 'country',
  // this exists only for selects and radios 
  options: [
    'United Kingdom',
    'Italy',
    'Spain',
  ]
}

The above will render something like the following:

```html
<select name="country">
  <option value="United Kingdom">United Kingdom</option>
  <option value="Italy">Italy</option>
  <option value="Spain">Spain</option>
</select>
```

You could need though to use a different value from the one shown as a label:

```javascript
{
  type: 'select',
  name: 'country',
  // this exists only for selects and radios 
  options: [
    { label: 'United Kingdom', value: 1000 },
    { label: 'Italy', value: 2000 },
    { label: 'Spain', value: 3000 ,
  ]
}
```

In this case the above will render something like the following:

```html
<select name="country">
  <option value="1000">United Kingdom</option>
  <option value="2000">Italy</option>
  <option value="3000">Spain</option>
</select>
```

> If default is not specified in the config schema, the first option will be pre-selected.


### Theming
The components are unstyled by design and if you want to apply some styling you have a few options:
- use the built-in CSS selectors
- override the single component
- override all the components by type

// TODO


