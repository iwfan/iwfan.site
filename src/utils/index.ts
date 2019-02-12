export function throttle(func: (...arg: any[]) => any, time: number): () => any {
  let timer: number | null = null;
  return function(this: any, ...args: any[]) {
    if (timer) {
      return;
    }
    func.apply(this, args);
    timer = window.setTimeout(() => {
      timer = null;
    }, time);
  };
}

export function debounce(func: (...arg: any[]) => any, time: number): () => any {
  let timer: number | null = null;
  return function(this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, time);
  };
}
