function useValidityClass(ref, css) {
  if (!ref.current) return '';
  const { validity } = ref.current;
  if (validity.valid) return '';

  let error = `${css}--invalid ${css}--`;
  if (validity.badInput) {
    error += 'bad-input';
  } else if (validity.patternMismatch) {
    error += 'pattern-mismatch';
  } else if (validity.rangeOverflow) {
    error += 'range-overflow';
  } else if (validity.rangeUnderflow) {
    error += 'range-underflow';
  } else if (validity.stepMismatch) {
    error += 'step-mismatch';
  } else if (validity.tooLong) {
    error += 'too-long';
  } else if (validity.tooShort) {
    error += 'too-short';
  } else if (validity.typeMismatch) {
    error += 'type-mismatch';
  } else if (validity.valueMissing) {
    error += 'value-missing';
  }

  return error;
}

export default useValidityClass;
