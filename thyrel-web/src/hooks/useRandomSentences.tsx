import React from 'react';

const sentences = [
  'A samurai eating a kebab with sauce samouraï',
  'A man walking on the ceiling',
  'A gas station on fire',
  'A T-Rex playing chess with monkeys',
  'Someone watching himself on the TV',
  'Pinocchio but in iron',
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
  'Stitch meeting The Rock at Shrek birthday',
];

const getRandomSentences = () =>
  sentences[Math.floor(Math.random() * sentences.length)];

export function useRandomUsername() {
  const sentenceRef = React.useRef(getRandomSentences());

  return sentenceRef.current;
}
