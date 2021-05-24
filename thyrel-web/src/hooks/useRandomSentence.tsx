import React from 'react';
import { getRandomValueFromArray } from 'utils/utils';

const sentences = [
  'A samurai eating a kebab with samouraï sauce',
  'A man walking on the ceiling',
  'A gas station on fire',
  'A T-Rex playing chess with monkeys',
  'Someone watching himself on TV',
  "Pinocchio but he's made of iron",
  'A nice shark without teeth',
  'A knight far too tall',
  'A man chained by circus animals',
  'A shipwreck on a chocolate island',
  'An invasion of multicolored aliens',
  'Spongebob becoming HandBob',
  'New colony on Mars leaded by Musk',
  'Sad jedi because the force is not with him',
  'Godzilla VS King Kong',
  'Woman pissed of by noisy neighbors',
  'A world where sofas and humans are interchanged',
  "Stitch meeting The Rock at Shrek's birthday",
];

const words = [
  'Kebab',
  'Cat',
  'Banana',
  'Monkey',
  'Pinocchio',
  'Mountain',
  'Computer',
  'Happy',
  'Beaver',
  'Boat',
  'Wood',
  'Spongebob',
  'Colony',
  'Airport',
  'Godzilla',
  'Peru',
  'Steak',
  'Revolution',
];

export function useRandomSentence(oneword?: boolean) {
  const sentenceRef = React.useRef(
    getRandomValueFromArray(oneword ? words : sentences),
  );

  return sentenceRef.current;
}
