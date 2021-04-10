import GetRandomValueFromArray from 'components/GetRandomValueFromArray';
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

export function useRandomUsername() {
  const usernameRef = React.useRef(GetRandomValueFromArray(usernames));

  return usernameRef.current;
}
