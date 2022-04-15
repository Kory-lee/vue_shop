const namesapce = 'kory';

const warnedMessages = new Set<string>();

export function warnOnce(location: string, message: string): void {
  const mergedMessage = `[${namesapce}/${location}]: ${message}`;
  if (warnedMessages.has(mergedMessage)) return;
  warnedMessages.add(mergedMessage);
  console.warn(mergedMessage);
}

export function warn(location: string, message: string): void {
  console.error(`[${namesapce}/${location}]: ${message}`);
}

export function throwError(location: string, message: string): never {
  throw new Error(`[${namesapce}/${location}]: ${message}`);
}
