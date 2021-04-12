export const callAll = (...fns: (any | undefined)[]) => (...args: any) =>
  fns.forEach((fn: any) => fn && fn(...args));

export function getRandomValueFromArray<T>(possibilities: T[]): T {
  return possibilities[Math.floor(Math.random() * possibilities.length)];
}