export function omit(obj: any, attr: string) {
  const { [attr]: _, ...newObj } = obj;
  return newObj;
}