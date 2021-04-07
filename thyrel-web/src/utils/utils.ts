export const callAll = (...fns: (any | undefined)[]) => (...args: any) =>
  fns.forEach((fn: any) => fn && fn(...args));
