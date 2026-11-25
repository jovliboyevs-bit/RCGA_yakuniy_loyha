// Own resources used by the existing DOM interactions for one mounted route.
export class PageScope {
  active = true;
  private controller = new AbortController();
  private cleanups: (() => void)[] = [];
  private frames = new Set<number>();
  private timers = new Set<number>();

  get signal() { return this.controller.signal; }

  listen(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject, options: AddEventListenerOptions | boolean = {}) {
    target.addEventListener(type, listener, {
      ...(typeof options === 'boolean' ? { capture: options } : options),
      signal: this.controller.signal,
    });
  }

  onCleanup(cleanup: () => void) { this.cleanups.push(cleanup); }

  setTimeout = (callback: () => void, delay = 0) => {
    if (!this.active) return 0;
    const id = window.setTimeout(() => {
      this.timers.delete(id);
      if (this.active) callback();
    }, delay);
    this.timers.add(id);
    return id;
  };

  requestAnimationFrame = (callback: FrameRequestCallback) => {
    if (!this.active) return 0;
    const id = window.requestAnimationFrame(time => {
      this.frames.delete(id);
      if (this.active) callback(time);
    });
    this.frames.add(id);
    return id;
  };

  observe(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    const observer = new IntersectionObserver(callback, options);
    this.onCleanup(() => observer.disconnect());
    return observer;
  }

  dispose() {
    this.active = false;
    this.controller.abort();
    this.timers.forEach(id => window.clearTimeout(id));
    this.frames.forEach(id => window.cancelAnimationFrame(id));
    this.cleanups.forEach(cleanup => cleanup());
  }
}
