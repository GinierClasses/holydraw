export default function GetRandomValueFromArray<T>(possibilities: T[]): T {
  return possibilities[Math.floor(Math.random() * possibilities.length)];
}
