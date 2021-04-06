// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callAll = (...fns: (any | undefined)[]) => (...args: any) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fns.forEach((fn: any) => fn && fn(...args));
