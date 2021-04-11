export default function GetRandomValueFromArray<T>(type: T[]): T {
  return type[Math.floor(Math.random() * type.length)];
}
