import React from 'react';

const usernames = [
  'Dieu',
  'JeSuisCovid',
  'GrosBg',
  'Macco',
  'Petite cochonne',
  'GrosTas',
  'C moi',
  'C pas moi',
  'Staline',
  'Krokette',
  'Petite loutre',
  'Bob le bob',
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
