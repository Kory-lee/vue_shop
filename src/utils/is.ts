const toString = Object.prototype.toString;

export const is = (val: unknown, type: string) => toString.call(val) === `[object ${type}]`;

export const isString = (val: unknown): val is string => is(val, 'String');
