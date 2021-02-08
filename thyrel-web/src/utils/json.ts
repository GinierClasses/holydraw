export function parseJson<T>(text: string, init?: T): T | undefined {
  let json: T;

  try {
    json = JSON.parse(text);
  } catch (e) {
    return init;
  }

  return json ? json : init;
}
