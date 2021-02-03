import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  console.log(process.env.REACT_APP_API_URL);
  render(<App />);
});
