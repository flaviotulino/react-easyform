interface EasyFormSchema {
  type: 'text'|'email'|'password'|'checkbox'|'textarea'|'select'|'radio'|String;
  name: String;
  default?: String|number;
  attributes?: Object;
  options?: Array<Object|String>;
}

interface EasyFormParams {
  schema: EasyFormSchema;
  onSubmit: Function;
  onErrors?: Function;
  noValidate: Boolean = false;
  children: React.ReactChildren;
  theme: Object;
}

function EasyForm(params: EasyFormParams);
export default EasyForm;