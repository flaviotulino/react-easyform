function useValidityClass(ref, css) {
  if (!ref.current) return '';
  if (ref.current.valid) return '';

  const { current } = ref;
  let error = `${css}--invalid ${css}--`;
  if (current.badInput) {
    error += 'bad-input';
  } else if (current.patternMismatch) {
    error += 'pattern-mismatch';
  } else if (current.rangeOverflow) {
    error += 'range-overflow';
  } else if (current.rangeUnderflow) {
    error += 'range-underflow';
  } else if (current.stepMismatch) {
    error += 'step-mismatch';
  } else if (current.tooLong) {
    error += 'too-long';
  } else if (current.tooShort) {
    error += 'too-short';
  } else if (current.typeMismatch) {
    error += 'type-mismatch';
  } else if (current.valueMissing) {
    error += 'value-missing';
  }

  return error;
}

export default useValidityClass;
