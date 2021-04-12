import React from 'react';
import { getRandomValueFromArray } from 'utils/utils';

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

export function useRandomUsername() {
  const usernameRef = React.useRef(getRandomValueFromArray(usernames));

  return usernameRef.current;
}
