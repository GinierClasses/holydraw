export default function GetRandomValueFromArray<T>(x: T[]): T {
  return x[Math.floor(Math.random() * x.length)];
}
