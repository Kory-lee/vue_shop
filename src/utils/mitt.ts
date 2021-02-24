export default class Mitt {
  private cache: Map<string | Symbol, Array<(...data: any) => void>>;
  constructor(all = []) {
    // A Map of event names to registered handler functions.
    this.cache = new Map(all);
  }

  once(type: string | Symbol, handler: Fn) {
    const decor = (...args: any[]) => {
      handler && handler.apply(this, args);
      this.off(type, decor);
    };
    this.once(type, decor);
    return this;
  }

  on(type: string | Symbol, handler: Fn) {
    const handlers = this.cache?.get(type),
      added = handlers && handlers.push(handler);
    if (!added) {
      this.cache.set(type, [handler]);
    }
  }

  off(type: string | Symbol, handler: Fn) {
    const handlers = this.cache.get(type);
    if (handlers) {
      handlers.splice(handlers.indexOf(handler) >>> 0, 1);
    }
  }
  emit(type: string | Symbol, evt?: any) {
    for (const handler of (this.cache.get(type) || []).slice()) handler(evt);
    for (const handler of (this.cache.get('*') || []).slice()) handler(type, evt);
  }

  clear() {
    this.cache.clear();
  }
}
