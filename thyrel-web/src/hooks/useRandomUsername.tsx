import React from 'react';

const usernames = [
  'God',
  'Mushu the Dragon',
  'Bob Razowski',
  'Macco',
  'Woody Woodpecker',
  'Mr Potato',
  'Nemo',
  'Shrek',
  'Staline',
  'Krokette',
  'Little Otter',
  'Bob the bob',
  'SavageWolf',
  'Padawan',
  'BigBear',
  'BigFather',
  'Terminator',
  'Stitch',
];

const getRandomUsername = () =>
  usernames[Math.floor(Math.random() * usernames.length)];

export function useRandomUsername() {
  const usernameRef = React.useRef(getRandomUsername());

  return usernameRef.current;
}
