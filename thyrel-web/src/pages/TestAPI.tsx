import { css } from '@emotion/css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from 'rsuite';
import { client } from '../api/client';
import { setToken } from '../api/player-provider';
import Player from '../types/Player.type';

export default function TestAPI() {
  const [data, setData] = React.useState<any>();
  const [testedValue, setTestedValue] = React.useState<string>('');
  const history = useHistory();

  function getTestData() {
    client<Player>('test').then((player: Player) => {
      if (!player.token?.tokenKey) {
        return;
      }
      setToken(player.token.tokenKey);
      history.push('/r');
    });
  }

  function sendPostRequest() {
    fetch('https://localhost:5001/api/test', {
      method: 'POST',
      body: JSON.stringify(testedValue),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then(setData, () => setData('ERROR: api could not be called'));
  }

  return (
    <div
      className={css({
        margin: 16,
      })}>
      <Button onClick={getTestData}>Get data from API:</Button>
      <p
        className={css({
          margin: 8,
          fontSize: 16,
        })}>
        {data ? JSON.stringify(data) : 'no data yet'}
      </p>

      <div
        className={css({
          width: 500,
          display: 'flex',
        })}>
        <Input
          className={css({ marginBottom: 16 })}
          value={testedValue}
          onChange={value => setTestedValue(value)}
        />
        <div>
          <Button onClick={sendPostRequest}>
            Send post request with value
          </Button>
        </div>
      </div>
    </div>
  );
}
