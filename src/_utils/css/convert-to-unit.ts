interface ConvertToUnitOptions {
  c?: number;
  offset?: number;
  attachPx?: boolean;
}

export function convertToUnit<T extends null | undefined | any>(
  length: T,
  convertToUnitOptions?: ConvertToUnitOptions
): T;

export function convertToUnit<T extends number | string>(
  length: T,
  { c = 1, offset = 0, attachPx = true }: ConvertToUnitOptions = {}
): string {
  const pureNumberRegex = /^(\d|\.)+$/;
  const numberRegex = /(\d|\.)+/;

  if (typeof length === 'number') {
    const result = (length + offset) * c;
    if (result === 0) return '0';
    return `${result}px`;
  } else if (typeof length === 'string') {
    if (pureNumberRegex.test(length)) {
      const result = (Number(length) + offset) * c;
      if (attachPx) {
        if (result === 0) return '0';
        return `${result}px`;
      } else {
        return `${result}`;
      }
    } else {
      const result = numberRegex.exec(length);
      if (!result) return length;
      return length.replace(numberRegex, String((Number(result[0]) + offset) * c));
    }
  }
  return length;
}

export default convertToUnit;
