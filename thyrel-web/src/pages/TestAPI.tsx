import React from 'react';

export default function TestAPI() {
  function getTestData() {}

  return (
    <div>
      <button onClick={getTestData}>Get data from API:</button>
      <p>no data</p>
    </div>
  );
}
