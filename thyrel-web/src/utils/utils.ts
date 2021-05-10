export const callAll = (...fns: (any | undefined)[]) => (...args: any) =>
  fns.forEach((fn: any) => fn && fn(...args));

export function getRandomValueFromArray<T>(possibilities: T[]): T {
  return possibilities[Math.floor(Math.random() * possibilities.length)];
}

export function getRandomColor(): string {
  return '#'.concat(Math.floor(Math.random() * 16777215).toString(16));
}
