import React from 'react';

export default function TestAPI() {
  const [data, setData] = React.useState();
  const [testedValue, setTestedValue] = React.useState<string>('');

  function getTestData() {
    fetch('https://localhost:5001/api/test')
      .then((data) => data.json())
      .then(setData);
  }

  function sendPostRequest() {
    fetch('https://localhost:5001/api/test', {
      method: 'POST',
      body: JSON.stringify(testedValue),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then(setData);
  }

  return (
    <div>
      <button onClick={getTestData}>Get data from API:</button>
      <p>{data ? JSON.stringify(data) : 'no data yet'}</p>

      <div>
        <input
          value={testedValue}
          onChange={(e) => setTestedValue(e.target.value)}
        />
        <button onClick={sendPostRequest}>Send post request with value</button>
      </div>
    </div>
  );
}
